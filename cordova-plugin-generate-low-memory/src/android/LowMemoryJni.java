package com.microsoft.appcenter.cordova.demo;

import android.app.Activity;
import android.widget.TextView;
import android.os.Bundle;


public class LowMemoryJni {

    public static native void generateLowMemory();
    static {
        System.loadLibrary("lowmemory-jni");
    }
}
