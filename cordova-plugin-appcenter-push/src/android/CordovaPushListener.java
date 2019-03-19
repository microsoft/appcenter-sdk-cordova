// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

package com.microsoft.azure.mobile.cordova;

import android.app.Activity;
import android.util.Log;

import com.microsoft.appcenter.push.PushListener;
import com.microsoft.appcenter.push.PushNotification;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.LOG;
import org.apache.cordova.PluginResult;
import org.json.JSONException;
import org.json.JSONObject;

class CordovaPushListener implements PushListener {
    private CallbackContext eventsCallbackContext;
    private boolean saveInitialNotification = true;
    private PushNotification initialNotification = null;

    private static final String LOG_TAG = "CordovaPush";
    private static final String ON_PUSH_NOTIFICATION_RECEIVED_EVENT = "notificationReceived";

    @Override
    public void onPushNotificationReceived(Activity activity, PushNotification pushNotification) {
        LOG.i(LOG_TAG, "Push notification received");

        // If saveInitialNotification is true, assume we've just been launched and save the first notification we receive.
        // This handles the scenario that when the user taps on a background notification to launch the app, the launch notification
        // gets sent to this native callback before the JS callback has a chance to register. So we need to save that notification off,
        // then send it when the JS callback registers & stop saving notifications after
        if (saveInitialNotification && initialNotification == null) {
            LOG.i(LOG_TAG, "Saving initial notification");
            initialNotification = pushNotification;

            return;
        }

        if (eventsCallbackContext == null) {
            return;
        }

        sendPushNotificationEvent(pushNotification);
    }

    private void sendPushNotificationEvent(PushNotification pushNotification) {
        if (eventsCallbackContext == null) {
            return;
        }

        try {
            JSONObject event = new JSONObject();
            event.put("type", ON_PUSH_NOTIFICATION_RECEIVED_EVENT);
            event.put("body", PushUtils.jsonObjectFromPushNotification(pushNotification));

            PluginResult result = new PluginResult(PluginResult.Status.OK, event);
            result.setKeepCallback(true);

            eventsCallbackContext.sendPluginResult(result);
        } catch (JSONException e) {
            LOG.e(LOG_TAG, "Failed to send onPushNotificationReceived event:");
            LOG.e(LOG_TAG, Log.getStackTraceString(e));
        }
    }

    void sendAndClearInitialNotification() {
        if (initialNotification != null) {
            sendPushNotificationEvent(initialNotification);
            initialNotification = null;
        }

        saveInitialNotification = false;
    }

    void setEventsCallbackContext(CallbackContext callbackContext) {
        this.eventsCallbackContext = callbackContext;
    }
}
