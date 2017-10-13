package com.microsoft.azure.mobile.cordova;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.microsoft.azure.mobile.MobileCenter;
import com.microsoft.azure.mobile.analytics.Analytics;

public class MobileCenterAnalyticsPlugin extends CordovaPlugin {
    private static final String ENABLE_IN_JS = "MOBILE_CENTER_ANALYTICS_ENABLE_IN_JS";

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);

        MobileCenterShared.configureMobileCenter(
                cordova.getActivity().getApplication(),
                webView.getPreferences());

        // TODO: once the underlying SDK supports this, make sure to call this
        //Analytics.setAutoPageTrackingEnabled(false);
        MobileCenter.start(Analytics.class);

        boolean enableInJs = webView.getPreferences().getBoolean(ENABLE_IN_JS, false);
        if (enableInJs) {
            // Avoid starting an analytics session.
            // Note that we don't call this if startEnabled is true, because
            // that causes a session to try and start before Analytics is started.
            Analytics.setEnabled(false);
        }
    }

    @Override
    public boolean execute(String action, JSONArray args,
                           final CallbackContext callbackContext) throws JSONException {

        if (action.equals("trackEvent")) {

            String eventName = args.getString(0);
            JSONObject properties = args.getJSONObject(1);

            try {
                Analytics.trackEvent(eventName, AnalyticsUtils.stringMapFromJsonObject(properties));
                callbackContext.success();
            } catch (JSONException e) {
                callbackContext.sendPluginResult(
                        new PluginResult(PluginResult.Status.JSON_EXCEPTION, e.getMessage()));
            }

            return true;

        } else if (action.equals("isEnabled")) {
            MobileCenterUtils.sendBooleanPluginResultFromFuture(Analytics.isEnabled(), callbackContext);
            return true;
        } else if (action.equals("setEnabled")) {
            Boolean enabled = args.getBoolean(0);
            MobileCenterUtils.sendVoidPluginResultFromFuture(Analytics.setEnabled(enabled), callbackContext);
            return true;
        }

        return false;
    }
}
