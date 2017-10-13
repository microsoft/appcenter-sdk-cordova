
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
    };

    createActionButton("Check if enabled", function () {
        MobileCenter.Push.isEnabled(function (enabled) {
            contentEl.innerHTML = enabled ? "Enabled" : "Disabled";
            analyticsState = enabled;
        }, fail);
    });

    function getLocalState(callback) {
        if (analyticsState !== null) {
            callback(analyticsState);
            return;
        }

        MobileCenter.Push.isEnabled(function (enabled) {
            analyticsState = enabled;
            callback(enabled);
        }, fail);
    }

    createActionButton("Toggle enabled/disabled", function () {
        getLocalState(function (state) {
            MobileCenter.Push.setEnabled(!state, function () {
                MobileCenter.Push.isEnabled(function (enabled) {
                    contentEl.innerHTML = enabled ? "Enabled" : "Disabled";
                    analyticsState = enabled;
                }, fail);
            }, fail);
        });
    });

    createActionButton("Bind event listener", function () {
        contentEl.innerHTML = "";

        MobileCenter.Push.addEventListener("notificationReceived", function (evt) {
            contentEl.innerHTML += "<br/><small>Received <pre>" + JSON.stringify(evt, null, 4) + "</pre></small>";
        });

        contentEl.innerHTML = "Listener registered";
    });
};
