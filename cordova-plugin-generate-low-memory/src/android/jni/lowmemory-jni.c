
#include <string.h>
#include <jni.h>

void
Java_com_example_plugin_LowMemoryJni_generateLowMemory(JNIEnv* env,
                                                  jobject thiz)
{
    size_t size = 128 * 1024 * 1024;
    void *buffer = malloc(size);
    memset(buffer, 42, size);
}