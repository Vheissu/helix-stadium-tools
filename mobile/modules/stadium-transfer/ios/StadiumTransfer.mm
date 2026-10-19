#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <CommonCrypto/CommonDigest.h>
#import <Foundation/Foundation.h>
#include <libssh2.h>
#include <libssh2_sftp.h>
#include <arpa/inet.h>
#include <fcntl.h>
#include <netdb.h>
#include <poll.h>
#include <sys/socket.h>
#include <sys/stat.h>
#include <unistd.h>
#include <atomic>
#include <chrono>
#include <memory>
#include <stdexcept>
#include <string>
#include <thread>
#include <cstring>

namespace {
struct TransferError : std::runtime_error {
  std::string code;
  TransferError(const char *code, const char *message) : std::runtime_error(message), code(code) {}
};
struct Connection {
  int socket = -1;
  LIBSSH2_SESSION *session = nullptr;
  LIBSSH2_SFTP *sftp = nullptr;
  ~Connection() {
    if (sftp) libssh2_sftp_shutdown(sftp);
    if (session) { libssh2_session_disconnect(session, "Finished"); libssh2_session_free(session); }
    if (socket >= 0) close(socket);
  }
};
struct File {
  int fd = -1;
  ~File() { if (fd >= 0) close(fd); }
};
static bool validHost(NSString *host) {
  if (![host isKindOfClass:NSString.class] || host.length == 0 || host.length > 253) return false;
  NSCharacterSet *allowed = [NSCharacterSet characterSetWithCharactersInString:@"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.-:"];
  return [host rangeOfCharacterFromSet:allowed.invertedSet].location == NSNotFound;
}
static void connectHost(Connection &c, NSString *host) {
  if (!validHost(host)) throw TransferError("BAD_HOST", "Enter a valid Stadium device name or IP address.");
  struct addrinfo hints = {}, *addresses = nullptr;
  hints.ai_socktype = SOCK_STREAM; hints.ai_family = AF_UNSPEC;
  if (getaddrinfo(host.UTF8String, "22", &hints, &addresses) != 0) throw TransferError("CONNECTION", "The Stadium could not be found on this network.");
  for (auto *address = addresses; address; address = address->ai_next) {
    int fd = socket(address->ai_family, address->ai_socktype, address->ai_protocol);
    if (fd < 0) continue;
    int flags = fcntl(fd, F_GETFL, 0); fcntl(fd, F_SETFL, flags | O_NONBLOCK);
    int result = connect(fd, address->ai_addr, address->ai_addrlen);
    if (result != 0 && errno == EINPROGRESS) {
      pollfd wait = {fd, POLLOUT, 0};
      if (poll(&wait, 1, 8000) > 0) { int error = 0; socklen_t size = sizeof(error); getsockopt(fd, SOL_SOCKET, SO_ERROR, &error, &size); result = error == 0 ? 0 : -1; }
    }
    if (result == 0) { fcntl(fd, F_SETFL, flags); c.socket = fd; break; }
    close(fd);
  }
  freeaddrinfo(addresses);
  if (c.socket < 0) throw TransferError("CONNECTION", "Could not open song uploads. Check Wi-Fi and Remote Access, then try again.");
  timeval timeout = {10, 0};
  setsockopt(c.socket, SOL_SOCKET, SO_RCVTIMEO, &timeout, sizeof(timeout));
  setsockopt(c.socket, SOL_SOCKET, SO_SNDTIMEO, &timeout, sizeof(timeout));
  int noSignal = 1; setsockopt(c.socket, SOL_SOCKET, SO_NOSIGPIPE, &noSignal, sizeof(noSignal));
  static dispatch_once_t initialized;
  dispatch_once(&initialized, ^{ libssh2_init(0); });
  c.session = libssh2_session_init();
  if (!c.session) throw TransferError("CONNECTION", "Could not start song uploads.");
  libssh2_session_set_blocking(c.session, 1); libssh2_session_set_timeout(c.session, 10000);
  if (libssh2_session_handshake(c.session, c.socket)) throw TransferError("CONNECTION", "The Stadium's file connection could not be established.");
}
static NSString *fingerprint(Connection &c) {
  size_t size = 0; int type = 0;
  const char *key = libssh2_session_hostkey(c.session, &size, &type);
  if (!key || size == 0 || size > 16384) throw TransferError("HOST_KEY", "The Stadium's identity could not be read.");
  unsigned char hash[CC_SHA256_DIGEST_LENGTH]; CC_SHA256(key, (CC_LONG)size, hash);
  NSString *base64 = [[NSData dataWithBytes:hash length:sizeof(hash)] base64EncodedStringWithOptions:0];
  return [@"SHA256:" stringByAppendingString:[base64 stringByReplacingOccurrencesOfString:@"=" withString:@""]];
}
static void authenticate(Connection &c, NSString *expected, NSArray<NSString *> *keys) {
  if (![expected isKindOfClass:NSString.class] || ![fingerprint(c) isEqualToString:expected]) throw TransferError("HOST_KEY_CHANGED", "This Stadium's identity has changed. Reconnect and check the device before uploading.");
  bool accepted = false;
  if (![keys isKindOfClass:NSArray.class] || keys.count == 0 || keys.count > 2) throw TransferError("AUTH", "Song upload credentials are unavailable in this build.");
  for (NSString *key in keys) {
    if (![key isKindOfClass:NSString.class] || key.length > 8192 || key.length < 100) continue;
    NSData *data = [key dataUsingEncoding:NSUTF8StringEncoding];
    if (!libssh2_userauth_publickey_frommemory(c.session, "hedit", 5, nullptr, 0, (const char *)data.bytes, data.length, nullptr)) { accepted = true; break; }
  }
  if (!accepted) throw TransferError("AUTH", "The Stadium did not accept song uploads. Check that its firmware is supported.");
  c.sftp = libssh2_sftp_init(c.session);
  if (!c.sftp) throw TransferError("CONNECTION", "The Stadium's file connection could not be opened.");
}
static void checkCancelled(const std::shared_ptr<std::atomic_bool> &cancelled) {
  if (*cancelled) throw TransferError("CANCELLED", "Song upload cancelled.");
}
static bool safeArchiveName(NSString *name) {
  if (![name isKindOfClass:NSString.class]) return false;
  NSRegularExpression *pattern = [NSRegularExpression regularExpressionWithPattern:@"^helyon-[a-f0-9]{32}\\.p35song$" options:0 error:nil];
  return [pattern numberOfMatchesInString:name options:0 range:NSMakeRange(0, name.length)] == 1;
}
}

