LOCAL_PATH := $(call my-dir)
include $(CLEAR_VARS)
LOCAL_MODULE := lowmemory-jni
LOCAL_SRC_FILES := lowmemory-jni.cpp
include $(BUILD_SHARED_LIBRARY)