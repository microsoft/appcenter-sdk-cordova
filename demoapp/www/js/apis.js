var USER_ID_KEY = "userid";
var userIdProvider = {
    put: function (value) {
        localStorage.setItem(USER_ID_KEY, value);
    },

    get: function () {
        return localStorage.getItem(USER_ID_KEY);
    }
}

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

    var updateUserId = function() {
        var userId = $("#user_id_input").val();
        userIdProvider.put(userId);
        AppCenter.setUserId(userId);
    }

    $("#apis_link").off('click').on('click', function (event, ui) {
        var userId = userIdProvider.get();
        $("#user_id_input").val(userId);
        AppCenter.getInstallId(function (installId) {
            $("#install_id").html("Install ID: " + installId);
        });
    });

    $("#user_id_input")
        .off("change")
        .off("input")
        .on("change", updateUserId)
        .on("input", updateUserId);
});  
