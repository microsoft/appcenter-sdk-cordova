$(document).bind('pageinit', function () {

    //The code below wouldn't work for cordova yet.
    var appcenterEnabled = false;
    var DISABLED_LBL = "Enable Appcenter";
    var ENABLED_LBL = "Disable Appcenter";
    var logLevel = 2;

    var updateToggleButton = function () {
        $("#btn_toggle_appcenter").html(analyticsEnabled ? ENABLED_LBL : DISABLED_LBL);
    }

    var updateLogLevel = function () {
        $("#lbl_log_level").html("Log level: " + logLevel);
    }

    $("#apis_link").off('click').on('click', function (event, ui) {
        AppCenter.getInstallId(function (installId) {
            $("#install_id").html("Install ID: " + installId);
        });
    });
});  
