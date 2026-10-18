#include <jni.h>
#include "usb_stack.h"
static JNIEnv *env;
static jobject module;
static jmethodID event_method,frame_method;
static jbyteArray bytes(const uint8_t *data,size_t length) {
    jbyteArray out=(*env)->NewByteArray(env,(jsize)length);
    if(out && length) (*env)->SetByteArrayRegion(env,out,0,(jsize)length,(const jbyte *)data);
    return out;
}
static void event(void *ignored,int id,int kind,const uint8_t *data,size_t length) {
    (void)ignored; jbyteArray out=bytes(data,length); if(!out) return;
    (*env)->CallVoidMethod(env,module,event_method,id,kind,out); (*env)->DeleteLocalRef(env,out);
}
static int frame(void *ignored,const uint8_t *data,size_t length) {
    (void)ignored; jbyteArray out=bytes(data,length); if(!out) return 0;
    jboolean ok=(*env)->CallBooleanMethod(env,module,frame_method,out); (*env)->DeleteLocalRef(env,out); return ok;
}
JNIEXPORT void JNICALL Java_com_helyon_usb_StadiumUsbModule_nativeStart(JNIEnv *e,jobject self,jbyteArray mac) {
    env=e; if(module) { usb_stack_stop(); (*env)->DeleteGlobalRef(env,module); }
    module=(*env)->NewGlobalRef(env,self); jclass cls=(*env)->GetObjectClass(env,self);
    event_method=(*env)->GetMethodID(env,cls,"onNativeEvent","(II[B)V"); frame_method=(*env)->GetMethodID(env,cls,"onNativeFrame","([B)Z");
    (*env)->DeleteLocalRef(env,cls); uint8_t addr[6]; (*env)->GetByteArrayRegion(env,mac,0,6,(jbyte *)addr); usb_stack_start(addr,event,frame,NULL);
}
JNIEXPORT void JNICALL Java_com_helyon_usb_StadiumUsbModule_nativeStop(JNIEnv *e,jobject self) { (void)self;env=e;usb_stack_stop();if(module)(*env)->DeleteGlobalRef(env,module);module=NULL; }
JNIEXPORT void JNICALL Java_com_helyon_usb_StadiumUsbModule_nativeTick(JNIEnv *e,jobject self) { (void)self;env=e;usb_stack_tick(); }
JNIEXPORT void JNICALL Java_com_helyon_usb_StadiumUsbModule_nativeInput(JNIEnv *e,jobject self,jbyteArray data) {
    (void)self;env=e;jsize n=(*e)->GetArrayLength(e,data);if(n<14||n>1518)return;
    uint8_t b[1518];(*e)->GetByteArrayRegion(e,data,0,n,(jbyte *)b);usb_stack_input(b,(size_t)n);
}
JNIEXPORT jboolean JNICALL Java_com_helyon_usb_StadiumUsbModule_nativeConnect(JNIEnv *e,jobject self,jint id,jint port) { (void)self;env=e;return usb_stack_connect(id,port); }
JNIEXPORT jboolean JNICALL Java_com_helyon_usb_StadiumUsbModule_nativeWrite(JNIEnv *e,jobject self,jint id,jbyteArray data) {
    (void)self;env=e;jsize n=(*e)->GetArrayLength(e,data);if(n<=0||n>1024*1024)return JNI_FALSE;
    jbyte *b=(*e)->GetByteArrayElements(e,data,NULL);if(!b)return JNI_FALSE;int ok=usb_stack_write(id,(uint8_t *)b,(size_t)n);(*e)->ReleaseByteArrayElements(e,data,b,JNI_ABORT);return ok;
}
JNIEXPORT void JNICALL Java_com_helyon_usb_StadiumUsbModule_nativeClose(JNIEnv *e,jobject self,jint id) { (void)self;env=e;usb_stack_close(id); }
