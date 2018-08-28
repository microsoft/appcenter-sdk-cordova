package com.microsoft.azure.mobile.cordova;

import com.microsoft.appcenter.AppCenter;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;

public class AppCenterSharedPlugin extends CordovaPlugin {

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
    }

    @Override
    public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {
        if (action.equals("getInstallId")) {
            AppCenterUtils.sendUUIDPluginResultFromFuture(AppCenter.getInstallId(), callbackContext);
            return true;
        }
        return false;
    }
}
