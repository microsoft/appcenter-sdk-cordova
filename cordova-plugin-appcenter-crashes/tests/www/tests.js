/*jshint jasmine: true */

module.exports.defineAutoTests = function () {
    // TODO: Add autotests
};

module.exports.defineManualTests = function (contentEl, createActionButton) {

    var crashesState = null;

    var fail = function (err) {
        contentEl.innerHTML = err ? err.message : "";
    };

    createActionButton("Crash app", function () {
        MobileCenter.Crashes.generateTestCrash(fail);
    });

    createActionButton("Check if last session crashed", function () {
        MobileCenter.Crashes.hasCrashedInLastSession(function (didCrash) {
            contentEl.innerHTML = didCrash ?
                "Last session crashed" :
                "Last session didn't crash";
        }, fail);
    });

    createActionButton("Get crash report from last session", function () {
        MobileCenter.Crashes.lastSessionCrashReport(function (report) {
            if (!report) {
                contentEl.innerHTML = "No report from last session";
                return;
            }

            contentEl.innerHTML = "<small><pre>" + JSON.stringify(report, null, 2) + "</pre></small>";
        }, fail);
    });

    createActionButton("Check if enabled", function () {
        MobileCenter.Crashes.isEnabled(function (enabled) {
            contentEl.innerHTML = enabled ? "Enabled" : "Disabled";
            crashesState = enabled;
        }, fail);
    });

    function getLocalState(callback) {
        if (crashesState !== null) {
            callback(crashesState);
            return;
        }

        MobileCenter.Crashes.isEnabled(function (enabled) {
            crashesState = enabled;
            callback(enabled);
        }, fail);
    }

    createActionButton("Toggle enabled/disabled", function () {
        getLocalState(function (state) {
            MobileCenter.Crashes.setEnabled(!state, function () {
                MobileCenter.Crashes.isEnabled(function (enabled) {
                    contentEl.innerHTML = enabled ? "Enabled" : "Disabled";
                    crashesState = enabled;
                }, fail);
            }, fail);
        });
    });

    createActionButton("Process reports", function () {

        contentEl.innerHTML = "";

        function processReports(reports, send) {
            contentEl.innerHTML += "Found " + reports.length + " reports<br>";

            reports.forEach(function(report) {
                contentEl.innerHTML += "<small><pre>" +
                    JSON.stringify(report, null, 2) +
                    "</pre></small><br>";

                report.addTextAttachment("Sample text", "./tests.js");
            });

            send(true);
        }

        MobileCenter.Crashes.process(processReports, fail);
    });

    createActionButton("Bind event listeners and process reports", function () {

        contentEl.innerHTML = "";

        MobileCenter.Crashes.addEventListener("willSendCrash", function (evt) {
            contentEl.innerHTML += "Will send event " + String(evt) + "<br>";
        });

        MobileCenter.Crashes.addEventListener("didSendCrash", function (evt) {
            contentEl.innerHTML += "Sent event " + String(evt) + " successfully<br>";
        });

        MobileCenter.Crashes.addEventListener("failedSendingCrash", function (evt) {
            contentEl.innerHTML += "Failed to send event " + String(evt) + "<br>";
        });

        function processReports(reports, send) {
            contentEl.innerHTML += "Found " + reports.length + " reports<br>";
            send(true);
        }

        MobileCenter.Crashes.process(processReports, fail);
    });
};
