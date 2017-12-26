$(document).bind('pageinit', function () {

    var pushEnabled = false;

    var DISABLED_LBL = "Enable Push";
    var ENABLED_LBL = "Disable Push";

    var updatePush = function() {
        $("#btn_toggle_push").html(pushEnabled ? ENABLED_LBL : DISABLED_LBL);
        if(pushEnabled) {
            AppCenter.Push.addEventListener('notificationReceived', onNotificationReceived); 
        } else {
            AppCenter.Push.removeEventListener('notificationReceived', onNotificationReceived); 
        }
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

        alert("title = " + title + "; message = " + message)
    }

    $("#push_link").off('click').on('click', function (event, ui) {
        AppCenter.Push.isEnabled(function (isEnabled) {
            pushEnabled = isEnabled;
            updatePush();
        });
    });

    $("#btn_toggle_push").off('click').on('click', function (event, ui) {
        pushEnabled = !pushEnabled;
        AppCenter.Push.setEnabled(pushEnabled, updatePush, errorHandler);
    }); 
});  