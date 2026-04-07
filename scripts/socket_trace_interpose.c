#include <arpa/inet.h>
#include <dlfcn.h>
#include <errno.h>
#include <netinet/in.h>
#include <pthread.h>
#include <stdbool.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <sys/types.h>
#include <sys/uio.h>
#include <time.h>
#include <unistd.h>

typedef ssize_t (*send_fn_t)(int, const void *, size_t, int);
typedef ssize_t (*write_fn_t)(int, const void *, size_t);
typedef ssize_t (*recv_fn_t)(int, void *, size_t, int);
typedef ssize_t (*read_fn_t)(int, void *, size_t);
typedef ssize_t (*sendmsg_fn_t)(int, const struct msghdr *, int);
typedef ssize_t (*recvmsg_fn_t)(int, struct msghdr *, int);
typedef ssize_t (*writev_fn_t)(int, const struct iovec *, int);
typedef ssize_t (*readv_fn_t)(int, const struct iovec *, int);
typedef int (*connect_fn_t)(int, const struct sockaddr *, socklen_t);
typedef int (*close_fn_t)(int);
#ifdef __APPLE__
typedef int (*connectx_fn_t)(int, const sa_endpoints_t *, sae_associd_t, unsigned int, const struct iovec *, unsigned int, size_t *, sae_connid_t *);
#endif

typedef struct {
    bool active;
    int family;
    uint16_t local_port;
    uint16_t remote_port;
    char local_addr[INET6_ADDRSTRLEN];
    char remote_addr[INET6_ADDRSTRLEN];
} traced_socket_t;

static pthread_mutex_t g_lock = PTHREAD_MUTEX_INITIALIZER;
static FILE *g_log_file = NULL;
static traced_socket_t g_sockets[8192];

static send_fn_t real_send;
static write_fn_t real_write;
static recv_fn_t real_recv;
static read_fn_t real_read;
static sendmsg_fn_t real_sendmsg;
static recvmsg_fn_t real_recvmsg;
static writev_fn_t real_writev;
static readv_fn_t real_readv;
static connect_fn_t real_connect;
static close_fn_t real_close;
#ifdef __APPLE__
static connectx_fn_t real_connectx;
#endif

static bool should_trace_port(uint16_t port) {
    return port == 2001 || port == 2002;
}

static void init_real_symbols(void) {
    static int initialized = 0;
    if (initialized) {
        return;
    }
    initialized = 1;
    real_send = (send_fn_t)dlsym(RTLD_NEXT, "send");
    real_write = (write_fn_t)dlsym(RTLD_NEXT, "write");
    real_recv = (recv_fn_t)dlsym(RTLD_NEXT, "recv");
    real_read = (read_fn_t)dlsym(RTLD_NEXT, "read");
    real_sendmsg = (sendmsg_fn_t)dlsym(RTLD_NEXT, "sendmsg");
    real_recvmsg = (recvmsg_fn_t)dlsym(RTLD_NEXT, "recvmsg");
    real_writev = (writev_fn_t)dlsym(RTLD_NEXT, "writev");
    real_readv = (readv_fn_t)dlsym(RTLD_NEXT, "readv");
    real_connect = (connect_fn_t)dlsym(RTLD_NEXT, "connect");
    real_close = (close_fn_t)dlsym(RTLD_NEXT, "close");
#ifdef __APPLE__
    real_connectx = (connectx_fn_t)dlsym(RTLD_NEXT, "connectx");
#endif
}

