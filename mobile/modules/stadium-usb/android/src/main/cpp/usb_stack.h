#ifndef HELYON_USB_STACK_H
#define HELYON_USB_STACK_H
#include <stddef.h>
#include <stdint.h>
typedef void (*usb_event_fn)(void *, int, int, const uint8_t *, size_t);
typedef int (*usb_frame_fn)(void *, const uint8_t *, size_t);
void usb_stack_start(const uint8_t mac[6], usb_event_fn event, usb_frame_fn frame, void *context);
void usb_stack_stop(void);
void usb_stack_input(const uint8_t *data, size_t length);
void usb_stack_tick(void);
int usb_stack_connect(int id, int port);
int usb_stack_write(int id, const uint8_t *data, size_t length);
void usb_stack_close(int id);
#endif
