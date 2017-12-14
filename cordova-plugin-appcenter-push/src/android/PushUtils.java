package com.microsoft.azure.mobile.cordova;

import com.microsoft.appcenter.push.PushNotification;

import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import org.json.JSONException;
import org.json.JSONObject;

class PushUtils {
    static JSONObject jsonObjectFromPushNotification(PushNotification pushNotification) throws JSONException {
        if (pushNotification == null) {
            return new JSONObject();
        } else {
            JSONObject result = new JSONObject();
            result.put("title", pushNotification.getTitle());
            result.put("message", pushNotification.getMessage());

            Map customData = pushNotification.getCustomData();
            if (!customData.isEmpty()) {
                JSONObject cp = new JSONObject();
                Iterator iterator = customData.entrySet().iterator();
                while (iterator.hasNext()) {
                    Entry pair = (Entry) iterator.next();
                    Object value = pair.getValue();
                    cp.put((String) pair.getKey(), value);
                }

                iterator.remove();
                result.put("customProperties", cp);
            }

            return result;
        }
    }
}

