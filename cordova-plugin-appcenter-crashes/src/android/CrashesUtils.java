// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

package com.microsoft.azure.mobile.cordova;

import android.util.Log;

import com.microsoft.appcenter.crashes.model.ErrorReport;
import com.microsoft.appcenter.ingestion.models.Device;

import org.apache.cordova.LOG;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONStringer;

import java.util.List;

class CrashesUtils {
    private static final String LOG_TAG = "Crashes";

    static JSONArray jsonArrayFromReportsOrEmpty(List<ErrorReport> pendingReports) {
        JSONArray reports = new JSONArray();

        try {
            for (ErrorReport report:pendingReports) {
                JSONObject jsonReport = jsonObjectFromReport(report);
                reports.put(jsonReport);
            }
        } catch (JSONException e) {
            LOG.e(LOG_TAG, "Unable to serialize crash report", e);
        }

        return reports;
    }

    static JSONObject jsonObjectFromReport(ErrorReport errorReport) throws JSONException {
        if (errorReport == null) {
            return new JSONObject();
        }

        JSONObject jsonReport = new JSONObject();
        jsonReport.put("id", errorReport.getId());
        jsonReport.put("threadName", errorReport.getThreadName());
        jsonReport.put("appErrorTime", "" + errorReport.getAppErrorTime().getTime());
        jsonReport.put("appStartTime", "" + errorReport.getAppStartTime().getTime());
        jsonReport.put("exception", errorReport.getStackTrace());

        Device deviceInfo = errorReport.getDevice();
        JSONStringer jsonStringer = new JSONStringer();
        jsonStringer.object();
        deviceInfo.write(jsonStringer);
        jsonStringer.endObject();
        JSONObject deviceInfoJson = new JSONObject(jsonStringer.toString());

        jsonReport.put("device", deviceInfoJson);
        return jsonReport;
    }

    static JSONObject jsonObjectFromReportOrEmpty(ErrorReport errorReport) {
        try {
            return jsonObjectFromReport(errorReport);
        } catch (JSONException e) {
            LOG.e(LOG_TAG, "Unable to serialize crash report", e);
            return new JSONObject();
        }
    }
}
