// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

package com.microsoft.azure.mobile.cordova;

import android.app.Application;
import android.util.Log;
import org.apache.cordova.CordovaPreferences;
import com.microsoft.appcenter.AppCenter;
import com.microsoft.appcenter.utils.AppCenterLog;
import com.microsoft.appcenter.ingestion.models.WrapperSdk;

class AppCenterShared {

    // TODO: Refine constants
    private final static String VERSION_NAME = "0.5.1";
    private final static String SDK_NAME = "appcenter.cordova";
    private static final String APP_SECRET = "APP_SECRET";
    private static final String LOG_URL = "LOG_URL_KEY";
    private static final String LOG_LEVEL_KEY = "LOG_LEVEL";
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

        final int logLevel = preferences.getInteger(LOG_LEVEL_KEY, Log.VERBOSE);
        AppCenter.setLogLevel(logLevel);
        
        final String logUrl = preferences.getString(LOG_URL, null);
        if (logUrl != null && !logUrl.isEmpty()) {
            AppCenter.setLogUrl(logUrl);
        }
    }

    private static String getAppSecret(CordovaPreferences preferences) {
        if (AppCenterShared.appSecret == null) {
            AppCenterShared.appSecret = preferences.getString(APP_SECRET, null);
        }

        return AppCenterShared.appSecret;
    }

    private static void setUserId(String userId) {
        AppCenter.setUserId(userId);
    }
}
