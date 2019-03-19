// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

package com.microsoft.azure.mobile.cordova;
import java.util.UUID;
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
    public static void sendBooleanPluginResultFromFuture(AppCenterFuture<Boolean> future,
            final CallbackContext callbackContext) {

        future.thenAccept(new AppCenterConsumer<Boolean>() {
            @Override
            public void accept(Boolean futureResult) {
                callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, futureResult));
            }
        });
    }

    public static void sendUUIDPluginResultFromFuture(AppCenterFuture<UUID> future,
            final CallbackContext callbackContext) {

        future.thenAccept(new AppCenterConsumer<UUID>() {
            @Override
            public void accept(UUID futureResult) {
                callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, futureResult == null ? null : futureResult.toString()));
            }
        });
    }

    public static void sendVoidPluginResultFromFuture(AppCenterFuture<Void> future,
            final CallbackContext callbackContext) {

        future.thenAccept(new AppCenterConsumer<Void>() {
            @Override
            public void accept(Void noResult) {
                callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK));
            }
        });
    }
}
