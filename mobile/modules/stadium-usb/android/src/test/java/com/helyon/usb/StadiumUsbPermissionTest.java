package com.helyon.usb;

import android.content.Intent;
import android.hardware.usb.*;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import java.lang.reflect.Field;
import java.util.Collections;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import org.junit.Test;
import org.mockito.MockedConstruction;
import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

public class StadiumUsbPermissionTest {
    private void drain(StadiumUsbModule module) throws Exception {
        Field field=StadiumUsbModule.class.getDeclaredField("worker");
        field.setAccessible(true);
        ((ScheduledExecutorService)field.get(module)).submit(() -> {}).get(2,TimeUnit.SECONDS);
    }

    @Test public void dismissedDialogWithoutCallbackCanBeRetriedWithoutUnplugging() throws Exception {
        ReactApplicationContext context=mock(ReactApplicationContext.class);
        UsbManager manager=mock(UsbManager.class);
        UsbDevice device=mock(UsbDevice.class);
        UsbInterface control=mock(UsbInterface.class);
        when(context.getSystemService(android.content.Context.USB_SERVICE)).thenReturn(manager);
        when(context.getPackageName()).thenReturn("com.beggars.stadiumremote");
        when(device.getVendorId()).thenReturn(0x0e41);
        when(device.getProductId()).thenReturn(0x4841);
        when(device.getInterfaceCount()).thenReturn(1);
        when(device.getInterface(0)).thenReturn(control);
        when(control.getInterfaceClass()).thenReturn(2);
        when(control.getInterfaceSubclass()).thenReturn(13);
        when(manager.getDeviceList()).thenReturn(new java.util.HashMap<>(Collections.singletonMap("stadium",device)));
        try(MockedConstruction<Intent> intents=mockConstruction(Intent.class,(intent, ignored) -> {
            when(intent.setPackage(anyString())).thenReturn(intent);
            when(intent.putExtra(anyString(),anyLong())).thenReturn(intent);
        })) {
            ScheduledExecutorService worker=new java.util.concurrent.ScheduledThreadPoolExecutor(1) {
                @Override public void execute(Runnable command) { command.run(); }
            };
            StadiumUsbModule module=new StadiumUsbModule(context,worker);
            try {
                Promise first=mock(Promise.class);
                module.open(1,2001,first); drain(module);
                module.onHostPause(); module.onHostResume(); drain(module);
                verify(first).reject(eq("USB_CONNECT"),contains("Tap Connect to try again"));
                Promise second=mock(Promise.class);
                module.open(2,2001,second); drain(module);
                verify(manager,times(2)).requestPermission(eq(device),any());
                verifyNoInteractions(second);
                // Normal foreground notifications must not dismiss a new request.
                module.onHostResume(); drain(module);
                verifyNoInteractions(second);
            } finally {
                module.invalidate();
                Field field=StadiumUsbModule.class.getDeclaredField("worker");
                field.setAccessible(true);
                assertTrue(((ScheduledExecutorService)field.get(module)).awaitTermination(2,TimeUnit.SECONDS));
            }
        }
    }
}
