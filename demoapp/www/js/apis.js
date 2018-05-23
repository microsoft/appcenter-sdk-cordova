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
        console.log("toggled2");
         AppCenter.setAppSecret("123", function (error) {
            console.log("toggled1");
            $("#btn_toggle_appcenter").html("eeeeeee");
        });
    });

    $("#btn_toggle_appcenter").off('click').on('click', function (event, ui) {
        console.log("toggled");
        AppCenter.getInstallId(function (success) {
            console.log(success);
            $("#btn_toggle_appcenter").html(success);
        }, function(error) {
            console.log(error);
        });
    });

});  
