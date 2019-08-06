#include <string.h>
#include <ccode.h>
#include <CCodeJni.h>

JNIEXPORT void JNICALL Java_com_microsoft_CCodeJni_generateLowMemory( JNIEnv* env, jclass thiz)
{
    c_generateLowMemory();
}