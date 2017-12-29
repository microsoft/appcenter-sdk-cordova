$(document).bind('pageinit', function () {
    var pushEnabled = false;

    var DISABLED_LBL = "Enable Push";
    var ENABLED_LBL = "Disable Push";

    var updatePush = function() {
        $("#btn_toggle_push").html(pushEnabled ? ENABLED_LBL : DISABLED_LBL);
        //This is how you can add listener for notifications.
        if (pushEnabled) {
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
            title = 'Android background';
            message = '<empty>';
        }

        if (pushNotification.customProperties && Object.keys(pushNotification.customProperties).length > 0) {
            message += '\nCustom properties:\n' + JSON.stringify(pushNotification.customProperties);
        }

        alert("title = " + title + "; message = " + message)
    }

    //This is how you can check whether push is enabled.
    $("#push_link").off('click').on('click', function (event, ui) {
        AppCenter.Push.isEnabled(function (isEnabled) {
            pushEnabled = isEnabled;
            updatePush();
        });
    });

    //This is how you can enable/disable push.
    $("#btn_toggle_push").off('click').on('click', function (event, ui) {
        pushEnabled = !pushEnabled;
        AppCenter.Push.setEnabled(pushEnabled, updatePush, errorHandler);
    }); 
});  