@interface StadiumTransfer : RCTEventEmitter <RCTBridgeModule> {
  std::shared_ptr<std::atomic_bool> _cancelled;
  NSString *_jobId;
  std::shared_ptr<std::atomic_bool> _commitAllowed;
}
@end

@implementation StadiumTransfer
RCT_EXPORT_MODULE();
+ (BOOL)requiresMainQueueSetup { return NO; }
- (NSArray<NSString *> *)supportedEvents { return @[@"StadiumSongUploadProgress"]; }
RCT_EXPORT_METHOD(newJob:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) { resolve([[NSUUID.UUID.UUIDString lowercaseString] stringByReplacingOccurrencesOfString:@"-" withString:@""]); }
RCT_EXPORT_METHOD(probe:(NSString *)host resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  dispatch_async(dispatch_get_global_queue(QOS_CLASS_USER_INITIATED, 0), ^{
    try { Connection c; connectHost(c, host); resolve(@{@"fingerprint": fingerprint(c)}); }
    catch (const TransferError &e) { reject(@(e.code.c_str()), @(e.what()), nil); }
    catch (const std::exception &) { reject(@"CONNECTION", @"The Stadium's identity could not be checked.", nil); }
  });
}
RCT_EXPORT_METHOD(cancel:(NSString *)jobId) {
  @synchronized (self) { if ([_jobId isEqualToString:jobId] && _cancelled) *_cancelled = true; }
}
RCT_EXPORT_METHOD(commit:(NSString *)jobId) {
  @synchronized (self) { if ([_jobId isEqualToString:jobId] && _commitAllowed) *_commitAllowed = true; }
}
RCT_EXPORT_METHOD(upload:(NSDictionary *)options resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSString *jobId = options[@"jobId"], *name = options[@"filename"];
  if (![jobId isKindOfClass:NSString.class] || jobId.length > 64 || !safeArchiveName(name)) { reject(@"BAD_UPLOAD", @"The song upload details are invalid.", nil); return; }
  std::shared_ptr<std::atomic_bool> cancelled, commitAllowed;
  @synchronized (self) {
    if (_jobId) { reject(@"BUSY", @"Another song upload is still running.", nil); return; }
    _jobId = [jobId copy]; _cancelled = std::make_shared<std::atomic_bool>(false); cancelled = _cancelled;
    _commitAllowed = std::make_shared<std::atomic_bool>(false); commitAllowed = _commitAllowed;
  }
  dispatch_async(dispatch_get_global_queue(QOS_CLASS_USER_INITIATED, 0), ^{
    Connection c; File local; LIBSSH2_SFTP_HANDLE *remote = nullptr;
    NSString *finalPath = [@"/data/stadium-family-fw/songs/archives/" stringByAppendingString:name];
    NSString *partPath = [finalPath stringByAppendingString:@".part"];
    bool partCreated = false, finalCreated = false, committed = false;
    try {
      checkCancelled(cancelled);
      NSString *uri = options[@"uri"];
      if (![uri isKindOfClass:NSString.class]) throw TransferError("FILE", "The prepared song file is missing.");
      NSURL *url = [NSURL URLWithString:uri];
      NSString *path = url.isFileURL ? url.path.stringByStandardizingPath.stringByResolvingSymlinksInPath : nil;
      NSString *home = [NSHomeDirectory() stringByAppendingString:@"/"];
      if (!path || ![path hasPrefix:home]) throw TransferError("FILE", "Choose an audio file using the file picker.");
      local.fd = open(path.fileSystemRepresentation, O_RDONLY | O_NOFOLLOW);
      struct stat info = {};
      if (local.fd < 0 || fstat(local.fd, &info) != 0 || !S_ISREG(info.st_mode) || info.st_size < 1024 || info.st_size > 1073741824) throw TransferError("FILE", "The prepared song file is invalid or too large.");
      connectHost(c, options[@"host"]); checkCancelled(cancelled);
      authenticate(c, options[@"fingerprint"], options[@"keys"]); checkCancelled(cancelled);
      LIBSSH2_SFTP_STATVFS storage = {};
      const char *directory = "/data/stadium-family-fw/songs/archives";
      if (libssh2_sftp_statvfs(c.sftp, directory, strlen(directory), &storage) == 0 && storage.f_bavail * storage.f_frsize < (unsigned long long)info.st_size + 1048576) throw TransferError("SPACE", "The Stadium needs more free storage for this song.");
      LIBSSH2_SFTP_ATTRIBUTES existing = {};
      if (!libssh2_sftp_stat(c.sftp, finalPath.UTF8String, &existing)) throw TransferError("EXISTS", "This upload already exists. Refresh the song library before trying again.");
      remote = libssh2_sftp_open(c.sftp, partPath.UTF8String, LIBSSH2_FXF_WRITE | LIBSSH2_FXF_CREAT | LIBSSH2_FXF_EXCL, 0644);
      if (!remote) throw TransferError("WRITE", "The Stadium could not create the song upload. Check its available storage.");
      partCreated = true;
      unsigned char bytes[32768], firstByte = 0;
      long long total = 0; auto lastEvent = std::chrono::steady_clock::now();
      while (total < info.st_size) {
        checkCancelled(cancelled);
        ssize_t count = read(local.fd, bytes, sizeof(bytes));
        if (count <= 0) throw TransferError("FILE", "The prepared song file could not be read completely.");
        if (total == 0) firstByte = bytes[0];
        ssize_t offset = 0;
        while (offset < count) {
          checkCancelled(cancelled);
          ssize_t written = libssh2_sftp_write(remote, (const char *)bytes + offset, count - offset);
          if (written <= 0) throw TransferError("CONNECTION", "The song upload was interrupted. Reconnect, then check the song library.");
          offset += written; total += written;
        }
        auto now = std::chrono::steady_clock::now();
        if (now - lastEvent >= std::chrono::milliseconds(100) || total == info.st_size) {
          [self sendEventWithName:@"StadiumSongUploadProgress" body:@{@"jobId": jobId, @"bytes": @(total), @"total": @(info.st_size)}]; lastEvent = now;
        }
      }
      if (libssh2_sftp_close(remote)) { remote = nullptr; throw TransferError("WRITE", "The Stadium could not finish writing the upload."); }
      remote = nullptr;
      LIBSSH2_SFTP_ATTRIBUTES uploaded = {};
      if (libssh2_sftp_stat(c.sftp, partPath.UTF8String, &uploaded) || uploaded.filesize != (unsigned long long)info.st_size) throw TransferError("WRITE", "The uploaded song size could not be verified.");
      [self sendEventWithName:@"StadiumSongUploadProgress" body:@{@"jobId": jobId, @"phase": @"ready", @"bytes": @(total), @"total": @(info.st_size)}];
      auto deadline = std::chrono::steady_clock::now() + std::chrono::seconds(20);
      while (!*commitAllowed) {
        checkCancelled(cancelled);
        if (std::chrono::steady_clock::now() > deadline) throw TransferError("TIMEOUT", "The song could not be checked before import. Refresh and try again.");
        std::this_thread::sleep_for(std::chrono::milliseconds(50));
      }
      checkCancelled(cancelled);
      if (libssh2_sftp_rename_ex(c.sftp, partPath.UTF8String, (unsigned int)strlen(partPath.UTF8String), finalPath.UTF8String, (unsigned int)strlen(finalPath.UTF8String), 0)) throw TransferError("WRITE", "The Stadium could not finish the song transfer.");
      partCreated = false; finalCreated = true; checkCancelled(cancelled);
      // The Stadium imports after a write event. The complete archive is already in place.
      remote = libssh2_sftp_open(c.sftp, finalPath.UTF8String, LIBSSH2_FXF_WRITE, 0);
      if (!remote) throw TransferError("WRITE", "The song was uploaded but could not be submitted for import.");
      if (libssh2_sftp_write(remote, (const char *)&firstByte, 1) != 1) throw TransferError("WRITE", "The Stadium could not begin importing the song.");
      committed = true;
      int closeResult = libssh2_sftp_close(remote); remote = nullptr;
      if (closeResult) throw TransferError("IMPORT_UNCERTAIN", "The upload finished, but import confirmation was interrupted. Check the song library before retrying.");
      resolve(@{@"filename": name, @"bytes": @(total), @"committed": @YES});
    } catch (const std::exception &error) {
      // Remove only this operation's own, uncommitted files. Never remove imported songs.
      if (c.sftp && !committed) {
        if (partCreated) libssh2_sftp_unlink(c.sftp, partPath.UTF8String);
        if (finalCreated) libssh2_sftp_unlink(c.sftp, finalPath.UTF8String);
      }
      if (remote) { libssh2_sftp_close(remote); remote = nullptr; }
      const auto *specific = dynamic_cast<const TransferError *>(&error);
      reject(specific ? @(specific->code.c_str()) : @"UPLOAD", specific ? @(error.what()) : @"The song upload failed. Check the song library before trying again.", nil);
    }
    @synchronized (self) { _jobId = nil; _cancelled.reset(); _commitAllowed.reset(); }
  });
}
@end
