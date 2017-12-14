package com.microsoft.azure.mobile.cordova;

import android.util.Base64;

import com.microsoft.appcenter.crashes.AbstractCrashesListener;
import com.microsoft.appcenter.crashes.ingestion.models.ErrorAttachmentLog;
import com.microsoft.appcenter.crashes.model.ErrorReport;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.LOG;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;

abstract class CordovaCrashListenerBase extends AbstractCrashesListener {

    private static final String LOG_TAG = "CordovaCrashes";

    private static final String ON_BEFORE_SENDING_EVENT = "willSendCrash";
    private static final String ON_SENDING_FAILED_EVENT = "failedSendingCrash";
    private static final String ON_SENDING_SUCCEEDED_EVENT = "didSendCrash";

    private List<ErrorReport> mPendingReports = new ArrayList<ErrorReport>();

    private JSONObject attachments;

    private CallbackContext eventsCallbackContext;

    void setAttachments(JSONObject attachments) {
        this.attachments = attachments;
    }

    @SuppressWarnings("WeakerAccess")
    public final List<ErrorReport> getAndClearReports() {
        List<ErrorReport> reports = this.mPendingReports;
        this.mPendingReports = new ArrayList<ErrorReport>();
        return reports;
    }

    @SuppressWarnings("WeakerAccess")
    protected final void storeReportForJS(ErrorReport report) {
        this.mPendingReports.add(report);
    }

    @Override
    public Iterable<ErrorAttachmentLog> getErrorAttachments(ErrorReport report) {
        if (this.attachments == null) {
            return null;
        }

        Collection<ErrorAttachmentLog> attachmentLogs = new LinkedList<ErrorAttachmentLog>();
        try {
            String errorId = report.getId();
            JSONArray jsAttachmentsForReport = attachments.getJSONArray(errorId);

            if (jsAttachmentsForReport != null) {
                for (int i = 0; i < jsAttachmentsForReport.length(); i++) {
                    JSONObject jsAttachment = jsAttachmentsForReport.getJSONObject(i);
                    String fileName = jsAttachment.getString("fileName");
                    if (jsAttachment.has("text")) {
                        String text = jsAttachment.getString("text");
                        attachmentLogs.add(ErrorAttachmentLog.attachmentWithText(text, fileName));
                    } else {
                        String encodedData = jsAttachment.getString("data");
                        byte[] data = Base64.decode(encodedData, Base64.DEFAULT);
                        String contentType = jsAttachment.getString("contentType");
                        attachmentLogs.add(ErrorAttachmentLog.attachmentWithBinary(data, fileName, contentType));
                    }
                }
            }

            return attachmentLogs;
        } catch (Exception e) {
            LOG.e(LOG_TAG, "Failed to get error attachment for report: " + report.getId(), e);
            return null;
        }
    }

    @Override
    public final void onBeforeSending(ErrorReport report) {
        LOG.i(LOG_TAG, "Sending error report: " + report.getId());
        trySendEventWithReport(ON_BEFORE_SENDING_EVENT, report);
    }

    @Override
    public final void onSendingFailed(ErrorReport report, Exception reason) {
        LOG.e(LOG_TAG, "Failed to send error report: " + report.getId(), reason);
        trySendEventWithReport(ON_SENDING_FAILED_EVENT, report);
    }

    @Override
    public final void onSendingSucceeded(ErrorReport report) {
        LOG.i(LOG_TAG, "Successfully Sent error report: " + report.getId());
        trySendEventWithReport(ON_SENDING_SUCCEEDED_EVENT, report);
    }

    private void trySendEventWithReport(String eventName, ErrorReport report) {
        if (this.eventsCallbackContext == null) {
            return;
        }

        try {
            JSONObject event = new JSONObject();
            event.put("type", eventName);
            event.put("report", CrashesUtils.jsonObjectFromReport(report));

            PluginResult result = new PluginResult(PluginResult.Status.OK, event);
            result.setKeepCallback(true);

            eventsCallbackContext.sendPluginResult(result);
        } catch (JSONException e) {
            LOG.e(LOG_TAG, "Failed to send " + eventName + " event:", e);
        }
    }

    void setEventsCallbackContext(CallbackContext callbackContext) {
        this.eventsCallbackContext = callbackContext;
    }
}

class CordovaCrashesListenerAlwaysAsk extends CordovaCrashListenerBase {
    CordovaCrashesListenerAlwaysAsk() {
    }

    @Override
    public boolean shouldProcess(ErrorReport report) {
        // Keep this report ready to send over to JS
        this.storeReportForJS(report);

        // Process all crashes by default. JS side can stop a crash from
        // being reported via the user confirmation "DONT_SEND" signal.
        return true;
    }

    @Override
    public boolean shouldAwaitUserConfirmation() {
        // Require user confirmation for all crashes, since this is the
        // only way JS can indicate whether or not a crash should be sent.

        return true;
    }
}

class CordovaCrashesListenerAlwaysSend extends CordovaCrashListenerBase {
    CordovaCrashesListenerAlwaysSend() {
    }

    @Override
    public boolean shouldProcess(ErrorReport report) {
        // Process all crashes
        return true;
    }

    @Override
    public boolean shouldAwaitUserConfirmation() {
        // Do not wait for confirmation, send crashes immediately
        return false;
    }
}
