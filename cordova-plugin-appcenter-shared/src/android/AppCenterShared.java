package com.microsoft.azure.mobile.cordova;

import android.app.Application;

import com.microsoft.appcenter.AppCenter;
import com.microsoft.appcenter.ingestion.models.WrapperSdk;
import com.microsoft.appcenter.utils.async.AppCenterFuture;
import com.microsoft.appcenter.utils.async.DefaultAppCenterFuture;

import org.apache.cordova.CordovaPreferences;

class AppCenterShared {

    // TODO: Refine constants
    private final static String VERSION_NAME = "0.0.1";
    private final static String SDK_NAME = "appcenter.cordova";
    private static final String APP_SECRET = "APP_SECRET";
    private static String appSecret;
    private static final WrapperSdk wrapperSdk = new WrapperSdk();
    private static Application application;

    static void configureAppCenter(Application application, CordovaPreferences preferences) {
        AppCenterShared.application = application;
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

    public static AppCenterFuture<Void> setAppSecret(String appSecret) {
        final DefaultAppCenterFuture<Void> future = new DefaultAppCenterFuture<>();

        AppCenterShared.appSecret = appSecret;
        AppCenter.configure(application, appSecret);
        future.complete(null);
        return future;
    }
}
