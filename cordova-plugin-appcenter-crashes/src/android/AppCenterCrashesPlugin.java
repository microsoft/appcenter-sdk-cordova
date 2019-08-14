// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

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
import com.microsoft.appcenter.crashes.Crashes;
import com.microsoft.appcenter.crashes.model.ErrorReport;
import com.microsoft.appcenter.utils.async.AppCenterConsumer;

import java.util.List;

public class AppCenterCrashesPlugin extends CordovaPlugin {
    private static final String ALWAYS_SEND = "APPCENTER_CRASHES_ALWAYS_SEND";
    private CordovaCrashListenerBase crashListener;

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);

        boolean sendAutomatically = webView.getPreferences().getBoolean(ALWAYS_SEND, true);
        crashListener = sendAutomatically ?
                new CordovaCrashesListenerAlwaysSend():
                new CordovaCrashesListenerAlwaysAsk();

        Crashes.setListener(crashListener);

        AppCenterShared.configureAppCenter(
                cordova.getActivity().getApplication(),
                webView.getPreferences());

        AppCenter.start(Crashes.class);
    }

    @Override
    public boolean execute(String action, JSONArray args,
                           final CallbackContext callbackContext) throws JSONException {

        if (action.equals("lastSessionCrashReport")) {
            Crashes.getLastSessionCrashReport()
                    .thenAccept(new AppCenterConsumer<ErrorReport>() {
                        @Override
                        public void accept(ErrorReport report) {
                            if (report == null) {
                                callbackContext.success("");
                            } else {
                                JSONObject jsonReport = CrashesUtils.jsonObjectFromReportOrEmpty(report);
                                callbackContext.success(jsonReport);
                            }
                        }
                    });

            return true;

        } else if (action.equals("hasCrashedInLastSession")) {
            AppCenterUtils.sendBooleanPluginResultFromFuture(Crashes.hasCrashedInLastSession(), callbackContext);
            return true;
        } else if (action.equals("hasReceivedMemoryWarningInLastSession")) {
            AppCenterUtils.sendBooleanPluginResultFromFuture(Crashes.hasReceivedMemoryWarningInLastSession(), callbackContext);
            return true;
        } else if (action.equals("getCrashReports")) {
            List<ErrorReport> pendingReports = crashListener.getAndClearReports();
            callbackContext.success(CrashesUtils.jsonArrayFromReportsOrEmpty(pendingReports));
            return true;
        } else if (action.equals("isEnabled")) {
            AppCenterUtils.sendBooleanPluginResultFromFuture(Crashes.isEnabled(), callbackContext);
            return true;
        } else if (action.equals("setEnabled")) {
            Boolean enabled = args.getBoolean(0);
            AppCenterUtils.sendVoidPluginResultFromFuture(Crashes.setEnabled(enabled), callbackContext);
            return true;
        } else if (action.equals("generateTestCrash")) {
            cordova.getThreadPool().execute(new Runnable() {
                @Override
                public void run() {
                    Crashes.generateTestCrash();
                    callbackContext.sendPluginResult(
                            new PluginResult(PluginResult.Status.ERROR,
                                    "generateTestCrash failed to generate a crash"));
                }
            });

            return true;
        } else if (action.equals("crashUserResponse")) {
            if (crashListener != null) {
                JSONObject attachments = args.getJSONObject(1);
                crashListener.setAttachments(attachments);
            }

            Boolean doSend = args.getBoolean(0);
            int response = doSend ? Crashes.SEND : Crashes.DONT_SEND;
            Crashes.notifyUserConfirmation(response);

            callbackContext.success();

            return true;
        } else if (action.equals("registerEventsCallback")) {
            crashListener.setEventsCallbackContext(callbackContext);
            return true;
        }

        return false;
    }
}
