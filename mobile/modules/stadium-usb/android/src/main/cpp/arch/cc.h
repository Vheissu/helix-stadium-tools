#ifndef HELYON_LWIP_CC_H
#define HELYON_LWIP_CC_H
#include <stdint.h>
#include <stdlib.h>
#include <stdio.h>
#include <sys/time.h>
#include <arpa/inet.h>
#define LWIP_DONT_PROVIDE_BYTEORDER_FUNCTIONS 1
#define LWIP_TIMEVAL_PRIVATE 0
#define LWIP_RAND() ((uint32_t)arc4random())
#endif
