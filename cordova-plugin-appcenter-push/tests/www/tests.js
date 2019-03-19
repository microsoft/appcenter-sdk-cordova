// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/*jshint jasmine: true */

module.exports.defineAutoTests = function () {
    // TODO: Add autotests
};

module.exports.defineManualTests = function (contentEl, createActionButton) {

    var pushState = null;

    var fail = function (err) {
        contentEl.innerHTML = err ? err.message : "";
    };

    createActionButton("Check if enabled", function () {
        AppCenter.Push.isEnabled(function (enabled) {
            contentEl.innerHTML = enabled ? "Enabled" : "Disabled";
            pushState = enabled;
        }, fail);
    });

    function getLocalState(callback) {
        if (pushState !== null) {
            callback(pushState);
            return;
        }

        AppCenter.Push.isEnabled(function (enabled) {
            pushState = enabled;
            callback(enabled);
        }, fail);
    }

    createActionButton("Toggle enabled/disabled", function () {
        getLocalState(function (state) {
            AppCenter.Push.setEnabled(!state, function () {
                AppCenter.Push.isEnabled(function (enabled) {
                    contentEl.innerHTML = enabled ? "Enabled" : "Disabled";
                    pushState = enabled;
                }, fail);
            }, fail);
        });
    });

    createActionButton("Bind event listener", function () {
        contentEl.innerHTML = "";

        AppCenter.Push.addEventListener("notificationReceived", function (evt) {
            contentEl.innerHTML += "<br/><small>Received <pre>" + JSON.stringify(evt, null, 4) + "</pre></small>";
        });

        contentEl.innerHTML = "Listener registered";
    });
};
