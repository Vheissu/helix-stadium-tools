package com.helyon.usb;

import android.app.PendingIntent;
import android.content.*;
import android.hardware.usb.*;
import android.os.Build;
import android.util.Base64;
import com.facebook.react.bridge.*;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.concurrent.*;

public final class StadiumUsbModule extends ReactContextBaseJavaModule {
    static { System.loadLibrary("helyon_usb"); }
    private static final Object NATIVE_LOCK=new Object();
    private static StadiumUsbModule nativeOwner;
    private final ReactApplicationContext context;
    private final UsbManager manager;
    private final ScheduledExecutorService worker=Executors.newSingleThreadScheduledExecutor();
    private final Map<Integer,Channel> channels=new HashMap<>();
    private final ArrayDeque<byte[]> frames=new ArrayDeque<>();
    private final String permissionAction;
    private UsbDevice awaitingPermission;
    private UsbLink link;
    private ScheduledFuture<?> pump,permissionTimer;
    private volatile boolean invalidated;
    private static final class Channel { final int id,port; Promise promise; Channel(int id,int port,Promise promise){this.id=id;this.port=port;this.promise=promise;} }
    private final BroadcastReceiver receiver=new BroadcastReceiver() {
        @Override public void onReceive(Context ignored,Intent intent) {
            if(worker.isShutdown()) return;
            if(permissionAction.equals(intent.getAction())) worker.execute(() -> {
                UsbDevice device=awaitingPermission;
                if(device==null || channels.isEmpty()) return;
                awaitingPermission=null;
                if(permissionTimer!=null) permissionTimer.cancel(false);
                // Query UsbManager; don't trust a broadcast's claimed grant or device.
                if(!manager.hasPermission(device)) { failAll("Allow HELYON to access the Stadium USB connection, then try again."); return; }
                start(device);
            });
            else if(UsbManager.ACTION_USB_DEVICE_DETACHED.equals(intent.getAction())) {
                UsbDevice removed=intent.getParcelableExtra(UsbManager.EXTRA_DEVICE);
                if(removed!=null) worker.execute(() -> {
                    if((link!=null && link.device.equals(removed)) || (awaitingPermission!=null && awaitingPermission.equals(removed)))
                        failAll("USB cable disconnected. Reconnect the Stadium and try again.");
                });
            }
        }
    };
    StadiumUsbModule(ReactApplicationContext context) {
        super(context); this.context=context; manager=(UsbManager)context.getSystemService(Context.USB_SERVICE);
        permissionAction=context.getPackageName()+".STADIUM_USB_PERMISSION";
        IntentFilter filter=new IntentFilter(permissionAction); filter.addAction(UsbManager.ACTION_USB_DEVICE_DETACHED);
        if(Build.VERSION.SDK_INT>=33) context.registerReceiver(receiver,filter,Context.RECEIVER_NOT_EXPORTED);
        else context.registerReceiver(receiver,filter);
    }
    @Override public String getName(){return "StadiumUsb";}
    @ReactMethod public void addListener(String event) {}
    @ReactMethod public void removeListeners(double count) {}
    @ReactMethod public void open(int id,int port,Promise promise) {
        if(invalidated) { promise.reject("USB_CLOSED","USB connection is unavailable."); return; }
        worker.execute(() -> {
            if(id<=0 || (port!=2001 && port!=2002) || channels.containsKey(id) || channels.size()>=4) { promise.reject("USB_ARGUMENT","Invalid USB connection request."); return; }
            Channel c=new Channel(id,port,promise); channels.put(id,c);
            if(link!=null) { if(!connectNative(id,port)) failAll("Could not open the Stadium USB connection."); return; }
            if(awaitingPermission!=null) return;
            List<UsbDevice> candidates=new ArrayList<>();
            for(UsbDevice device:manager.getDeviceList().values()) if(UsbLink.ncmControl(device)!=null) candidates.add(device);
            if(candidates.size()!=1) { failAll(candidates.isEmpty()?"No Stadium found over USB. Connect a data cable and use firmware 1.4 or later.":"Connect one Stadium by USB at a time."); return; }
            UsbDevice device=candidates.get(0);
            if(manager.hasPermission(device)) { start(device); return; }
            awaitingPermission=device;
            permissionTimer=worker.schedule(() -> failAll("USB permission timed out. Reconnect and allow HELYON to access the Stadium."),45,TimeUnit.SECONDS);
            Intent intent=new Intent(permissionAction).setPackage(context.getPackageName());
            PendingIntent permission=PendingIntent.getBroadcast(context,device.getDeviceId(),intent,PendingIntent.FLAG_UPDATE_CURRENT|PendingIntent.FLAG_IMMUTABLE);
            try { manager.requestPermission(device,permission); }
            catch(Exception error) { failAll("Android could not request USB access. Reconnect the Stadium and try again."); }
        });
    }
    private void start(UsbDevice device) {
        try {
            link=new UsbLink(manager,device);
            synchronized(NATIVE_LOCK) {
                if(nativeOwner!=null && nativeOwner!=this) throw new IOException("USB is still closing. Try connecting again.");
                nativeOwner=this; nativeStart(link.mac);
            }
            for(Channel c:channels.values()) if(!connectNative(c.id,c.port)) throw new IOException("Could not open the Stadium USB connection.");
            pump=worker.scheduleWithFixedDelay(() -> {
                try {
                    // Always process input, even while writes are queued, so ACKs progress.
                    List<byte[]> incoming=link.receive();
                    synchronized(NATIVE_LOCK) {
                        if(nativeOwner!=this) throw new IOException("USB connection closed.");
                        for(byte[] packet:incoming) nativeInput(packet);
                        nativeTick();
                    }
                    int budget=64;
                    while(!frames.isEmpty() && budget-->0) link.send(frames.removeFirst());
                    if(!manager.getDeviceList().containsKey(device.getDeviceName())) throw new IOException("USB cable disconnected. Reconnect the Stadium.");
                } catch(Exception error) { failAll(error.getMessage()==null?"USB connection failed. Reconnect the Stadium.":error.getMessage()); }
            },0,10,TimeUnit.MILLISECONDS);
        } catch(Exception error) { failAll(error.getMessage()==null?"Could not start the Stadium USB connection.":error.getMessage()); }
    }
    @ReactMethod public void write(int id,String base64) {
        if(invalidated) return;
        // Reject oversized bridge messages before decoding or queueing them.
        if(base64.length()>1400000) { worker.execute(() -> failAll("USB send queue is full. Reconnect the Stadium.")); return; }
        worker.execute(() -> {
            if(link==null || !channels.containsKey(id)) return;
            try { if(!writeNative(id,Base64.decode(base64,Base64.NO_WRAP))) failAll("USB send queue is full. Reconnect the Stadium."); }
            catch(IllegalArgumentException error) { failAll("Invalid USB data."); }
        });
    }
    @ReactMethod public void close(int id) {
        if(invalidated) return;
        worker.execute(() -> {
            Channel c=channels.remove(id);
            if(c!=null && c.promise!=null) c.promise.reject("USB_CLOSED","Connection cancelled.");
            synchronized(NATIVE_LOCK) { if(nativeOwner==this) nativeClose(id); }
            if(channels.isEmpty()) stop();
        });
    }
    // Called synchronously by JNI only on the worker thread. Never recursively stop lwIP.
    private void onNativeEvent(int id,int kind,byte[] bytes) {
        Channel c=channels.get(id); if(c==null) return;
        if(kind==1) { if(c.promise!=null) { c.promise.resolve(null); c.promise=null; } return; }
        String message=bytes==null?"":new String(bytes,StandardCharsets.UTF_8);
        if(kind==4 && c.promise!=null) { c.promise.reject("USB_CONNECT",message); c.promise=null; }
        WritableMap event=Arguments.createMap(); event.putInt("id",id); event.putInt("kind",kind);
        if(kind==2) event.putString("data",Base64.encodeToString(bytes,Base64.NO_WRAP));
        if(kind==4) event.putString("message",message);
        if(context.hasActiveReactInstance()) context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("StadiumUsbSocket",event);
    }
    private boolean onNativeFrame(byte[] bytes) { if(frames.size()>=256) return false; frames.addLast(bytes); return true; }
    private void failAll(String message) {
        for(Channel c:channels.values()) {
            if(c.promise!=null) { c.promise.reject("USB_CONNECT",message); c.promise=null; }
            else onNativeEvent(c.id,4,message.getBytes(StandardCharsets.UTF_8));
        }
        channels.clear(); stop();
    }
    private void stop() {
        if(permissionTimer!=null) { permissionTimer.cancel(false); permissionTimer=null; }
        awaitingPermission=null;
        if(pump!=null) { pump.cancel(false); pump=null; }
        if(link!=null) {
            synchronized(NATIVE_LOCK) { if(nativeOwner==this) { nativeStop(); nativeOwner=null; } }
            link.close(); link=null;
        }
        frames.clear();
    }
    @Override public void invalidate() {
        invalidated=true; context.unregisterReceiver(receiver);
        worker.execute(() -> { failAll("USB connection closed."); worker.shutdown(); });
        super.invalidate();
    }
    private boolean connectNative(int id,int port) { synchronized(NATIVE_LOCK) { return nativeOwner==this && nativeConnect(id,port); } }
    private boolean writeNative(int id,byte[] bytes) { synchronized(NATIVE_LOCK) { return nativeOwner==this && nativeWrite(id,bytes); } }
    private native void nativeStart(byte[] mac);
    private native void nativeStop();
    private native void nativeInput(byte[] frame);
    private native void nativeTick();
    private native boolean nativeConnect(int id,int port);
    private native boolean nativeWrite(int id,byte[] bytes);
    private native void nativeClose(int id);
}
