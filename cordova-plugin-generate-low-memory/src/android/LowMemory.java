package com.example.plugin;

import org.apache.cordova.*;
import org.json.JSONArray;
import org.json.JSONException;
import android.app.Activity;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import java.util.concurrent.atomic.AtomicInteger;
import android.util.Log;
import android.content.ComponentCallbacks2;
import android.content.Context;
import android.content.res.Configuration;
public class LowMemory extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray data, CallbackContext callbackContext) throws JSONException {

        if (action.equals("generateLowMemory")) {
            Context context = this.cordova.getActivity().getApplicationContext();
            Log.d("Tag", "register mMemoryWarningListener");
            ComponentCallbacks2 mMemoryWarningListener = new ComponentCallbacks2() {

                @Override
               public void onTrimMemory(int level) {
                Log.d("Tag", "onTrimMemory " + level);
               }

                @Override
               public void onConfigurationChanged(Configuration newConfig) {
               }

                @Override
               public void onLowMemory() {
                Log.d("Tag", "onLowMemory");
               }
            };
            context.registerComponentCallbacks(mMemoryWarningListener);

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