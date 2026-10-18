#include "usb_stack.h"
#include "lwip/init.h"
#include "lwip/netif.h"
#include "lwip/tcp.h"
#include "lwip/timeouts.h"
#include "lwip/ethip6.h"
#include "netif/ethernet.h"
#include <string.h>
#include <stdlib.h>
#include <time.h>

#define CONNECTIONS 4
#define MAX_PENDING (1024 * 1024)
struct channel { int id, port, connected, started; uint32_t since; struct tcp_pcb *pcb; uint8_t *pending; size_t length; };
static struct channel channels[CONNECTIONS];
static struct netif wired;
static int initialized, running;
static usb_event_fn emit_event;
static usb_frame_fn emit_frame;
static void *callback_context;
u32_t sys_now(void) { struct timespec t; clock_gettime(CLOCK_MONOTONIC, &t); return (u32_t)((uint64_t)t.tv_sec * 1000 + t.tv_nsec / 1000000); }
static void event(struct channel *c, int kind, const void *data, size_t length) { if (emit_event) emit_event(callback_context,c->id,kind,data,length); }
static void detach(struct channel *c) {
    if(c->pcb) { tcp_arg(c->pcb,NULL); tcp_err(c->pcb,NULL); tcp_recv(c->pcb,NULL); tcp_sent(c->pcb,NULL); tcp_abort(c->pcb); c->pcb=NULL; }
    free(c->pending); memset(c,0,sizeof(*c));
}
static void fail(struct channel *c, const char *message) { event(c,4,message,strlen(message)); detach(c); }
static err_t output(struct netif *n, struct pbuf *p) {
    (void)n; if(p->tot_len>1518 || !emit_frame) return ERR_IF;
    uint8_t bytes[1518]; pbuf_copy_partial(p,bytes,p->tot_len,0);
    return emit_frame(callback_context,bytes,p->tot_len) ? ERR_OK : ERR_MEM;
}
static err_t setup(struct netif *n) {
    n->name[0]='u'; n->name[1]='s'; n->mtu=1500; n->hwaddr_len=6;
    n->output_ip6=ethip6_output; n->linkoutput=output;
    n->flags=NETIF_FLAG_BROADCAST|NETIF_FLAG_ETHERNET|NETIF_FLAG_MLD6;
    return ERR_OK;
}
static void flush(struct channel *c) {
    while(c->pcb && c->connected && c->length) {
        size_t amount=c->length; u16_t available=tcp_sndbuf(c->pcb);
        if(!available) break; if(amount>available) amount=available;
        err_t status=tcp_write(c->pcb,c->pending,(u16_t)amount,TCP_WRITE_FLAG_COPY);
        if(status==ERR_MEM) break;
        if(status!=ERR_OK) { fail(c,"USB send failed. Reconnect the cable and try again."); return; }
        c->length-=amount; memmove(c->pending,c->pending+amount,c->length);
    }
    if(c->pcb && c->connected) tcp_output(c->pcb);
    if(!c->length) { free(c->pending); c->pending=NULL; }
}
static err_t sent(void *arg, struct tcp_pcb *pcb, u16_t length) { (void)pcb; (void)length; struct channel *c=arg; if(c) flush(c); return c && c->pcb ? ERR_OK : ERR_ABRT; }
static void error(void *arg, err_t status) { (void)status; struct channel *c=arg; if(c) { c->pcb=NULL; fail(c,"USB connection closed. Reconnect the Stadium and try again."); } }
static err_t receive(void *arg, struct tcp_pcb *pcb, struct pbuf *p, err_t status) {
    struct channel *c=arg; if(!c) { if(p) pbuf_free(p); return ERR_OK; }
    if(!p) { event(c,3,NULL,0); detach(c); return ERR_ABRT; }
    if(status!=ERR_OK) { pbuf_free(p); return status; }
    for(struct pbuf *part=p;part;part=part->next) event(c,2,part->payload,part->len);
    tcp_recved(pcb,p->tot_len); pbuf_free(p); return ERR_OK;
}
static err_t connected(void *arg, struct tcp_pcb *pcb, err_t status) {
    (void)pcb; struct channel *c=arg;
    if(status!=ERR_OK) { fail(c,"Could not open the Stadium USB connection."); return ERR_ABRT; }
    c->connected=1; event(c,1,NULL,0); flush(c); return c->pcb ? ERR_OK : ERR_ABRT;
}
void usb_stack_start(const uint8_t mac[6], usb_event_fn event_cb, usb_frame_fn frame_cb, void *context) {
    if(running) usb_stack_stop(); if(!initialized) { lwip_init(); initialized=1; }
    memset(&wired,0,sizeof(wired)); memset(channels,0,sizeof(channels));
    emit_event=event_cb; emit_frame=frame_cb; callback_context=context;
    netif_add_noaddr(&wired,NULL,setup,ethernet_input);
    memcpy(wired.hwaddr,mac,6); netif_create_ip6_linklocal_address(&wired,1);
    netif_set_ip6_autoconfig_enabled(&wired,1); netif_set_default(&wired);
    running=1; netif_set_up(&wired); netif_set_link_up(&wired);
}
void usb_stack_stop(void) {
    if(!running) return;
    for(int i=0;i<CONNECTIONS;i++) if(channels[i].id) detach(&channels[i]);
    netif_set_link_down(&wired); netif_set_down(&wired); netif_remove(&wired);
    emit_event=NULL; emit_frame=NULL; callback_context=NULL; running=0;
}
void usb_stack_input(const uint8_t *data, size_t length) {
    if(!running || length<14 || length>1518) return;
    struct pbuf *p=pbuf_alloc(PBUF_RAW,(u16_t)length,PBUF_POOL); if(!p) return;
    if(pbuf_take(p,data,(u16_t)length)!=ERR_OK || wired.input(p,&wired)!=ERR_OK) pbuf_free(p);
}
void usb_stack_tick(void) {
    if(!running) return; sys_check_timeouts();
    for(int i=0;i<CONNECTIONS;i++) {
        struct channel *c=&channels[i]; if(!c->id) continue;
        if(!c->connected && (uint32_t)(sys_now()-c->since)>20000) { fail(c,"The Stadium did not answer over USB. Keep Remote Access on and reconnect the cable."); continue; }
        if(!c->started) {
            // The Stadium advertises a unique /64 and is always ::1 on that link.
            // Learn the prefix from its RA, rather than using the Wi-Fi address.
            for(int a=1;a<LWIP_IPV6_NUM_ADDRESSES;a++) {
                const ip6_addr_t *local=netif_ip6_addr(&wired,a);
                if(!ip6_addr_ispreferred(netif_ip6_addr_state(&wired,a)) || !ip6_addr_isuniquelocal(local)) continue;
                ip_addr_t peer; ip_addr_copy_from_ip6(peer,*local);
                ip_2_ip6(&peer)->addr[2]=0; ip_2_ip6(&peer)->addr[3]=PP_HTONL(1);
                c->pcb=tcp_new_ip_type(IPADDR_TYPE_V6); if(!c->pcb) { fail(c,"USB connection capacity reached."); break; }
                tcp_bind_netif(c->pcb,&wired); tcp_arg(c->pcb,c); tcp_err(c->pcb,error); tcp_recv(c->pcb,receive); tcp_sent(c->pcb,sent);
                c->started=1;
                if(tcp_connect(c->pcb,&peer,(u16_t)c->port,connected)!=ERR_OK) fail(c,"Could not start the Stadium USB connection.");
                break;
            }
        } else flush(c);
    }
}
int usb_stack_connect(int id, int port) {
    if(!running || id<=0 || (port!=2001 && port!=2002)) return 0;
    for(int i=0;i<CONNECTIONS;i++) if(channels[i].id==id) return 0;
    for(int i=0;i<CONNECTIONS;i++) if(!channels[i].id) { channels[i].id=id; channels[i].port=port; channels[i].since=sys_now(); return 1; }
    return 0;
}
int usb_stack_write(int id,const uint8_t *data,size_t length) {
    for(int i=0;i<CONNECTIONS;i++) { struct channel *c=&channels[i]; if(c->id!=id) continue;
        if(length>MAX_PENDING-c->length) return 0;
        uint8_t *next=realloc(c->pending,c->length+length); if(!next && length) return 0;
        c->pending=next; memcpy(c->pending+c->length,data,length); c->length+=length; flush(c); return 1;
    } return 0;
}
void usb_stack_close(int id) { for(int i=0;i<CONNECTIONS;i++) if(channels[i].id==id) detach(&channels[i]); }
