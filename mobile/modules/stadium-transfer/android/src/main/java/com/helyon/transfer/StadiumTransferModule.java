package com.helyon.transfer;

import com.facebook.react.bridge.*;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.jcraft.jsch.*;
import java.io.*;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Base64;
import java.util.Properties;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicBoolean;

public final class StadiumTransferModule extends ReactContextBaseJavaModule {
  private String activeJob;
  private final AtomicBoolean cancelled = new AtomicBoolean(false), commitAllowed = new AtomicBoolean(false);
  StadiumTransferModule(ReactApplicationContext context) { super(context); }
  @Override public String getName() { return "StadiumTransfer"; }
  @ReactMethod public void addListener(String name) {}
  @ReactMethod public void removeListeners(double count) {}
  @ReactMethod public synchronized void cancel(String id) { if (id.equals(activeJob)) cancelled.set(true); }
  @ReactMethod public synchronized void commit(String id) { if (id.equals(activeJob)) commitAllowed.set(true); }
  private void checkCancelled() throws IOException { if (cancelled.get()) throw new IOException("Song upload cancelled."); }
  private static String fingerprint(byte[] key) {
    try { return "SHA256:" + Base64.getEncoder().withoutPadding().encodeToString(MessageDigest.getInstance("SHA-256").digest(key)); }
    catch (Exception e) { throw new IllegalStateException(e); }
  }
  private static Session session(String host, JSch client) throws Exception {
    if (host == null || !host.matches("[A-Za-z0-9.:-]{1,253}")) throw new IOException("Enter a valid Stadium device name or IP address.");
    Session session = client.getSession("hedit", host, 22);
    session.setTimeout(10000);
    Properties config = new Properties();
    config.put("StrictHostKeyChecking", "yes");
    config.put("PreferredAuthentications", "publickey");
    session.setConfig(config);
    return session;
  }
  private static HostKeyRepository pin(String expected, String[] observed) {
    return new HostKeyRepository() {
      public int check(String host, byte[] key) { observed[0] = fingerprint(key); return expected != null && expected.equals(observed[0]) ? OK : CHANGED; }
      public void add(HostKey key, UserInfo info) {}
      public void remove(String host, String type) {}
      public void remove(String host, String type, byte[] key) {}
      public String getKnownHostsRepositoryID() { return "Stadium paired identity"; }
      public HostKey[] getHostKey() { return new HostKey[0]; }
      public HostKey[] getHostKey(String host, String type) { return new HostKey[0]; }
    };
  }
  @ReactMethod public void newJob(Promise promise) { promise.resolve(java.util.UUID.randomUUID().toString().replace("-", "")); }
  @ReactMethod public void probe(String host, Promise promise) {
    java.util.concurrent.ForkJoinPool.commonPool().execute(() -> {
      Session session = null; String[] observed = {null};
      try {
        JSch client = new JSch(); client.setHostKeyRepository(pin(null, observed));
        session = session(host, client);
        try { session.connect(8000); } catch (JSchException e) { if (observed[0] == null) throw e; }
        WritableMap result = Arguments.createMap(); result.putString("fingerprint", observed[0]); promise.resolve(result);
      } catch (Exception e) { promise.reject("CONNECTION", "The Stadium's identity could not be checked."); }
      finally { if (session != null) session.disconnect(); }
    });
  }
  private void progress(String job, long bytes, long total, String phase) {
    WritableMap data = Arguments.createMap(); data.putString("jobId", job); data.putDouble("bytes", bytes); data.putDouble("total", total);
    if (phase != null) data.putString("phase", phase);
    getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("StadiumSongUploadProgress", data);
  }
  @ReactMethod public void upload(ReadableMap options, Promise promise) {
    final String job, filename;
    try {
      job = options.getString("jobId"); filename = options.getString("filename");
      if (job == null || job.length() > 64 || filename == null || !filename.matches("helyon-[a-f0-9]{32}\\.p35song")) throw new IOException();
    } catch (Exception e) { promise.reject("BAD_UPLOAD", "The song upload details are invalid."); return; }
    synchronized (this) {
      if (activeJob != null) { promise.reject("BUSY", "Another song upload is still running."); return; }
      activeJob = job; cancelled.set(false); commitAllowed.set(false);
    }
    java.util.concurrent.ForkJoinPool.commonPool().execute(() -> {
      Session session = null; ChannelSftp sftp = null;
      String destination = "/data/stadium-family-fw/songs/archives/" + filename, staging = destination + ".part";
      boolean staged = false, renamed = false, committed = false;
      try {
        checkCancelled();
        File file = new File(new URI(options.getString("uri"))).getCanonicalFile();
        String home = getReactApplicationContext().getApplicationInfo().dataDir + File.separator;
        if (!file.getPath().startsWith(home) || !file.isFile() || file.length() < 1024 || file.length() > 1073741824L) throw new IOException("The prepared song file is invalid or too large.");
        JSch client = new JSch(); ReadableArray keys = options.getArray("keys");
        if (keys == null || keys.size() < 1 || keys.size() > 2) throw new IOException("Song upload credentials are unavailable in this build.");
        for (int i = 0; i < keys.size(); i++) client.addIdentity("stadium-" + i, keys.getString(i).getBytes(StandardCharsets.UTF_8), null, null);
        String[] observed = {null}; client.setHostKeyRepository(pin(options.getString("fingerprint"), observed));
        session = session(options.getString("host"), client); session.connect(8000); checkCancelled();
        sftp = (ChannelSftp)session.openChannel("sftp"); sftp.connect(8000);
        try { if (sftp.statVFS("/data/stadium-family-fw/songs/archives").getAvailForNonRoot() * 1024L < file.length() + 1048576) throw new IOException("The Stadium needs more free storage for this song."); } catch (SftpException ignored) {}
        // Each name uses a random 128-bit operation ID and is checked before writing.
        for (String path : new String[]{staging, destination}) {
          try { sftp.lstat(path); throw new IOException("This upload already exists. Refresh the song library."); }
          catch (SftpException e) { if (e.id != ChannelSftp.SSH_FX_NO_SUCH_FILE) throw e; }
        }
        long total = 0, last = 0; int first;
        try (InputStream input = new FileInputStream(file); OutputStream output = sftp.put(staging, ChannelSftp.OVERWRITE)) {
          staged = true; byte[] buffer = new byte[32768]; first = input.read();
          if (first < 0) throw new IOException("The prepared song file is empty.");
          output.write(first); total++;
          for (int count; (count = input.read(buffer)) != -1;) {
            checkCancelled(); output.write(buffer, 0, count); total += count;
            long now = System.currentTimeMillis(); if (now - last > 100) { progress(job, total, file.length(), null); last = now; }
          }
        }
        if (sftp.stat(staging).getSize() != file.length()) throw new IOException("The uploaded song size could not be verified.");
        progress(job, total, file.length(), "ready"); long deadline = System.currentTimeMillis() + 20000;
        while (!commitAllowed.get()) { checkCancelled(); if (System.currentTimeMillis() > deadline) throw new IOException("The song could not be checked before import. Refresh and try again."); Thread.sleep(50); }
        checkCancelled(); sftp.rename(staging, destination); staged = false; renamed = true;
        // RESUME preserves the complete file; offset -length rewrites only the first byte.
        checkCancelled();
        try (OutputStream trigger = sftp.put(destination, null, ChannelSftp.RESUME, -file.length())) { trigger.write(first); committed = true; }
        WritableMap result = Arguments.createMap(); result.putString("filename", filename); result.putDouble("bytes", total); result.putBoolean("committed", true); promise.resolve(result);
      } catch (Exception e) {
        promise.reject(committed ? "IMPORT_UNCERTAIN" : cancelled.get() ? "CANCELLED" : "UPLOAD", committed ? "The upload finished, but import confirmation was interrupted. Check the song library before retrying." : e instanceof IOException ? e.getMessage() : "The song upload failed. Check Wi-Fi, the paired device and available storage.");
      } finally {
        if (sftp != null && sftp.isConnected()) { if (!committed) { try { if (staged) sftp.rm(staging); if (renamed) sftp.rm(destination); } catch (SftpException ignored) {} } sftp.disconnect(); }
        if (session != null) session.disconnect();
        synchronized (this) { activeJob = null; }
      }
    });
  }
}
