package com.helyon.usb;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/** Bounded CDC-NCM NTB16 framing; no Android dependencies. */
public final class NcmCodec {
    public static final int RECEIVE_SIZE = 16384;
    private final int maxOut, divisor, remainder, alignment, packetSize;
    private int sequence;
    public NcmCodec(byte[] parameters, int packetSize) throws IOException {
        if (parameters.length < 28 || u16(parameters, 0) < 28 || (u16(parameters, 2) & 1) == 0)
            throw new IOException("The Stadium does not support the required USB transfer format.");
        long limit = u32(parameters, 16);
        maxOut = (int)Math.min(limit, 65535);
        divisor = u16(parameters, 20); remainder = u16(parameters, 22); alignment = u16(parameters, 24);
        if (maxOut < 1600 || divisor < 1 || divisor > 4096 || remainder >= divisor || alignment < 4 || alignment > 4096 || (alignment & (alignment - 1)) != 0)
            throw new IOException("The Stadium returned invalid USB transfer settings.");
        this.packetSize = packetSize;
    }
    static int u16(byte[] b, int i) { return (b[i] & 255) | ((b[i + 1] & 255) << 8); }
    static long u32(byte[] b, int i) { return (long)u16(b, i) | ((long)u16(b, i + 2) << 16); }
    static void put16(byte[] b, int i, int v) { b[i]=(byte)v; b[i+1]=(byte)(v>>>8); }
    static void put32(byte[] b, int i, int v) { put16(b,i,v); put16(b,i+2,v>>>16); }
    public byte[] encode(byte[] frame) throws IOException {
        if(frame.length < 14 || frame.length > 1518) throw new IOException("Invalid USB network frame length.");
        int ndp = (12 + alignment - 1) & -alignment;
        int payload = ndp + 16;
        payload += Math.floorMod(remainder - 14 - payload, divisor);
        int size = payload + frame.length;
        if(packetSize > 0 && size % packetSize == 0) size++; // terminate with a short packet
        if(size > maxOut) throw new IOException("USB network frame exceeds the negotiated transfer size.");
        byte[] b = new byte[size];
        put32(b,0,0x484d434e); put16(b,4,12); put16(b,6,sequence++); put16(b,8,size); put16(b,10,ndp);
        put32(b,ndp,0x304d434e); put16(b,ndp+4,16);
        put16(b,ndp+8,payload); put16(b,ndp+10,frame.length);
        System.arraycopy(frame,0,b,payload,frame.length); return b;
    }
    public static List<byte[]> decode(byte[] b, int length) throws IOException {
        if(length < 12 || length > b.length || length > RECEIVE_SIZE) throw new IOException("Incomplete USB network transfer.");
        List<byte[]> frames = new ArrayList<>();
        int base=0;
        while(base < length) {
            if(length-base<12 || u32(b,base)!=0x484d434e || u16(b,base+4)!=12) throw new IOException("Invalid USB network header.");
            int size=u16(b,base+8), ndp=u16(b,base+10);
            if(size<12 || size>length-base) throw new IOException("Truncated USB network transfer.");
            Set<Integer> visited = new HashSet<>();
            List<int[]> tables = new ArrayList<>(), packets = new ArrayList<>();
            while(ndp!=0) {
                if(ndp<12 || ndp>size-8 || (ndp & 3)!=0 || !visited.add(ndp) || visited.size()>16)
                    throw new IOException("Invalid USB network packet table.");
                int at=base+ndp, tableSize=u16(b,at+4);
                if(u32(b,at)!=0x304d434e || tableSize<12 || (tableSize & 3)!=0 || tableSize>size-ndp)
                    throw new IOException("Invalid USB network packet table length.");
                tables.add(new int[]{ndp,ndp+tableSize});
                boolean end=false;
                for(int p=at+8;p<at+tableSize;p+=4) {
                    int offset=u16(b,p), count=u16(b,p+2);
                    if(offset==0 && count==0) { end=true; break; }
                    if(offset<12 || count<14 || count>1518 || offset>size-count || packets.size()>=128)
                        throw new IOException("Invalid USB network packet bounds.");
                    packets.add(new int[]{offset,offset+count});
                }
                if(!end) throw new IOException("Unterminated USB network packet table.");
                ndp=u16(b,at+6);
            }
            for(int i=0;i<packets.size();i++) {
                int[] p=packets.get(i);
                for(int[] t:tables) if(p[0]<t[1] && t[0]<p[1]) throw new IOException("USB packet overlaps its table.");
                for(int j=0;j<i;j++) { int[] q=packets.get(j); if(p[0]<q[1] && q[0]<p[1]) throw new IOException("Overlapping USB packets."); }
                frames.add(Arrays.copyOfRange(b,base+p[0],base+p[1]));
            }
            base+=size;
        }
        return frames;
    }
}
