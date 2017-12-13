package com.microsoft.azure.mobile.cordova;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;

import org.json.JSONArray;
import org.json.JSONException;

import com.microsoft.azure.mobile.MobileCenter;
import com.microsoft.azure.mobile.push.Push;

public class MobileCenterPushPlugin extends CordovaPlugin {
    private CordovaPushListener listener;

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);

        MobileCenterShared.configureMobileCenter(
                cordova.getActivity().getApplication(),
                webView.getPreferences());

        listener = new CordovaPushListener();
        Push.setListener(listener);
        MobileCenter.start(Push.class);
    }

    @Override
    public boolean execute(String action, JSONArray args,
                           final CallbackContext callbackContext) throws JSONException {

        if (action.equals("isEnabled")) {
            MobileCenterUtils.sendBooleanPluginResultFromFuture(Push.isEnabled(), callbackContext);
            return true;
        } else if (action.equals("setEnabled")) {
            Boolean enabled = args.getBoolean(0);
            MobileCenterUtils.sendVoidPluginResultFromFuture(Push.setEnabled(enabled), callbackContext);
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
