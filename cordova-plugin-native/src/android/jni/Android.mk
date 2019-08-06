# Android Makefile

APP_PLATFORM := android-19

PATH_SEP := /

LOCAL_PATH := $(call my-dir)
include $(CLEAR_VARS)

#traverse all the directory and subdirectory
define walk
  $(wildcard $(1)) $(foreach e, $(wildcard $(1)$(PATH_SEP)*), $(call walk, $(e)))
endef

LOCAL_MODULE := CCode

# Include paths
INCLUDE_LIST := $(wildcard $(LOCAL_PATH))
INCLUDE_LIST := $(wildcard $(LOCAL_PATH))/../../common/
ifeq ($(OS),Windows_NT)
	INCLUDE_LIST += ${shell dir $(LOCAL_PATH)\..\..\common\ /ad /b /s}
else
	INCLUDE_LIST += ${shell find $(LOCAL_PATH)/../../common/ -type d}
endif


# C source files
SRC_LIST := $(wildcard $(LOCAL_PATH)$(PATH_SEP)*.c)
SRC_LIST += $(filter %.c, $(call walk, $(LOCAL_PATH)$(PATH_SEP)..$(PATH_SEP)..$(PATH_SEP)common))

# Log to console
$(warning LOCAL_PATH:$(LOCAL_PATH))
$(warning SRC_LIST:$(SRC_LIST))
$(warning INCLUDE_LIST:$(INCLUDE_LIST))

LOCAL_C_INCLUDES := $(INCLUDE_LIST)
LOCAL_SRC_FILES := $(SRC_LIST:$(LOCAL_PATH)$(PATH_SEP)%=%)

include $(BUILD_SHARED_LIBRARY)