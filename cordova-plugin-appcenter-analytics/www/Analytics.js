// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

var exec = require('cordova/exec');

module.exports = {
    trackEvent: function(eventName, properties, success, error) {
        exec(success, error, "AppCenterAnalytics", "trackEvent",
            [eventName, sanitizeProperties(properties)]);
    },

    isEnabled: function(success, error) {
        exec(success, error, "AppCenterAnalytics", "isEnabled", []);
    },

    setEnabled: function(enabled, success, error) {
        exec(success, error, "AppCenterAnalytics", "setEnabled", [enabled]);
    },

    /*
    // TODO: Uncomment this once the underlying SDK supports the functionality
    trackPage: function(pageName, properties, success, error) {
        exec(success, error, "AppCenterAnalytics", "trackPage",
            [pageName, sanitizeProperties(properties)]);
    }
    */
};

function sanitizeProperties(props) {
    // Only string:string mappings are supported currently.

    var result = {};

    for (var i in props) {
        switch (typeof props[i]) {
            case 'string':
            case 'number':
            case 'boolean':
                result[i] = "" + props[i];
                break;
            case 'undefined':
                break;
            default:
                throw new Error('Properties cannot be serialized. Object must only contain strings');
        }
    }

    return result;
}
