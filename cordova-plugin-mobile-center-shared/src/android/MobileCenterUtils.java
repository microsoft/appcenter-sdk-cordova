package com.microsoft.azure.mobile.cordova;

import com.microsoft.azure.mobile.utils.async.MobileCenterConsumer;
import com.microsoft.azure.mobile.utils.async.MobileCenterFuture;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

class MobileCenterUtils {
    public static void sendBooleanPluginResultFromFuture(
            MobileCenterFuture<Boolean> future,
            final CallbackContext callbackContext) {

        future.thenAccept(new MobileCenterConsumer<Boolean>() {
            @Override
            public void accept(Boolean futureResult) {
                callbackContext.sendPluginResult(
                        new PluginResult(PluginResult.Status.OK, futureResult));
            }
        });
    }

    public static void sendVoidPluginResultFromFuture(
            MobileCenterFuture<Void> future,
            final CallbackContext callbackContext) {

        future.thenAccept(new MobileCenterConsumer<Void>() {
            @Override
            public void accept(Void noResult) {
                callbackContext.sendPluginResult(
                        new PluginResult(PluginResult.Status.OK));
            }
        });
    }
}
