var channel = require('cordova/channel');
var exec = require('cordova/exec');

var channels = {
    notificationReceived: channel.create("notificationReceived")
};

var Push = {
    isEnabled: function (success, error) {
        exec(success, error, "AppCenterPush", "isEnabled", []);
    },

    setEnabled: function (shouldEnable, success, error) {
        exec(success, error, "AppCenterPush", "setEnabled", [shouldEnable]);
    },

    addEventListener: function (eventname, f) {
        if (eventname in channels) {
            channels[eventname].subscribe(f);
            exec(null, null, "AppCenterPush", "sendAndClearInitialNotification", []);
        }
    },

    removeEventListener: function (eventname, f) {
        if (eventname in channels) {
            channels[eventname].unsubscribe(f);
        }
    }
};

channel.onCordovaReady.subscribe(function () {
    function fireEvent(event) {
        if (event && event.type && event.type in channels) {
            channels[event.type].fire(event.body);
        }
    }

    exec(fireEvent, null, 'AppCenterPush', 'registerEventsCallback', []);
});

module.exports = Push;
