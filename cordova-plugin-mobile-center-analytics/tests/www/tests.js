/*jshint jasmine: true */

module.exports.defineAutoTests = function () {
    // TODO: Add autotests
};

module.exports.defineManualTests = function (contentEl, createActionButton) {

    var analyticsState = null;
    var Analytics = MobileCenter.Analytics;

    var fail = function (err) {
        contentEl.innerHTML = err ? err.message : "";
    };

    createActionButton("Track custom event", function () {
        Analytics.trackEvent("MyEvent", { foo: "bar" })
            .then(() => contentEl.innerHTML = "Success")
            .catch(fail);
    });

    createActionButton("Check if enabled", function () {
        Analytics.isEnabled()
            .then(enabled => {
                contentEl.innerHTML = enabled ? "Enabled" : "Disabled";
                analyticsState = enabled;
            })
            .catch(fail);
    });

    function getLocalState() {
        return (analyticsState !== null) ?
            Promise.resolve(analyticsState) : Analytics.isEnabled();
    }

    createActionButton("Toggle enabled/disabled", function () {
        getLocalState()
            .then(state => Analytics.setEnabled(!state))
            .then(Analytics.isEnabled)
            .then(enabled => {
                contentEl.innerHTML = enabled ? "Enabled" : "Disabled";
                analyticsState = enabled;
            })
            .catch(fail);
    });
};
