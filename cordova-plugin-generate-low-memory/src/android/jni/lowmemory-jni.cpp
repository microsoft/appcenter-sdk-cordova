/*
 * Copyright (c) 2019 Microsoft Corporation
 */

#include <jni.h>
#include <stdio.h>
#include <string.h>
#include <vector>

#ifdef __cplusplus
extern "C"
{
#endif

#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wunused-parameter"
#pragma ide diagnostic ignored "OCDFAInspection"
#pragma clang diagnostic ignored "-Wmissing-noreturn"
#pragma ide diagnostic ignored "cppcoreguidelines-avoid-magic-numbers"

static std::vector<void*> data;

void
Java_com_microsoft_appcenter_cordova_demo_LowMemoryJni_generateLowMemory(JNIEnv* env,
                                                  jobject thiz) {
    size_t size = 32 * 1024 * 1024;
    void *buffer = malloc(size);
    memset(buffer, 42, size);
    data.push_back(buffer);
}
#pragma clang diagnostic pop

#ifdef __cplusplus
}
#endif
