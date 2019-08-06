package com.microsoft;

public class CCodeJni {

    // C-function interface
    public static native void generateLowMemory();

    // load library
    static {
        System.loadLibrary("CCode");
    }
}
