package com.helyon.usb;
import android.hardware.usb.*;
import org.junit.Test;
import org.mockito.InOrder;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import static org.junit.Assert.*;
import static org.mockito.Mockito.*;
import static org.mockito.ArgumentMatchers.*;
public class UsbLinkTest {
    @Test public void claimsOnlyNcmAndNegotiatesWhileDataInterfaceIsIdle() throws Exception {
        UsbManager manager=mock(UsbManager.class);UsbDevice device=mock(UsbDevice.class);UsbDeviceConnection connection=mock(UsbDeviceConnection.class);
        UsbInterface control=mock(UsbInterface.class),idle=mock(UsbInterface.class),active=mock(UsbInterface.class);
        UsbEndpoint input=mock(UsbEndpoint.class),output=mock(UsbEndpoint.class);
        when(device.getVendorId()).thenReturn(0x0e41);when(device.getProductId()).thenReturn(0x4841);when(device.getInterfaceCount()).thenReturn(3);
        when(device.getInterface(0)).thenReturn(control);when(device.getInterface(1)).thenReturn(idle);when(device.getInterface(2)).thenReturn(active);
        when(control.getId()).thenReturn(7);when(control.getInterfaceClass()).thenReturn(2);when(control.getInterfaceSubclass()).thenReturn(13);
        when(idle.getId()).thenReturn(8);when(idle.getInterfaceClass()).thenReturn(10);
        when(active.getId()).thenReturn(8);when(active.getAlternateSetting()).thenReturn(1);when(active.getInterfaceClass()).thenReturn(10);when(active.getEndpointCount()).thenReturn(2);
        when(active.getEndpoint(0)).thenReturn(input);when(active.getEndpoint(1)).thenReturn(output);
        when(input.getType()).thenReturn(2);when(output.getType()).thenReturn(2);when(input.getDirection()).thenReturn(128);when(output.getDirection()).thenReturn(0);when(output.getMaxPacketSize()).thenReturn(512);
        when(manager.openDevice(device)).thenReturn(connection);when(connection.claimInterface(any(),eq(true))).thenReturn(true);when(connection.setInterface(any())).thenReturn(true);
        when(connection.getRawDescriptors()).thenReturn(new byte[]{9,4,7,0,1,2,13,0,0, 5,0x24,6,7,8, 13,0x24,15,4,0,0,0,0,0,0,0,0,0, 6,0x24,26,0,1,0x11});
        when(connection.controlTransfer(anyInt(),anyInt(),anyInt(),anyInt(),nullable(byte[].class),anyInt(),anyInt())).thenAnswer(invocation -> {
            int request=invocation.getArgument(1),length=invocation.getArgument(5);byte[] bytes=invocation.getArgument(4);
            if(request==0x80){NcmCodec.put16(bytes,0,28);NcmCodec.put16(bytes,2,3);NcmCodec.put32(bytes,4,16384);NcmCodec.put32(bytes,16,16384);NcmCodec.put16(bytes,20,4);NcmCodec.put16(bytes,24,4);return 28;}
            if(request==6){byte[] mac="06123456789a".getBytes(StandardCharsets.UTF_16LE);bytes[0]=26;bytes[1]=3;System.arraycopy(mac,0,bytes,2,24);return 26;}
            return length;
        });
        UsbLink link=new UsbLink(manager,device);
        assertArrayEquals(new byte[]{6,0x12,0x34,0x56,0x78,(byte)0x9a},link.mac);
        InOrder order=inOrder(connection);
        order.verify(connection).claimInterface(control,true);order.verify(connection).claimInterface(active,true);
        order.verify(connection).setInterface(idle);
        order.verify(connection).controlTransfer(eq(0xa1),eq(0x80),eq(0),eq(7),any(byte[].class),eq(28),eq(1000));
        order.verify(connection).controlTransfer(eq(0x21),eq(0x84),eq(0),eq(7),isNull(),eq(0),eq(1000));
        order.verify(connection).setInterface(active);
        order.verify(connection).controlTransfer(eq(0x21),eq(0x43),eq(0x0e),eq(7),isNull(),eq(0),eq(1000));
        verify(connection,times(2)).claimInterface(any(),eq(true));
        link.close();link.close();verify(connection,times(1)).close();verify(connection).releaseInterface(active);verify(connection).releaseInterface(control);
    }
    @Test public void ignoresOtherUsbProductsEvenWithLine6VendorId() {
        UsbDevice device=mock(UsbDevice.class);when(device.getVendorId()).thenReturn(0x0e41);when(device.getProductId()).thenReturn(0x1234);
        assertNull(UsbLink.ncmControl(device));verify(device,never()).getInterfaceCount();
    }
}
