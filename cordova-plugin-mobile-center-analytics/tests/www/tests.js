
// Copyright (c) Microsoft Open Technologies, Inc.  All rights reserved.  Licensed under the Apache License, Version 2.0.  See License.txt in the project root for license information.

/*jshint jasmine: true */

module.exports.defineAutoTests = function () {
    // TODO: Add autotests
};

module.exports.defineManualTests = function (contentEl, createActionButton) {

    var context;
    var analyticsState = null;

    var fail = function (err) {
        contentEl.innerHTML = err ? err.message : "";
    }

    createActionButton("Track custom event", function () {
        MobileCenter.Analytics.trackEvent("MyEvent", {
            foo: "bar"
        }, function () {
            contentEl.innerHTML = "Success";
        }, fail);
    });

    createActionButton("Check if enabled", function () {
        MobileCenter.Analytics.isEnabled(function (enabled) {
            contentEl.innerHTML = enabled ? "Enabled" : "Disabled";
            analyticsState = enabled;
        }, fail);
    });

    function getLocalState(callback) {
        if (analyticsState !== null) {
            callback(analyticsState);
            return;
        }

        MobileCenter.Analytics.isEnabled(function (enabled) {
            analyticsState = enabled;
            callback(enabled);
        }, fail);
    }

    createActionButton("Toggle enabled/disabled", function () {
        getLocalState(function (state) {
            MobileCenter.Analytics.setEnabled(!state, function () {
                MobileCenter.Analytics.isEnabled(function (enabled) {
                    contentEl.innerHTML = enabled ? "Enabled" : "Disabled";
                    analyticsState = enabled;
                }, fail);
            }, fail);
        })

    });
};
