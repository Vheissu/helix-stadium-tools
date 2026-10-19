#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#include <math.h>

// Each browse owns its delegates and timer. Stale callbacks cannot affect a newer browse.
@interface StadiumBrowse : NSObject <NSNetServiceBrowserDelegate, NSNetServiceDelegate>
@property(nonatomic, strong) NSNetServiceBrowser *browser;
@property(nonatomic, strong) NSMutableSet<NSNetService *> *services;
@property(nonatomic, strong) NSMutableDictionary<NSString *, NSDictionary *> *results;
@property(nonatomic, strong) NSTimer *timer;
@property(nonatomic, copy) RCTPromiseResolveBlock resolve;
@property(nonatomic, copy) RCTPromiseRejectBlock reject;
- (void)finish:(NSString *)error;
@end

@implementation StadiumBrowse
- (instancetype)init {
  if ((self = [super init])) {
    _services = [NSMutableSet new];
    _results = [NSMutableDictionary new];
  }
  return self;
}
- (NSString *)key:(NSNetService *)service { return service.name; }
- (void)netServiceBrowser:(NSNetServiceBrowser *)browser didFindService:(NSNetService *)service moreComing:(BOOL)more {
  if (!self.resolve || self.services.count >= 64) return;
  [self.services addObject:service];
  service.delegate = self;
  [service resolveWithTimeout:4.0];
}
- (void)netServiceBrowser:(NSNetServiceBrowser *)browser didRemoveService:(NSNetService *)service moreComing:(BOOL)more {
  [self.results removeObjectForKey:[self key:service]];
  for (NSNetService *found in self.services.allObjects) {
    if ([found.name isEqualToString:service.name]) {
      found.delegate = nil;
      [found stop];
      [self.services removeObject:found];
    }
  }
}
- (void)netServiceDidResolveAddress:(NSNetService *)service {
  if (!self.resolve || ![self.services containsObject:service] || !service.hostName.length || service.port < 1 || service.port > 65534) return;
  NSString *host = service.hostName;
  while ([host hasSuffix:@"."]) host = [host substringToIndex:host.length - 1];
  self.results[[self key:service]] = @{
    @"name": service.name, @"host": host, @"port": @(service.port), @"type": @"_stadiumserver._tcp"
  };
}
- (void)netServiceBrowser:(NSNetServiceBrowser *)browser didNotSearch:(NSDictionary<NSString *, NSNumber *> *)error {
  [self finish:@"Could not search this network. Allow Local Network access for HELYON in Settings, then search again."];
}
- (void)finish:(NSString *)error {
  if (!self.resolve) return;
  RCTPromiseResolveBlock resolve = self.resolve;
  RCTPromiseRejectBlock reject = self.reject;
  self.resolve = nil;
  self.reject = nil;
  [self.timer invalidate];
  self.timer = nil;
  self.browser.delegate = nil;
  [self.browser stop];
  self.browser = nil;
  for (NSNetService *service in self.services) { service.delegate = nil; [service stop]; }
  [self.services removeAllObjects];
  if (error) reject(@"DISCOVERY", error, nil);
  else resolve(self.results.allValues);
}
@end

@interface StadiumDiscovery : NSObject <RCTBridgeModule>
@property(nonatomic, strong) StadiumBrowse *scan;
@property(nonatomic, copy) NSNumber *scanId;
@end

@implementation StadiumDiscovery
RCT_EXPORT_MODULE(StadiumDiscovery)
+ (BOOL)requiresMainQueueSetup { return YES; }
- (dispatch_queue_t)methodQueue { return dispatch_get_main_queue(); }
RCT_REMAP_METHOD(discover, discover:(NSNumber *)scanId timeout:(double)timeoutMs
                 resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  [self.scan finish:nil];
  StadiumBrowse *scan = [StadiumBrowse new];
  self.scan = scan;
  self.scanId = scanId;
  scan.resolve = resolve;
  scan.reject = reject;
  scan.browser = [NSNetServiceBrowser new];
  scan.browser.delegate = scan;
  __weak StadiumBrowse *weakScan = scan;
  double seconds = isfinite(timeoutMs) ? MIN(15.0, MAX(1.0, timeoutMs / 1000.0)) : 6.0;
  scan.timer = [NSTimer scheduledTimerWithTimeInterval:seconds repeats:NO block:^(NSTimer *timer) { [weakScan finish:nil]; }];
  [scan.browser searchForServicesOfType:@"_stadiumserver._tcp." inDomain:@"local."];
}
RCT_EXPORT_METHOD(cancel:(NSNumber *)scanId) {
  if ([self.scanId isEqualToNumber:scanId]) { [self.scan finish:nil]; self.scan = nil; }
}
- (void)invalidate {
  StadiumBrowse *scan = self.scan;
  dispatch_async(dispatch_get_main_queue(), ^{ [scan finish:nil]; });
}
@end
