$(document).bind('pageinit', function () {

    var pushEnabled = false;

    var DISABLED_LBL = "Enable";
    var ENABLED_LBL = "Disable";

    var updateToggleButton = function() {
        $("#btn_toggle_push").html(pushEnabled ? ENABLED_LBL : DISABLED_LBL);
    }

    var errorHandler = function(err) {
        alert("Something went wrong! " + err);
    }

    var onNotificationReceived = function(pushNotification) {
        var message = pushNotification.message;
        var title = pushNotification.title;

        if (message === null || message === undefined) {
            // Android messages received in the background don't include a message. On Android, that fact can be used to
            // check if the message was received in the background or foreground. For iOS the message is always present.
            title = 'Android background';
            message = '<empty>';
        }

        // Custom name/value pairs set in the App Center web portal are in customProperties
        if (pushNotification.customProperties && Object.keys(pushNotification.customProperties).length > 0) {
            message += '\nCustom properties:\n' + JSON.stringify(pushNotification.customProperties);
        }

        alert(title, message)
    }

    $("#push_link").off('click').on('click', function (event, ui) {
        AppCenter.Push.isEnabled(function (isEnabled) {
            pushEnabled = isEnabled;
            updateToggleButton();
        });
    });

    $("#btn_toggle_push").off('click').on('click', function (event, ui) {
        pushEnabled = !pushEnabled;
        var success = function() {
            updateToggleButton();
            if(pushEnabled) {
                AppCenter.Push.addEventListener('notificationReceived', onNotificationReceived); 
            } else {
                AppCenter.Push.removeEventListener('notificationReceived', onNotificationReceived); 
            }
        }
        AppCenter.Push.setEnabled(pushEnabled, success, errorHandler);
    }); 
});  