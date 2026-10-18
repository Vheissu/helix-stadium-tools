package com.helyon.usb;

import android.hardware.usb.*;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.util.List;

final class UsbLink implements AutoCloseable {
    final UsbDevice device;
    final byte[] mac;
    private final UsbDeviceConnection connection;
    private final UsbInterface control, data;
    private final UsbEndpoint input, output;
    private final NcmCodec codec;
    private final byte[] receiveBuffer = new byte[NcmCodec.RECEIVE_SIZE];
    private volatile boolean closed;

    static UsbInterface ncmControl(UsbDevice device) {
        if(device.getVendorId()!=0x0e41 || (device.getProductId()!=0x4841 && device.getProductId()!=0x4842)) return null;
        for(int i=0;i<device.getInterfaceCount();i++) {
            UsbInterface iface=device.getInterface(i);
            if(iface.getInterfaceClass()==2 && iface.getInterfaceSubclass()==13) return iface;
        }
        return null;
    }
    UsbLink(UsbManager manager, UsbDevice device) throws IOException {
        this.device=device;
        control=ncmControl(device);
        if(control==null) throw new IOException("Connect a Helix Stadium running firmware 1.4 or later.");
        connection=manager.openDevice(device);
        if(connection==null) throw new IOException("Android could not open the Stadium. Reconnect the USB cable.");
        UsbInterface selected=null; UsbEndpoint in=null,out=null;
        try {
            byte[] descriptors=connection.getRawDescriptors();
            int current=-1, dataId=-1, macIndex=0, capabilities=0;
            for(int p=0;p+2<=descriptors.length;) {
                int len=descriptors[p]&255;
                if(len<2 || p+len>descriptors.length) throw new IOException("Invalid Stadium USB descriptors.");
                int type=descriptors[p+1]&255;
                if(type==4 && len>=9) current=descriptors[p+2]&255;
                if(current==control.getId() && type==0x24 && len>=3) {
                    int subtype=descriptors[p+2]&255;
                    if(subtype==6 && len>=5 && (descriptors[p+3]&255)==control.getId()) dataId=descriptors[p+4]&255;
                    if(subtype==15 && len>=13) macIndex=descriptors[p+3]&255;
                    if(subtype==26 && len>=6) capabilities=descriptors[p+5]&255;
                }
                p+=len;
            }
            for(int i=0;i<device.getInterfaceCount();i++) {
                UsbInterface iface=device.getInterface(i);
                if(iface.getId()!=dataId || iface.getInterfaceClass()!=10) continue;
                UsbEndpoint candidateIn=null,candidateOut=null;
                for(int e=0;e<iface.getEndpointCount();e++) {
                    UsbEndpoint ep=iface.getEndpoint(e);
                    if(ep.getType()!=UsbConstants.USB_ENDPOINT_XFER_BULK) continue;
                    if(ep.getDirection()==UsbConstants.USB_DIR_IN) candidateIn=ep; else candidateOut=ep;
                }
                if(candidateIn!=null && candidateOut!=null) { selected=iface; in=candidateIn; out=candidateOut; break; }
            }
            if(selected==null) throw new IOException("The Stadium USB editing interface is unavailable. Check its firmware version.");
            if(!connection.claimInterface(control,true) || !connection.claimInterface(selected,true)) throw new IOException("The Stadium USB connection is in use. Close other USB apps and reconnect.");
            // Only the NCM interfaces are claimed. Audio, MIDI and updater stay untouched.
            for(int i=0;i<device.getInterfaceCount();i++) {
                UsbInterface idle=device.getInterface(i);
                if(idle.getId()==selected.getId() && idle.getAlternateSetting()==0 && !connection.setInterface(idle))
                    throw new IOException("Could not reset the Stadium USB editing interface.");
            }
            byte[] params=new byte[28];
            if(connection.controlTransfer(0xa1,0x80,0,control.getId(),params,params.length,1000)<28) throw new IOException("The Stadium did not provide USB transfer settings.");
            codec=new NcmCodec(params,out.getMaxPacketSize());
            if((NcmCodec.u16(params,2)&2)!=0) transfer(0x84,0,null); // select NTB16 if formats are selectable
            if((capabilities & 16)!=0) transfer(0x8a,0,null); // CRC disabled
            long maxInput=NcmCodec.u32(params,4);
            if(maxInput<2048) throw new IOException("The Stadium returned an invalid USB receive size.");
            byte[] size=new byte[4]; NcmCodec.put32(size,0,(int)Math.min(maxInput,NcmCodec.RECEIVE_SIZE));
            transfer(0x86,0,size);
            if(!connection.setInterface(selected)) throw new IOException("Could not activate the Stadium USB connection.");
            transfer(0x43,0x0e,null); // directed + broadcast + all multicast
            mac=readMac(macIndex);
        } catch(Exception error) {
            if(selected!=null) connection.releaseInterface(selected);
            connection.releaseInterface(control); connection.close();
            if(error instanceof IOException) throw (IOException)error;
            throw new IOException("Could not initialise the Stadium USB connection.",error);
        }
        data=selected; input=in; output=out;
    }
    private void transfer(int request,int value,byte[] bytes) throws IOException {
        int length=bytes==null?0:bytes.length;
        if(connection.controlTransfer(0x21,request,value,control.getId(),bytes,length,1000)!=length)
            throw new IOException("The Stadium did not accept USB setup. Reconnect it and try again.");
    }
    private byte[] readMac(int index) {
        byte[] bytes=new byte[128];
        int count=index==0?-1:connection.controlTransfer(0x80,6,0x300|index,0x0409,bytes,bytes.length,1000);
        if(count>=26 && (bytes[1]&255)==3) {
            String value=new String(bytes,2,24,StandardCharsets.UTF_16LE);
            if(value.matches("[0-9a-fA-F]{12}")) {
                byte[] result=new byte[6]; for(int i=0;i<6;i++) result[i]=(byte)Integer.parseInt(value.substring(i*2,i*2+2),16);
                if((result[0]&1)==0) return result;
            }
        }
        byte[] result=new byte[6]; new SecureRandom().nextBytes(result); result[0]=(byte)((result[0]&0xfc)|2); return result;
    }
    List<byte[]> receive() throws IOException {
        int length=connection.bulkTransfer(input,receiveBuffer,receiveBuffer.length,40);
        return length<=0 ? java.util.Collections.emptyList() : NcmCodec.decode(receiveBuffer,length);
    }
    void send(byte[] frame) throws IOException {
        byte[] block=codec.encode(frame);
        if(closed || connection.bulkTransfer(output,block,block.length,1000)!=block.length) throw new IOException("USB connection lost. Reconnect the Stadium.");
    }
    @Override public void close() {
        if(closed) return; closed=true;
        connection.releaseInterface(data); connection.releaseInterface(control); connection.close();
    }
}
