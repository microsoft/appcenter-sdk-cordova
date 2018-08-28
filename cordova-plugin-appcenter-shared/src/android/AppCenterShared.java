package com.microsoft.azure.mobile.cordova;

import android.app.Application;
import org.apache.cordova.CordovaPreferences;
import com.microsoft.appcenter.AppCenter;
import com.microsoft.appcenter.ingestion.models.WrapperSdk;

class AppCenterShared {

    // TODO: Refine constants
    private final static String VERSION_NAME = "0.0.1";
    private final static String SDK_NAME = "appcenter.cordova";
    private static final String APP_SECRET = "APP_SECRET";
    private static String appSecret;
    private static final WrapperSdk wrapperSdk = new WrapperSdk();

    static void configureAppCenter(Application application, CordovaPreferences preferences) {
        if (AppCenter.isConfigured()) {
            return;
        }

        AppCenterShared.wrapperSdk.setWrapperSdkVersion(AppCenterShared.VERSION_NAME);
        AppCenterShared.wrapperSdk.setWrapperSdkName(AppCenterShared.SDK_NAME);

        AppCenter.setWrapperSdk(wrapperSdk);
        AppCenter.configure(application, AppCenterShared.getAppSecret(preferences));
    }

    private static String getAppSecret(CordovaPreferences preferences) {
        if (AppCenterShared.appSecret == null) {
            AppCenterShared.appSecret = preferences.getString(APP_SECRET, null);
        }

        return AppCenterShared.appSecret;
    }
}
