package com.example.plugin;

import org.apache.cordova.*;
import org.json.JSONArray;
import org.json.JSONException;
import android.app.Activity;
import android.os.Bundle;

public class LowMemory extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray data, CallbackContext callbackContext) throws JSONException {

        if (action.equals("generateLowMemory")) {
            LowMemoryJni.generateLowMemory();

            return true;

        } else {
            
            return false;

        }
    }
}