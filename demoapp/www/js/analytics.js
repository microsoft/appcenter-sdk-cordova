$(document).bind('pageinit', function () {

    var analyticsEnabled = false;
    var DISABLED_LBL = "Enable";
    var ENABLED_LBL = "Disable";

    var updateToggleButton = function() {
        $("#btn_toggle_analytics").html(analyticsEnabled ? ENABLED_LBL : DISABLED_LBL);
    }

    var errorHandler = function(err) {
        alert("Something went wrong! " + err);
    }

    var defaultSuccessHandler = function() {
        alert("Event tracked!");
    }

    $("#analytics_link").off('click').on('click', function (event, ui) {
        AppCenter.Analytics.isEnabled(function (isEnabled) {
            analyticsEnabled = isEnabled;
            updateToggleButton();
        });
    });

    $("#btn_toggle_analytics").off('click').on('click', function (event, ui) {
        analyticsEnabled = !analyticsEnabled;
        AppCenter.Analytics.setEnabled(analyticsEnabled, updateToggleButton, errorHandler);
    });

    $("#btn_track_event").off('click').on('click', function (event, ui) {
        AppCenter.Analytics.trackEvent('test_event', { page: 'Analytics page' }, defaultSuccessHandler, errorHandler);
    });

    $("#btn_track_event_1").off('click').on('click',  function (event, ui) {
        AppCenter.Analytics.trackEvent('Button press', { propertyValueTooLong: '12345678901234567890123456789012345678901234567890123456789012345' }, defaultSuccessHandler, errorHandler);
    });

    $("#btn_track_event_2").off('click').on('click', function (event, ui) {
        var data = {};
        AppCenter.Analytics.trackEvent('Button press', data, defaultSuccessHandler, errorHandler);
    });
});  
