package com.microsoft.azure.mobile.cordova;

import android.app.Application;

import org.apache.cordova.CordovaPreferences;

import com.microsoft.azure.mobile.MobileCenter;
import com.microsoft.azure.mobile.ingestion.models.WrapperSdk;

class MobileCenterShared {

    // TODO: Refine constants
    private final static String VERSION_NAME = "0.0.1";
    private final static String SDK_NAME = "mobilecenter.cordova";
    private static final String MOBILE_CENTER_APP_SECRET = "MOBILE_CENTER_APP_SECRET";
    private static String appSecret;
    private static final WrapperSdk wrapperSdk = new WrapperSdk();

    static void configureMobileCenter(Application application, CordovaPreferences preferences) {
        if (MobileCenter.isConfigured()) {
            return;
        }

        MobileCenterShared.wrapperSdk.setWrapperSdkVersion(MobileCenterShared.VERSION_NAME);
        MobileCenterShared.wrapperSdk.setWrapperSdkName(MobileCenterShared.SDK_NAME);

        MobileCenter.setWrapperSdk(wrapperSdk);
        MobileCenter.configure(application, MobileCenterShared.getAppSecret(preferences));
    }

    private static String getAppSecret(CordovaPreferences preferences) {
        if (MobileCenterShared.appSecret == null) {
            MobileCenterShared.appSecret = preferences.getString(MOBILE_CENTER_APP_SECRET, null);
        }

        return MobileCenterShared.appSecret;
    }
}
