#include <dlfcn.h>
#include <pthread.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

typedef struct libusb_context libusb_context;
typedef struct libusb_device libusb_device;
typedef struct libusb_device_handle libusb_device_handle;

struct libusb_device_descriptor {
    uint8_t bLength;
    uint8_t bDescriptorType;
    uint16_t bcdUSB;
    uint8_t bDeviceClass;
    uint8_t bDeviceSubClass;
    uint8_t bDeviceProtocol;
    uint8_t bMaxPacketSize0;
    uint16_t idVendor;
    uint16_t idProduct;
    uint16_t bcdDevice;
    uint8_t iManufacturer;
    uint8_t iProduct;
    uint8_t iSerialNumber;
    uint8_t bNumConfigurations;
};

static pthread_mutex_t g_lock = PTHREAD_MUTEX_INITIALIZER;
static FILE *g_log_file = NULL;

static int (*real_libusb_open)(libusb_device *, libusb_device_handle **);
static int (*real_libusb_claim_interface)(libusb_device_handle *, int);
static int (*real_libusb_release_interface)(libusb_device_handle *, int);
static int (*real_libusb_bulk_transfer)(libusb_device_handle *, unsigned char, unsigned char *, int, int *, unsigned int);
static libusb_device *(*real_libusb_get_device)(libusb_device_handle *);
static int (*real_libusb_get_device_descriptor)(libusb_device *, struct libusb_device_descriptor *);

static void init_real_symbols(void) {
    static int initialized = 0;
    if (initialized) {
        return;
    }
    initialized = 1;
    real_libusb_open = dlsym(RTLD_NEXT, "libusb_open");
    real_libusb_claim_interface = dlsym(RTLD_NEXT, "libusb_claim_interface");
    real_libusb_release_interface = dlsym(RTLD_NEXT, "libusb_release_interface");
    real_libusb_bulk_transfer = dlsym(RTLD_NEXT, "libusb_bulk_transfer");
    real_libusb_get_device = dlsym(RTLD_NEXT, "libusb_get_device");
    real_libusb_get_device_descriptor = dlsym(RTLD_NEXT, "libusb_get_device_descriptor");
}

static FILE *trace_file(void) {
    const char *path;

    if (g_log_file) {
        return g_log_file;
    }
    path = getenv("HELIX_USB_TRACE_LOG");
    if (!path || !*path) {
        path = "/tmp/helix_usb_trace.log";
    }
    g_log_file = fopen(path, "a");
    if (!g_log_file) {
        g_log_file = stderr;
    }
    return g_log_file;
}

static void write_timestamp(FILE *fp) {
    struct timespec ts;
    struct tm tm_value;
    char buf[64];

    clock_gettime(CLOCK_REALTIME, &ts);
    localtime_r(&ts.tv_sec, &tm_value);
    strftime(buf, sizeof(buf), "%Y-%m-%d %H:%M:%S", &tm_value);
    fprintf(fp, "%s.%03ld", buf, ts.tv_nsec / 1000000);
}

static void write_hex(FILE *fp, const unsigned char *data, int len) {
    int index;
    int limit = len < 128 ? len : 128;

    for (index = 0; index < limit; index++) {
        fprintf(fp, "%02x", data[index]);
    }
    if (len > limit) {
        fprintf(fp, "...(+%d bytes)", len - limit);
    }
}

static void log_line(const char *event, libusb_device_handle *handle, unsigned char endpoint, int extra_a, int extra_b, const unsigned char *data) {
    FILE *fp = trace_file();

    pthread_mutex_lock(&g_lock);
    write_timestamp(fp);
    fprintf(fp, " event=%s handle=%p endpoint=0x%02x a=%d b=%d", event, (void *) handle, endpoint, extra_a, extra_b);
    if (data && extra_a > 0) {
        fprintf(fp, " data=");
        write_hex(fp, data, extra_a);
    }
    fprintf(fp, "\n");
    fflush(fp);
    pthread_mutex_unlock(&g_lock);
}

int libusb_open(libusb_device *dev, libusb_device_handle **dev_handle) {
    int rc;
    struct libusb_device_descriptor descriptor;

    init_real_symbols();
    rc = real_libusb_open(dev, dev_handle);
    if (rc == 0 && dev_handle && *dev_handle && real_libusb_get_device_descriptor) {
        memset(&descriptor, 0, sizeof(descriptor));
        real_libusb_get_device_descriptor(dev, &descriptor);
        pthread_mutex_lock(&g_lock);
        write_timestamp(trace_file());
        fprintf(
            trace_file(),
            " event=open handle=%p vid=0x%04x pid=0x%04x class=0x%02x subclass=0x%02x proto=0x%02x rc=%d\n",
            (void *) *dev_handle,
            descriptor.idVendor,
            descriptor.idProduct,
            descriptor.bDeviceClass,
            descriptor.bDeviceSubClass,
            descriptor.bDeviceProtocol,
            rc
        );
        fflush(trace_file());
        pthread_mutex_unlock(&g_lock);
        return rc;
    }
    log_line("open", dev_handle ? *dev_handle : NULL, 0, rc, 0, NULL);
    return rc;
}

int libusb_claim_interface(libusb_device_handle *dev_handle, int interface_number) {
    int rc;

    init_real_symbols();
    rc = real_libusb_claim_interface(dev_handle, interface_number);
    log_line("claim", dev_handle, 0, interface_number, rc, NULL);
    return rc;
}

int libusb_release_interface(libusb_device_handle *dev_handle, int interface_number) {
    int rc;

    init_real_symbols();
    rc = real_libusb_release_interface(dev_handle, interface_number);
    log_line("release", dev_handle, 0, interface_number, rc, NULL);
    return rc;
}

int libusb_bulk_transfer(
    libusb_device_handle *dev_handle,
    unsigned char endpoint,
    unsigned char *data,
    int length,
    int *transferred,
    unsigned int timeout
) {
    int rc;
    int moved = 0;

    init_real_symbols();
    rc = real_libusb_bulk_transfer(dev_handle, endpoint, data, length, transferred, timeout);
    if (transferred) {
        moved = *transferred;
    }

    if ((endpoint == 0x04 || endpoint == 0x85) && data) {
        if (endpoint & 0x80) {
            log_line("bulk", dev_handle, endpoint, moved, rc, moved > 0 ? data : NULL);
        } else {
            log_line("bulk", dev_handle, endpoint, moved > 0 ? moved : length, rc, data);
        }
        return rc;
    }

    log_line("bulk", dev_handle, endpoint, moved > 0 ? moved : length, rc, NULL);
    return rc;
}
