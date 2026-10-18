#include "usb_stack.h"
#include "lwip/init.h"
#include "lwip/sys.h"
#include "lwip/netif.h"
#include "lwip/ethip6.h"
#include "lwip/tcp.h"
#include "lwip/timeouts.h"
#include "netif/ethernet.h"
#include <sys/socket.h>
#include <sys/wait.h>
#include <unistd.h>
#include <fcntl.h>
#include <signal.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
static int wire;
static unsigned received[2],connected_count;
static int failed;
static int dropped;
static unsigned char payload[10000];
static int frame(void *ctx,const uint8_t *b,size_t n) { (void)ctx;
    if(getenv("DROP_SYN") && !dropped && n>68 && b[20]==6 && (b[67]&2)) { dropped=1; return 1; }
    return send(wire,b,n,0)==(ssize_t)n; }
static void event(void *ctx,int id,int kind,const uint8_t *b,size_t n) {
    (void)ctx;
    if(kind==1) { connected_count++; if(!usb_stack_write(id,payload,sizeof(payload))) failed=1; }
    if(kind==2) { if(id<1||id>2||received[id-1]+n>sizeof(payload)||memcmp(b,payload+received[id-1],n)) failed=1; else received[id-1]+=n; }
    if(kind==4) { fprintf(stderr,"client error: %.*s\n",(int)n,b);failed=1; }
}
static err_t out(struct netif *n,struct pbuf *p) { (void)n;unsigned char b[1600];pbuf_copy_partial(p,b,p->tot_len,0);return frame(NULL,b,p->tot_len)?ERR_OK:ERR_IF; }
static err_t initif(struct netif *n) { n->name[0]='p';n->name[1]='r';n->mtu=1500;n->hwaddr_len=6;n->output_ip6=ethip6_output;n->linkoutput=out;n->flags=NETIF_FLAG_ETHERNET|NETIF_FLAG_BROADCAST|NETIF_FLAG_MLD6;return ERR_OK; }
static err_t recv_echo(void *arg,struct tcp_pcb *pcb,struct pbuf *p,err_t err) {
    (void)arg;(void)err;if(!p){tcp_close(pcb);return ERR_OK;}
    if(p->tot_len>tcp_sndbuf(pcb)) return ERR_MEM;
    unsigned char b[32768];pbuf_copy_partial(p,b,p->tot_len,0);
    if(tcp_write(pcb,b,p->tot_len,TCP_WRITE_FLAG_COPY)!=ERR_OK) return ERR_MEM;
    tcp_recved(pcb,p->tot_len);pbuf_free(p);tcp_output(pcb);return ERR_OK;
}
static err_t accept_echo(void *arg,struct tcp_pcb *pcb,err_t err) { (void)arg;(void)err;tcp_recv(pcb,recv_echo);return ERR_OK; }
static void announce(void) {
    // RA matches Stadium: ULA /64 with A+L flags, router lifetime zero, no DNS.
    unsigned char b[14+40+48]={0};
    unsigned char mac[6]={2,0,0,0,0,1}; unsigned char dst[6]={0x33,0x33,0,0,0,1};
    memcpy(b,dst,6);memcpy(b+6,mac,6);b[12]=0x86;b[13]=0xdd;
    unsigned char *ip=b+14;ip[0]=0x60;ip[5]=48;ip[6]=58;ip[7]=255;
    ip[8]=0xfe;ip[9]=0x80;ip[23]=1;ip[24]=0xff;ip[25]=2;ip[39]=1;
    unsigned char *ra=ip+40;ra[0]=134;ra[4]=64;ra[16]=3;ra[17]=4;ra[18]=64;ra[19]=0xc0;
    ra[22]=0x1c;ra[23]=0x20;ra[26]=0x0e;ra[27]=0x10;
    ra[32]=0xfd;ra[33]=0x12;ra[34]=0x34;ra[35]=0x56;ra[36]=0x78;ra[37]=0x9a;
    unsigned sum=48+58;for(int i=8;i<40;i+=2)sum+=(ip[i]<<8)|ip[i+1];for(int i=0;i<48;i+=2)sum+=(ra[i]<<8)|ra[i+1];
    while(sum>>16)sum=(sum&65535)+(sum>>16);sum=~sum;ra[2]=sum>>8;ra[3]=sum;
    frame(NULL,b,sizeof(b));
}
static void server(void) {
    lwip_init();struct netif n={0};netif_add_noaddr(&n,NULL,initif,ethernet_input);
    unsigned char mac[6]={2,0,0,0,0,1};memcpy(n.hwaddr,mac,6);
    ip6_addr_t addr;ip6addr_aton("fe80::1",&addr);netif_ip6_addr_set(&n,0,&addr);netif_ip6_addr_set_state(&n,0,IP6_ADDR_PREFERRED);
    ip6addr_aton("fd12:3456:789a::1",&addr);netif_ip6_addr_set(&n,1,&addr);netif_ip6_addr_set_state(&n,1,IP6_ADDR_PREFERRED);
    netif_set_default(&n);netif_set_up(&n);netif_set_link_up(&n);
    for(int port=2001;port<=2002;port++){struct tcp_pcb *p=tcp_new_ip_type(IPADDR_TYPE_V6);tcp_bind(p,IP_ANY_TYPE,port);p=tcp_listen(p);tcp_accept(p,accept_echo);}
    unsigned last=0;for(;;){unsigned now=sys_now();if(now-last>500){announce();last=now;}
        unsigned char b[1600];int size=recv(wire,b,sizeof(b),0);if(size>0){struct pbuf *p=pbuf_alloc(PBUF_RAW,size,PBUF_POOL);pbuf_take(p,b,size);if(n.input(p,&n)!=ERR_OK)pbuf_free(p);}
        sys_check_timeouts();usleep(1000);
    }
}
int main(void) {
    int sockets[2];if(socketpair(AF_UNIX,SOCK_DGRAM,0,sockets))return 2;
    pid_t child=fork();if(child==0){close(sockets[0]);wire=sockets[1];fcntl(wire,F_SETFL,O_NONBLOCK);server();return 0;}
    close(sockets[1]);wire=sockets[0];fcntl(wire,F_SETFL,O_NONBLOCK);
    for(int i=0;i<(int)sizeof(payload);i++)payload[i]=(unsigned char)(i*17+3);
    int ok=1;
    for(int cycle=0;cycle<2;cycle++) {
    memset(received,0,sizeof(received));connected_count=0;dropped=0;
    unsigned char mac[6]={6,0,0,0,0,2};usb_stack_start(mac,event,frame,NULL);usb_stack_connect(1,2001);usb_stack_connect(2,2002);
    unsigned start=sys_now();while(!failed && sys_now()-start<15000 && (received[0]!=sizeof(payload)||received[1]!=sizeof(payload))) {
        unsigned char b[1600];int size=recv(wire,b,sizeof(b),0);if(size>0)usb_stack_input(b,size);usb_stack_tick();usleep(1000);
    }
    ok=ok && !failed && connected_count==2 && received[0]==sizeof(payload) && received[1]==sizeof(payload);
    usb_stack_close(1);usb_stack_close(2);usb_stack_stop();
    printf("cycle=%d connected=%u echoed=%u/%u\n",cycle,connected_count,received[0],received[1]);
    if(!ok) break;
    }
    kill(child,SIGTERM);waitpid(child,NULL,0);
    printf("SLAAC + neighbor discovery + two TCP streams: connected=%u echoed=%u/%u result=%s\n",connected_count,received[0],received[1],ok?"PASS":"FAIL");return ok?0:1;
}
