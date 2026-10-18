package com.asterinet.react.tcpsocket;

import android.net.Network;
import android.net.NetworkCapabilities;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import java.lang.reflect.Field;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.concurrent.ExecutorService;
import org.junit.Test;
import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

public class UsbConnectionTest {
    private static void stopExecutor(Object instance, String name) throws Exception {
        Field field = instance.getClass().getDeclaredField(name);
        field.setAccessible(true);
        ((ExecutorService) field.get(instance)).shutdownNow();
    }

    @Test public void failedNetworkSelectionCanBeDestroyedRepeatedly() throws Exception {
        TcpSocketModule module = new TcpSocketModule(mock(ReactApplicationContext.class));
        TcpEventListener listener = mock(TcpEventListener.class);
        Field field = TcpSocketModule.class.getDeclaredField("tcpEvtListener");
        field.setAccessible(true);
        field.set(module, listener);
        try {
            // This is the cleanup requested by JS when selectNetwork fails before
            // a native socket is registered. Previously it killed the process.
            module.destroy(42);
            module.destroy(42);
            verify(listener, timeout(2000).times(2)).onClose(42, null);
            verify(listener, never()).onError(anyInt(), any());
        } finally {
            stopExecutor(module, "executorService");
        }
    }

    @Test public void wiredSelectionAcceptsEthernetAndAndroid12Usb() {
        NetworkCapabilities ethernet = mock(NetworkCapabilities.class);
        when(ethernet.hasTransport(NetworkCapabilities.TRANSPORT_ETHERNET)).thenReturn(true);
        assertTrue(TcpSocketModule.matchesTransport(ethernet, NetworkCapabilities.TRANSPORT_ETHERNET, 24));

        NetworkCapabilities usb = mock(NetworkCapabilities.class);
        when(usb.hasTransport(NetworkCapabilities.TRANSPORT_USB)).thenReturn(true);
        assertTrue(TcpSocketModule.matchesTransport(usb, NetworkCapabilities.TRANSPORT_ETHERNET, 31));
        assertFalse(TcpSocketModule.matchesTransport(usb, NetworkCapabilities.TRANSPORT_ETHERNET, 30));
        assertFalse(TcpSocketModule.matchesTransport(usb, NetworkCapabilities.TRANSPORT_WIFI, 34));
    }

    @Test public void wiredSelectionNeverFallsBackToWifiOrMissingCapabilities() {
        NetworkCapabilities wifi = mock(NetworkCapabilities.class);
        when(wifi.hasTransport(NetworkCapabilities.TRANSPORT_WIFI)).thenReturn(true);
        assertFalse(TcpSocketModule.matchesTransport(wifi, NetworkCapabilities.TRANSPORT_ETHERNET, 34));
        assertFalse(TcpSocketModule.matchesTransport(null, NetworkCapabilities.TRANSPORT_ETHERNET, 34));
        assertTrue(TcpSocketModule.matchesTransport(wifi, NetworkCapabilities.TRANSPORT_WIFI, 34));
    }

    private void checkScopedConnection(String loopback) throws Exception {
        InetAddress address = InetAddress.getByName(loopback);
        Network network = mock(Network.class);
        when(network.getByName("stadium.invalid")).thenReturn(address);
        TcpSocketClient client = new TcpSocketClient(mock(TcpEventListener.class), 7, null);
        try (ServerSocket server = new ServerSocket(0, 1, address)) {
            server.setSoTimeout(2000);
            client.connect(null, "stadium.invalid", server.getLocalPort(), mock(ReadableMap.class), network, null);
            try (Socket accepted = server.accept()) {
                assertTrue(client.getSocket().isConnected());
                assertEquals(address, client.getSocket().getInetAddress());
                verify(network).getByName("stadium.invalid");
                verify(network).bindSocket(client.getSocket());
            }
        } finally {
            client.destroy();
            stopExecutor(client, "listenExecutor");
            stopExecutor(client, "writeExecutor");
        }
    }

    @Test public void deviceNamesResolveOnSelectedNetworkIpv4() throws Exception {
        checkScopedConnection("127.0.0.1");
    }

    @Test public void ipv6DeviceConnectionUsesCompatibleLocalAddress() throws Exception {
        checkScopedConnection("::1");
    }
}
