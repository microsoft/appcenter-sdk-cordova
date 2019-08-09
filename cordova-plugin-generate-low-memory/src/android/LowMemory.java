// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

package com.microsoft.appcenter.cordova.demo;

import org.apache.cordova.*;
import org.json.JSONArray;
import org.json.JSONException;
import android.app.Activity;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import java.util.concurrent.atomic.AtomicInteger;
import android.util.Log;

public class LowMemory extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray data, CallbackContext callbackContext) throws JSONException {

        if (action.equals("generateLowMemory")) {
            final AtomicInteger i = new AtomicInteger(0);
            final Handler handler = new Handler(Looper.getMainLooper());
            handler.postDelayed(new Runnable() {
                @Override
                public void run() {
                    LowMemoryJni.generateLowMemory();
                    Log.d("Tag", "Memory allocated: " + i.addAndGet(128) + "MB");
                    handler.post(this);
                }
            }, 500);
            return true;
        } else {
            return false;

        }
    }
}