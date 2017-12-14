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
import com.microsoft.appcenter.analytics.Analytics;

public class AppCenterAnalyticsPlugin extends CordovaPlugin {
    private static final String ENABLE_IN_JS = "APPCENTER_ANALYTICS_ENABLE_IN_JS";

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);

        AppCenterShared.configureAppCenter(
                cordova.getActivity().getApplication(),
                webView.getPreferences());

        // TODO: once the underlying SDK supports this, make sure to call this
        //Analytics.setAutoPageTrackingEnabled(false);
        AppCenter.start(Analytics.class);

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
            AppCenterUtils.sendBooleanPluginResultFromFuture(Analytics.isEnabled(), callbackContext);
            return true;
        } else if (action.equals("setEnabled")) {
            Boolean enabled = args.getBoolean(0);
            AppCenterUtils.sendVoidPluginResultFromFuture(Analytics.setEnabled(enabled), callbackContext);
            return true;
        }

        return false;
    }
}