static FILE *trace_file(void) {
    const char *path;
    if (g_log_file) {
        return g_log_file;
    }
    path = getenv("HELIX_SOCKET_TRACE_LOG");
    if (!path || !*path) {
        path = "/tmp/helix_socket_trace.log";
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

__attribute__((constructor))
static void socket_trace_loaded(void) {
    init_real_symbols();
    pthread_mutex_lock(&g_lock);
    write_timestamp(trace_file());
    fprintf(trace_file(), " event=loaded pid=%d\n", getpid());
    fflush(trace_file());
    pthread_mutex_unlock(&g_lock);
}

static void write_hex(FILE *fp, const unsigned char *data, size_t len) {
    size_t index;
    size_t limit = len < 256 ? len : 256;

    for (index = 0; index < limit; index++) {
        fprintf(fp, "%02x", data[index]);
    }
    if (len > limit) {
        fprintf(fp, "...(+%zu bytes)", len - limit);
    }
}

static int socket_index(int fd) {
    if (fd < 0 || fd >= (int)(sizeof(g_sockets) / sizeof(g_sockets[0]))) {
        return -1;
    }
    return fd;
}

static void clear_socket_metadata(int fd) {
    int index = socket_index(fd);
    if (index < 0) {
        return;
    }
    memset(&g_sockets[index], 0, sizeof(g_sockets[index]));
}

static void extract_address(const struct sockaddr *addr, char *out, size_t out_len, uint16_t *port) {
    if (!addr) {
        snprintf(out, out_len, "-");
        *port = 0;
        return;
    }
    if (addr->sa_family == AF_INET) {
        const struct sockaddr_in *ipv4 = (const struct sockaddr_in *)addr;
        inet_ntop(AF_INET, &ipv4->sin_addr, out, (socklen_t)out_len);
        *port = ntohs(ipv4->sin_port);
        return;
    }
    if (addr->sa_family == AF_INET6) {
        const struct sockaddr_in6 *ipv6 = (const struct sockaddr_in6 *)addr;
        inet_ntop(AF_INET6, &ipv6->sin6_addr, out, (socklen_t)out_len);
        *port = ntohs(ipv6->sin6_port);
        return;
    }
    snprintf(out, out_len, "family-%d", addr->sa_family);
    *port = 0;
}

static void refresh_socket_metadata(int fd) {
    int index = socket_index(fd);
    struct sockaddr_storage local_addr;
    struct sockaddr_storage peer_addr;
    socklen_t local_len = sizeof(local_addr);
    socklen_t peer_len = sizeof(peer_addr);
    traced_socket_t meta;

    if (index < 0) {
        return;
    }
    memset(&meta, 0, sizeof(meta));

    if (getsockname(fd, (struct sockaddr *)&local_addr, &local_len) == 0) {
        meta.family = local_addr.ss_family;
        extract_address((const struct sockaddr *)&local_addr, meta.local_addr, sizeof(meta.local_addr), &meta.local_port);
    }
    if (getpeername(fd, (struct sockaddr *)&peer_addr, &peer_len) == 0) {
        meta.family = peer_addr.ss_family;
        extract_address((const struct sockaddr *)&peer_addr, meta.remote_addr, sizeof(meta.remote_addr), &meta.remote_port);
    }
    meta.active = should_trace_port(meta.local_port) || should_trace_port(meta.remote_port);
    g_sockets[index] = meta;
}

static traced_socket_t get_socket_metadata(int fd) {
    traced_socket_t meta;
    int index = socket_index(fd);

    memset(&meta, 0, sizeof(meta));
    if (index < 0) {
        return meta;
    }

    pthread_mutex_lock(&g_lock);
    meta = g_sockets[index];
    pthread_mutex_unlock(&g_lock);

    if (!meta.active) {
        pthread_mutex_lock(&g_lock);
        refresh_socket_metadata(fd);
        meta = g_sockets[index];
        pthread_mutex_unlock(&g_lock);
    }
    return meta;
}

static void log_socket_line(
    const char *event,
    int fd,
    traced_socket_t meta,
    ssize_t moved,
    int aux_value,
    const void *data,
    size_t len
) {
    FILE *fp = trace_file();
    pthread_mutex_lock(&g_lock);
    write_timestamp(fp);
    fprintf(
        fp,
        " event=%s fd=%d local=%s:%u remote=%s:%u moved=%zd aux=%d",
        event,
        fd,
        meta.local_addr[0] ? meta.local_addr : "-",
        meta.local_port,
        meta.remote_addr[0] ? meta.remote_addr : "-",
        meta.remote_port,
        moved,
        aux_value
    );
    if (data && len > 0) {
        fprintf(fp, " data=");
        write_hex(fp, (const unsigned char *)data, len);
    }
    fprintf(fp, "\n");
    fflush(fp);
    pthread_mutex_unlock(&g_lock);
}

int connect(int sockfd, const struct sockaddr *addr, socklen_t addrlen) {
    int rc;
    traced_socket_t meta;

    init_real_symbols();
    rc = real_connect(sockfd, addr, addrlen);

    pthread_mutex_lock(&g_lock);
    if (rc == 0) {
        refresh_socket_metadata(sockfd);
        meta = g_sockets[socket_index(sockfd)];
    } else {
        memset(&meta, 0, sizeof(meta));
        extract_address(addr, meta.remote_addr, sizeof(meta.remote_addr), &meta.remote_port);
        meta.active = should_trace_port(meta.remote_port);
    }
    pthread_mutex_unlock(&g_lock);

    if (meta.active) {
        log_socket_line("connect", sockfd, meta, rc, errno, NULL, 0);
    }
    return rc;
}

#ifdef __APPLE__
int connectx(
    int sockfd,
    const sa_endpoints_t *endpoints,
    sae_associd_t associd,
    unsigned int flags,
    const struct iovec *iov,
    unsigned int iovcnt,
    size_t *len,
    sae_connid_t *connid
) {
    int rc;
    traced_socket_t meta;

    init_real_symbols();
    if (!real_connectx) {
        errno = ENOSYS;
        return -1;
    }
    rc = real_connectx(sockfd, endpoints, associd, flags, iov, iovcnt, len, connid);

    pthread_mutex_lock(&g_lock);
    if (rc == 0) {
        refresh_socket_metadata(sockfd);
        meta = g_sockets[socket_index(sockfd)];
    } else {
        memset(&meta, 0, sizeof(meta));
        if (endpoints && endpoints->sae_dstaddr) {
            extract_address(endpoints->sae_dstaddr, meta.remote_addr, sizeof(meta.remote_addr), &meta.remote_port);
        }
        meta.active = should_trace_port(meta.remote_port);
    }
    pthread_mutex_unlock(&g_lock);

    if (meta.active) {
        log_socket_line("connectx", sockfd, meta, rc, errno, NULL, 0);
    }
    return rc;
}
#endif

ssize_t send(int sockfd, const void *buf, size_t len, int flags) {
    ssize_t rc;
    traced_socket_t meta;

    init_real_symbols();
    rc = real_send(sockfd, buf, len, flags);
    meta = get_socket_metadata(sockfd);
    if (meta.active) {
        size_t logged = rc > 0 ? (size_t)rc : len;
        log_socket_line("send", sockfd, meta, rc, flags, buf, logged);
    }
    return rc;
}

ssize_t write(int fd, const void *buf, size_t count) {
    ssize_t rc;
    traced_socket_t meta;

    init_real_symbols();
    rc = real_write(fd, buf, count);
    meta = get_socket_metadata(fd);
    if (meta.active) {
        size_t logged = rc > 0 ? (size_t)rc : count;
        log_socket_line("write", fd, meta, rc, 0, buf, logged);
    }
    return rc;
}

ssize_t sendmsg(int sockfd, const struct msghdr *msg, int flags) {
    ssize_t rc;
    traced_socket_t meta;
    const void *first_data = NULL;
    size_t first_len = 0;

    init_real_symbols();
    rc = real_sendmsg(sockfd, msg, flags);
    if (msg && msg->msg_iovlen > 0) {
        first_data = msg->msg_iov[0].iov_base;
        first_len = msg->msg_iov[0].iov_len;
    }
    meta = get_socket_metadata(sockfd);
    if (meta.active) {
        log_socket_line("sendmsg", sockfd, meta, rc, flags, first_data, rc > 0 ? (size_t)rc : first_len);
    }
    return rc;
}

ssize_t writev(int fd, const struct iovec *iov, int iovcnt) {
    ssize_t rc;
    traced_socket_t meta;
    const void *first_data = NULL;
    size_t first_len = 0;

    init_real_symbols();
    rc = real_writev(fd, iov, iovcnt);
    if (iov && iovcnt > 0) {
        first_data = iov[0].iov_base;
        first_len = iov[0].iov_len;
    }
    meta = get_socket_metadata(fd);
    if (meta.active) {
        log_socket_line("writev", fd, meta, rc, iovcnt, first_data, rc > 0 ? (size_t)rc : first_len);
    }
    return rc;
}

ssize_t recv(int sockfd, void *buf, size_t len, int flags) {
    ssize_t rc;
    traced_socket_t meta;

    init_real_symbols();
    rc = real_recv(sockfd, buf, len, flags);
    meta = get_socket_metadata(sockfd);
    if (meta.active) {
        log_socket_line("recv", sockfd, meta, rc, flags, rc > 0 ? buf : NULL, rc > 0 ? (size_t)rc : 0);
    }
    return rc;
}

ssize_t read(int fd, void *buf, size_t count) {
    ssize_t rc;
    traced_socket_t meta;

    init_real_symbols();
    rc = real_read(fd, buf, count);
    meta = get_socket_metadata(fd);
    if (meta.active) {
        log_socket_line("read", fd, meta, rc, 0, rc > 0 ? buf : NULL, rc > 0 ? (size_t)rc : 0);
    }
    return rc;
}

ssize_t recvmsg(int sockfd, struct msghdr *msg, int flags) {
    ssize_t rc;
    traced_socket_t meta;
    const void *first_data = NULL;
    size_t first_len = 0;

    init_real_symbols();
    rc = real_recvmsg(sockfd, msg, flags);
    if (msg && msg->msg_iovlen > 0) {
        first_data = msg->msg_iov[0].iov_base;
        first_len = msg->msg_iov[0].iov_len;
    }
    meta = get_socket_metadata(sockfd);
    if (meta.active) {
        log_socket_line("recvmsg", sockfd, meta, rc, flags, rc > 0 ? first_data : NULL, rc > 0 ? (size_t)rc : first_len);
    }
    return rc;
}

ssize_t readv(int fd, const struct iovec *iov, int iovcnt) {
    ssize_t rc;
    traced_socket_t meta;
    const void *first_data = NULL;
    size_t first_len = 0;

    init_real_symbols();
    rc = real_readv(fd, iov, iovcnt);
    if (iov && iovcnt > 0) {
        first_data = iov[0].iov_base;
        first_len = iov[0].iov_len;
    }
    meta = get_socket_metadata(fd);
    if (meta.active) {
        log_socket_line("readv", fd, meta, rc, iovcnt, rc > 0 ? first_data : NULL, rc > 0 ? (size_t)rc : first_len);
    }
    return rc;
}

int close(int fd) {
    int rc;
    traced_socket_t meta;

    init_real_symbols();
    meta = get_socket_metadata(fd);
    if (meta.active) {
        log_socket_line("close", fd, meta, 0, 0, NULL, 0);
    }
    rc = real_close(fd);
    pthread_mutex_lock(&g_lock);
    clear_socket_metadata(fd);
    pthread_mutex_unlock(&g_lock);
    return rc;
}
