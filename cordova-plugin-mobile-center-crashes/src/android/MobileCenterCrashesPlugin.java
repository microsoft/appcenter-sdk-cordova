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
import com.microsoft.azure.mobile.crashes.Crashes;
import com.microsoft.azure.mobile.crashes.model.ErrorReport;
import com.microsoft.azure.mobile.utils.async.MobileCenterConsumer;

import java.util.List;

public class MobileCenterCrashesPlugin extends CordovaPlugin {
    private static final String ALWAYS_SEND = "MOBILE_CENTER_CRASHES_ALWAYS_SEND";
    private CordovaCrashListenerBase crashListener;

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);

        boolean sendAutomatically = webView.getPreferences().getBoolean(ALWAYS_SEND, false);
        crashListener = sendAutomatically ?
                new CordovaCrashesListenerAlwaysSend():
                new CordovaCrashesListenerAlwaysAsk();

        Crashes.setListener(crashListener);

        MobileCenterShared.configureMobileCenter(
                cordova.getActivity().getApplication(),
                webView.getPreferences());

        MobileCenter.start(Crashes.class);
    }

    @Override
    public boolean execute(String action, JSONArray args,
                           final CallbackContext callbackContext) throws JSONException {

        if (action.equals("lastSessionCrashReport")) {
            Crashes.getLastSessionCrashReport()
                    .thenAccept(new MobileCenterConsumer<ErrorReport>() {
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
            MobileCenterUtils.sendBooleanPluginResultFromFuture(Crashes.hasCrashedInLastSession(), callbackContext);
            return true;
        } else if (action.equals("getCrashReports")) {
            List<ErrorReport> pendingReports = crashListener.getAndClearReports();
            callbackContext.success(CrashesUtils.jsonArrayFromReportsOrEmpty(pendingReports));

            return true;

        } else if (action.equals("isEnabled")) {
            MobileCenterUtils.sendBooleanPluginResultFromFuture(Crashes.isEnabled(), callbackContext);
            return true;

        } else if (action.equals("setEnabled")) {
            Boolean enabled = args.getBoolean(0);
            MobileCenterUtils.sendVoidPluginResultFromFuture(Crashes.setEnabled(enabled), callbackContext);
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
