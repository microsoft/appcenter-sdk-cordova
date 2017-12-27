$(document).bind('pageinit', function () {

    var listenerSet = false;
    var crashesEnabled = false;
    var DISABLED_LBL = "Enable Crashes";
    var ENABLED_LBL = "Disable Crashes";
    var crashReport = "no data";

    var text = "";
    var attachment = "";



    var updateToggleButton = function () {
        $("#btn_toggle_crashes").html(crashesEnabled ? ENABLED_LBL : DISABLED_LBL);
    }

    var errorHandler = function (err) {
        alert("Something went wrong! " + err);
    }

    var updateToggleButton = function () {
        $("#btn_toggle_crashes").html(crashesEnabled ? ENABLED_LBL : DISABLED_LBL);
    }

    var updateCrashReport = function () {
        $("#crash_report").html("Crashed: " + JSON.stringify(crashReport, null, 4));
    }

    $("#crashes_link").off('click').on('click', function (event, ui) {
        AppCenter.Crashes.isEnabled(function (isEnabled) {
            crashesEnabled = isEnabled;
            updateToggleButton();
        });
        text = attachmentsProvider.getString("text");
        attachment = attachmentsProvider.getString("binary");
        updateAttachment();
        AppCenter.Crashes.hasCrashedInLastSession(function (crashed) {
            if (crashed) {
                $.mobile.changePage("#myDialog", { role: "dialog" });
                AppCenter.Crashes.lastSessionCrashReport(
                    function (data) {
                        crashReport = data;
                        updateCrashReport();
                    }
                );
            }
        });
        if (!listenerSet) {
            var errorCallback = function (error) {
                alert(error);
            };
    
            var processFunction = function (attachments, sendCallback) {
                var hideStatus = function() {
                    setTimeout(() => {                
                        $("#sending_status").hide();
                    }, 1000);
                }
                if (attachments.length > 0) {
                    $("#sending_status").show();
                }
                var textSavedValue = attachmentsProvider.getString("text");
                if (textSavedValue != null && textSavedValue.length > 0) {
                    for (var i = 0; i < attachments.length; i++) {
                        attachments[i].addTextAttachment(textSavedValue, "hello.txt");
                    }
                }
    
                var attachmentSavedValue = attachmentsProvider.getString("binary");
                if (attachmentSavedValue != null && attachmentSavedValue.length > 0) {
                    attachmentsProvider.getFileContentAsBase64(attachmentSavedValue, function (base64Content) {
                        for (var i = 0; i < attachments.length; i++) {
                            attachments[i].addBinaryAttachment(base64Content, attachmentSavedValue, 'image/png');
                        }
                        sendCallback(true);
                        hideStatus();
                    }, function () {
                        sendCallback(true);
                        hideStatus();
                        alert("Something went wrong and attachments not set.");
                    });
                } else {
                    sendCallback(true);
                    hideStatus();
                }
            };
    
            AppCenter.Crashes.process(processFunction, errorCallback);
        }
    })

    $("#btn_toggle_crashes").off('click').on('click', function (event, ui) {
        crashesEnabled = !crashesEnabled;
        AppCenter.Crashes.setEnabled(crashesEnabled, updateToggleButton, errorHandler);
    });

    var updateAttachment = function () {
        $('#text_attachment_value').html("Current value: " + text);
        $('#file_attachment_value').html("Current value: " + attachment);
    };

    $("#text_attachment").off('input').on('input', function (event, ui) {
        text = $("#text_attachment").val();
        attachmentsProvider.putString("text", $("#text_attachment").val());
        updateAttachment();
    });

    $("#btn_crash_native").off('click').on('click', function (event, ui) {
        AppCenter.Crashes.generateTestCrash();
    });

    $("#btn_attachment_img").off('click').on('click', function (event, ui) {
        var setOptions = function(srcType) {
            var options = {
                // Some common settings are 20, 50, and 100
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI,
                // In this app, dynamically set the picture source, Camera or photo gallery
                sourceType: srcType,
                encodingType: Camera.EncodingType.PNG,
                mediaType: Camera.MediaType.PICTURE,
                allowEdit: true,
                correctOrientation: true  //Corrects Android orientation quirks
            }
            return options;
        }
        var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
        var options = setOptions(srcType);
    
        navigator.camera.getPicture(function cameraSuccess(imageUri) {
    
            if (!imageUri.length) {
                return;
            }

            attachment = imageUri;
            attachmentsProvider.putString("binary", attachment);
            updateAttachment();
    
        }, function cameraError(error) {
           alert("Unable to obtain picture: " + error);
    
        }, options);
    });
});  
