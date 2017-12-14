package com.microsoft.azure.mobile.cordova;

import com.microsoft.appcenter.utils.async.AppCenterConsumer;
import com.microsoft.appcenter.utils.async.AppCenterFuture;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

class AppCenterUtils {
    public static void sendBooleanPluginResultFromFuture(
            AppCenterFuture<Boolean> future,
            final CallbackContext callbackContext) {

        future.thenAccept(new AppCenterConsumer<Boolean>() {
            @Override
            public void accept(Boolean futureResult) {
                callbackContext.sendPluginResult(
                        new PluginResult(PluginResult.Status.OK, futureResult));
            }
        });
    }

    public static void sendVoidPluginResultFromFuture(
            AppCenterFuture<Void> future,
            final CallbackContext callbackContext) {

        future.thenAccept(new AppCenterConsumer<Void>() {
            @Override
            public void accept(Void noResult) {
                callbackContext.sendPluginResult(
                        new PluginResult(PluginResult.Status.OK));
            }
        });
    }
}
