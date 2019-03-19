// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/*jshint jasmine: true */

module.exports.defineAutoTests = function () {
    // TODO: Add autotests
};

module.exports.defineManualTests = function (contentEl, createActionButton) {

    var analyticsState = null;

    var fail = function (err) {
        contentEl.innerHTML = err ? err.message : "";
    }

    createActionButton("Track custom event", function () {
        AppCenter.Analytics.trackEvent("MyEvent", {
            foo: "bar"
        }, function () {
            contentEl.innerHTML = "Success";
        }, fail);
    });

    createActionButton("Check if enabled", function () {
        AppCenter.Analytics.isEnabled(function (enabled) {
            contentEl.innerHTML = enabled ? "Enabled" : "Disabled";
            analyticsState = enabled;
        }, fail);
    });

    function getLocalState(callback) {
        if (analyticsState !== null) {
            callback(analyticsState);
            return;
        }

        AppCenter.Analytics.isEnabled(function (enabled) {
            analyticsState = enabled;
            callback(enabled);
        }, fail);
    }

    createActionButton("Toggle enabled/disabled", function () {
        getLocalState(function (state) {
            AppCenter.Analytics.setEnabled(!state, function () {
                AppCenter.Analytics.isEnabled(function (enabled) {
                    contentEl.innerHTML = enabled ? "Enabled" : "Disabled";
                    analyticsState = enabled;
                }, fail);
            }, fail);
        })

    });
};
