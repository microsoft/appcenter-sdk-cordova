var channel = require('cordova/channel');
var exec = require('cordova/exec');

var channels = {
    willSendCrash: channel.create("willSendCrash"),
    didSendCrash: channel.create("didSendCrash"),
    failedSendingCrash: channel.create("failedSendingCrash")
};

var Crashes = {
    generateTestCrash: function (error) {
        exec(null, error, "MobileCenterCrashes", "generateTestCrash");
    },

    hasCrashedInLastSession: function (success, error) {
        exec(success, error, "MobileCenterCrashes", "hasCrashedInLastSession");
    },

    lastSessionCrashReport: function (success, error) {
        exec(success, error, "MobileCenterCrashes", "lastSessionCrashReport");
    },

    isEnabled: function (success, error) {
        exec(success, error, "MobileCenterCrashes", "isEnabled");
    },

    setEnabled: function (shouldEnable, success, error) {
        exec(success, error, "MobileCenterCrashes", "setEnabled", [shouldEnable]);
    },

    process: function (processorFunction, errorCallback) {

        function failIfNotEnabled(error) {
            // TODO: Make sure that native getCrashReports waits for Crashes to be enabled first
            // TODO: Check for error name/class - this might be e.g. JSONException
            error('App Center crashes is not enabled.');
        }

        function processReports(reports) {
            if (!reports) {
                return;
            }

            var errorAttachments = {};

            var wrapReports = reports.map(function (report) {
                // Add text attachment to an error report
                function addTextAttachment(text, fileName) {
                    if (!errorAttachments[report.id]) {
                        errorAttachments[report.id] = [];
                    }

                    errorAttachments[report.id].push({
                        text: text,
                        fileName: fileName
                    });
                }

                // Add binary attachment to an error report, binary must be passed as a base64 string
                function addBinaryAttachment(data, fileName, contentType) {
                    if (!errorAttachments[report.id]) {
                        errorAttachments[report.id] = [];
                    }

                    errorAttachments[report.id].push({
                        data: data,
                        fileName: fileName,
                        contentType: contentType
                    });
                }

                return Object.assign({
                    addTextAttachment: addTextAttachment,
                    addBinaryAttachment: addBinaryAttachment
                }, report);
            });

            processorFunction(wrapReports, function (response) {
                exec(null, null, "MobileCenterCrashes", "crashUserResponse", [response, errorAttachments]);
            });
        }

        exec(processReports, failIfNotEnabled, "MobileCenterCrashes", "getCrashReports");
    },

    addEventListener: function (eventname, f) {
        if (eventname in channels) {
            channels[eventname].subscribe(f);
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
            channels[event.type].fire(event.report);
        }
    }

    exec(fireEvent, null, 'MobileCenterCrashes', 'registerEventsCallback', []);
});

module.exports = Crashes;

// TODO: isDebuggerAttached for iOS - Android does not have "isDebuggerAttached" method
// if (Crashes && RNCrashes && RNCrashes.isDebuggerAttached) {
//     Crashes = Object.assign({
//         // async - returns a Promise
//         isDebuggerAttached() {
//             return RNCrashes.isDebuggerAttached();
//         },
//     }, Crashes);
// }
