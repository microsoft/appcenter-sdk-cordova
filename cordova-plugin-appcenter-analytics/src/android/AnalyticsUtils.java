package com.microsoft.azure.mobile.cordova;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

class AnalyticsUtils {
    static Map<String, String>stringMapFromJsonObject(JSONObject obj) throws JSONException {
        Map<String, String> result = new HashMap<String, String>();

        Iterator<String> props = obj.keys();
        while (props.hasNext()) {
            String key = props.next();
            result.put(key, obj.getString(key));
        }

        return result;
    }
}
