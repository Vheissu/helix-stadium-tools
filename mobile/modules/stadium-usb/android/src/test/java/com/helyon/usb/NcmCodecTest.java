package com.helyon.usb;
import org.junit.Test;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Random;
import static org.junit.Assert.*;
public class NcmCodecTest {
    private byte[] params() { byte[] p=new byte[28];NcmCodec.put16(p,0,28);NcmCodec.put16(p,2,1);NcmCodec.put32(p,4,16384);NcmCodec.put32(p,16,16384);NcmCodec.put16(p,20,4);NcmCodec.put16(p,24,4);return p; }
    private byte[] frame(int size) { byte[] p=new byte[size];new Random(123).nextBytes(p);return p; }
    @Test public void roundTripsAllSupportedFrameSizes() throws Exception {
        NcmCodec c=new NcmCodec(params(),512);
        for(int size=14;size<=1518;size++){byte[] f=frame(size),b=c.encode(f);assertArrayEquals(f,NcmCodec.decode(b,b.length).get(0));assertNotEquals(0,b.length%512);}
    }
    @Test public void honoursDeviceAlignmentAfterEthernetHeader() throws Exception {
        byte[] p=params();NcmCodec.put16(p,20,16);NcmCodec.put16(p,22,6);NcmCodec.put16(p,24,32);
        byte[] b=new NcmCodec(p,512).encode(frame(100));int table=NcmCodec.u16(b,10),offset=NcmCodec.u16(b,table+8);
        assertEquals(0,table%32);assertEquals(6,(offset+14)%16);
    }
    @Test public void sequenceWrapsWithoutChangingPayload() throws Exception {
        NcmCodec c=new NcmCodec(params(),512);byte[] b=null;for(int i=0;i<=65536;i++)b=c.encode(frame(14));assertEquals(0,NcmCodec.u16(b,6));
    }
    @Test public void rejectsTruncatedTransfers() throws Exception {
        byte[] b=new NcmCodec(params(),512).encode(frame(64));
        for(int size=0;size<b.length;size++){try{NcmCodec.decode(b,size);fail("accepted truncated transfer");}catch(IOException expected){}}
    }
    @Test public void rejectsCyclicTables() throws Exception {
        byte[] b=new NcmCodec(params(),512).encode(frame(64));int table=NcmCodec.u16(b,10);NcmCodec.put16(b,table+6,table);
        try{NcmCodec.decode(b,b.length);fail("accepted cycle");}catch(IOException expected){}
    }
    @Test public void rejectsPayloadOverlappingMetadata() throws Exception {
        byte[] b=new NcmCodec(params(),512).encode(frame(64));int table=NcmCodec.u16(b,10);NcmCodec.put16(b,table+8,table);
        try{NcmCodec.decode(b,b.length);fail("accepted overlap");}catch(IOException expected){}
    }
    @Test public void decodesMultipleDatagrams() throws Exception {
        byte[] b=new byte[180];NcmCodec.put32(b,0,0x484d434e);NcmCodec.put16(b,4,12);NcmCodec.put16(b,8,b.length);NcmCodec.put16(b,10,12);
        NcmCodec.put32(b,12,0x304d434e);NcmCodec.put16(b,16,20);NcmCodec.put16(b,20,32);NcmCodec.put16(b,22,64);NcmCodec.put16(b,24,96);NcmCodec.put16(b,26,84);
        byte[] a=frame(64),c=frame(84);System.arraycopy(a,0,b,32,64);System.arraycopy(c,0,b,96,84);
        List<byte[]> result=NcmCodec.decode(b,b.length);assertEquals(2,result.size());assertArrayEquals(a,result.get(0));assertArrayEquals(c,result.get(1));
    }
    @Test public void rejectsInvalidNegotiationAndOversizeFrames() throws Exception {
        byte[] p=params();NcmCodec.put16(p,20,0);try{new NcmCodec(p,512);fail("accepted zero divisor");}catch(IOException expected){}
        NcmCodec c=new NcmCodec(params(),512);try{c.encode(frame(1519));fail("accepted oversize");}catch(IOException expected){}
    }
    @Test public void malformedInputNeverEscapesBoundsOrLoops() throws Exception {
        Random r=new Random(12);byte[] valid=new NcmCodec(params(),512).encode(frame(1518));
        for(int i=0;i<10000;i++){byte[] b=Arrays.copyOf(valid,valid.length);for(int k=0;k<8;k++)b[r.nextInt(b.length)]=(byte)r.nextInt();try{NcmCodec.decode(b,b.length);}catch(IOException expected){}}
    }
}
