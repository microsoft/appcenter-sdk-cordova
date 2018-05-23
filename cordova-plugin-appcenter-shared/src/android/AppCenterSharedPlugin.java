package com.microsoft.azure.mobile.cordova;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.microsoft.appcenter.AppCenter;
import com.microsoft.appcenter.utils.async.AppCenterConsumer;

import java.util.List;
import java.util.UUID;

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

        } else if (action.equals("setAppSecret")) {
            String secret = args.getString(0);
            AppCenterShared.setAppSecret(secret);
            return true;
        }
        return false;
    }
}
