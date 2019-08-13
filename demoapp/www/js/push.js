// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

var pushEnabled = false;

document.addEventListener("deviceready", onDeviceReady, false);

function onNotificationReceived(pushNotification) {
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

function updateNotificationListener(isEnabled) {

    // This is how you can add listener for notifications.
    if (isEnabled) {
        AppCenter.Push.addEventListener('notificationReceived', onNotificationReceived); 
    } else {
        AppCenter.Push.removeEventListener('notificationReceived', onNotificationReceived); 
    }
}

function onDeviceReady() {

    // This is how you can check whether push is enabled.
    AppCenter.Push.isEnabled(function (isEnabled) {
        updateNotificationListener(isEnabled);
    });
}

$(document).bind('pageinit', function () {
    
    var DISABLED_LBL = "Enable Push";
    var ENABLED_LBL = "Disable Push";

    var updatePush = function() {
        $("#btn_toggle_push").html(pushEnabled ? ENABLED_LBL : DISABLED_LBL);
        updateNotificationListener(pushEnabled);
    }

    var errorHandler = function(err) {
        alert("Something went wrong! " + err);
    }

    $("#push_link").off('click').on('click', function (event, ui) {
        updatePush();
    });

    $("#btn_toggle_push").off('click').on('click', function (event, ui) {
        pushEnabled = !pushEnabled;

        //This is how you can enable/disable push.
        AppCenter.Push.setEnabled(pushEnabled, updatePush, errorHandler);
    }); 
});  
