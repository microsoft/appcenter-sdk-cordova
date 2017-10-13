var exec = require('cordova/exec');

module.exports = {
    trackEvent(eventName, properties, success, error) {
        exec(success, error, "MobileCenterAnalytics", "trackEvent",
            [eventName, sanitizeProperties(properties)]);
    },

    isEnabled(success, error) {
        exec(success, error, "MobileCenterAnalytics", "isEnabled");
    },

    setEnabled(enabled, success, error) {
        exec(success, error, "MobileCenterAnalytics", "setEnabled", [enabled]);
    },

    /*
    // TODO: Uncomment this once the underlying SDK supports the functionality
    trackPage(pageName, properties, success, error) {
        exec(success, error, "MobileCenterAnalytics", "trackPage",
            [pageName, sanitizeProperties(properties)]);
    }
    */
};

function sanitizeProperties(props) {
    // Only string:string mappings are supported currently.

    const result = {};

    for (const i in props) {
        switch (typeof props[i]) {
            case 'string':
            case 'number':
            case 'boolean':
                result[i] = `${props[i]}`;
                break;
            case 'undefined':
                break;
            default:
                throw new Error('Properties cannot be serialized. Object must only contain strings');
        }
    }

    return result;
}
