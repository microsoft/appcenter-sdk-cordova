// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

package com.microsoft.azure.mobile.cordova;

import android.content.Intent;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;

import org.json.JSONArray;
import org.json.JSONException;

import com.microsoft.appcenter.AppCenter;
import com.microsoft.appcenter.push.Push;

public class AppCenterPushPlugin extends CordovaPlugin {
    private CordovaPushListener listener;
    private CordovaInterface mCordova;

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        mCordova = cordova;
        AppCenterShared.configureAppCenter(
                cordova.getActivity().getApplication(),
                webView.getPreferences());

        listener = new CordovaPushListener();
        Push.setListener(listener);
        
        AppCenter.start(Push.class);
    }

    @Override
    public void onNewIntent(Intent intent) {
        Push.checkLaunchedFromNotification(mCordova.getActivity(), intent);
    }

    @Override
    public boolean execute(String action, JSONArray args,
                           final CallbackContext callbackContext) throws JSONException {

        if (action.equals("isEnabled")) {
            AppCenterUtils.sendBooleanPluginResultFromFuture(Push.isEnabled(), callbackContext);
            return true;
        } else if (action.equals("setEnabled")) {
            Boolean enabled = args.getBoolean(0);
            AppCenterUtils.sendVoidPluginResultFromFuture(Push.setEnabled(enabled), callbackContext);
            return true;
        } else if (action.equals("sendAndClearInitialNotification")) {
            listener.sendAndClearInitialNotification();
            return true;
        } else if (action.equals("registerEventsCallback")) {
            listener.setEventsCallbackContext(callbackContext);
            return true;
        }

        return false;
    }
}
