package com.helyon.discovery;

import android.content.Context;
import android.net.nsd.NsdManager;
import android.net.nsd.NsdServiceInfo;
import android.os.Handler;
import android.os.Looper;
import com.facebook.react.bridge.*;
import java.util.ArrayDeque;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public final class StadiumDiscoveryModule extends ReactContextBaseJavaModule {
  private static final String TYPE = "_stadiumserver._tcp";
  private final Handler main = new Handler(Looper.getMainLooper());
  private final NsdManager manager;
  private Browse scan;
  private boolean resolving;
  private boolean invalidated;

  StadiumDiscoveryModule(ReactApplicationContext context) {
    super(context);
    manager = (NsdManager) context.getSystemService(Context.NSD_SERVICE);
  }
  @Override public String getName() { return "StadiumDiscovery"; }

  @ReactMethod public void discover(double scanId, double timeoutMs, Promise promise) {
    main.post(() -> {
      if (invalidated || manager == null) { promise.reject("DISCOVERY", "Network search is unavailable. Enter the Stadium's IP address instead."); return; }
      if (scan != null) scan.finish(null);
      Browse next = new Browse(scanId, promise);
      scan = next;
      long duration = Double.isFinite(timeoutMs) ? (long) Math.min(15000, Math.max(1000, timeoutMs)) : 6000;
      main.postDelayed(next.timeout, duration);
      try { manager.discoverServices(TYPE, NsdManager.PROTOCOL_DNS_SD, next); }
      catch (RuntimeException error) { next.finish("Could not search this network. Check Wi-Fi and local network permissions, then try again."); }
    });
  }
  @ReactMethod public void cancel(double scanId) {
    main.post(() -> { if (scan != null && scan.id == scanId) scan.finish(null); });
  }
  @Override public void invalidate() {
    main.post(() -> { invalidated = true; if (scan != null) scan.finish(null); });
    super.invalidate();
  }

  private final class Browse implements NsdManager.DiscoveryListener {
    final double id;
    Promise promise;
    final Map<String, NsdServiceInfo> results = new HashMap<>();
    final Set<String> present = new HashSet<>();
    final ArrayDeque<NsdServiceInfo> queue = new ArrayDeque<>();
    final Runnable timeout = () -> finish(null);
    boolean stopped;

    Browse(double id, Promise promise) { this.id = id; this.promise = promise; }
    @Override public void onDiscoveryStarted(String type) { main.post(() -> { if (promise == null) stop(); }); }
    @Override public void onStartDiscoveryFailed(String type, int code) { main.post(() -> finish("Could not search this network. Check Wi-Fi and local network permissions, then try again.")); }
    @Override public void onStopDiscoveryFailed(String type, int code) { /* The scan is already bounded and no longer accepts callbacks. */ }
    @Override public void onDiscoveryStopped(String type) { main.post(() -> { stopped = true; finish(null); }); }
    @Override public void onServiceFound(NsdServiceInfo service) {
      main.post(() -> {
        if (promise == null || !service.getServiceType().replaceAll("\\.$", "").equals(TYPE) || present.size() >= 64 || !present.add(service.getServiceName())) return;
        queue.add(service);
        resolveNext();
      });
    }
    @Override public void onServiceLost(NsdServiceInfo service) {
      main.post(() -> { present.remove(service.getServiceName()); results.remove(service.getServiceName()); });
    }
    // Older Android versions only permit one service resolution at a time.
    @SuppressWarnings("deprecation") private void resolveNext() {
      if (promise == null || resolving || queue.isEmpty()) return;
      NsdServiceInfo service = queue.remove();
      if (!present.contains(service.getServiceName())) { resolveNext(); return; }
      resolving = true;
      try {
        manager.resolveService(service, new NsdManager.ResolveListener() {
          @Override public void onResolveFailed(NsdServiceInfo info, int code) { main.post(() -> { resolving = false; if (scan != null) scan.resolveNext(); }); }
          @Override public void onServiceResolved(NsdServiceInfo info) {
            main.post(() -> {
              resolving = false;
              if (promise != null && present.contains(info.getServiceName()) && info.getHost() != null && info.getPort() > 0 && info.getPort() < 65535) results.put(info.getServiceName(), info);
              if (scan != null) scan.resolveNext();
            });
          }
        });
      } catch (RuntimeException error) { resolving = false; resolveNext(); }
    }
    void stop() {
      if (stopped) return;
      try { manager.stopServiceDiscovery(this); stopped = true; }
      catch (RuntimeException ignored) { /* A late onDiscoveryStarted callback retries cancellation. */ }
    }
    void finish(String error) {
      if (promise == null) return;
      Promise pending = promise;
      promise = null;
      main.removeCallbacks(timeout);
      stop();
      queue.clear();
      if (scan == this) scan = null;
      if (error != null) { pending.reject("DISCOVERY", error); return; }
      WritableArray devices = Arguments.createArray();
      for (NsdServiceInfo info : results.values()) {
        WritableMap device = Arguments.createMap();
        device.putString("name", info.getServiceName());
        device.putString("host", info.getHost().getHostAddress());
        device.putInt("port", info.getPort());
        device.putString("type", TYPE);
        devices.pushMap(device);
      }
      pending.resolve(devices);
    }
  }
}
