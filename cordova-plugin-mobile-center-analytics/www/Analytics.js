var exec = require('cordova/exec');

module.exports = {
    trackEvent: (eventName, properties) =>
        new Promise((resolve, reject) =>
            exec(resolve, reject,
                "MobileCenterAnalytics", "trackEvent",
                [eventName, sanitizeProperties(properties)])),

    isEnabled: () => new Promise((resolve, reject) =>
        exec(resolve, reject, "MobileCenterAnalytics", "isEnabled")),

    setEnabled: (enabled) => new Promise((resolve, reject) =>
        exec(resolve, reject, "MobileCenterAnalytics", "setEnabled", [enabled])),
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
