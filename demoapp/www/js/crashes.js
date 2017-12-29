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
        $("#crash_report").html("Crashed: " +  "<small><pre>" + JSON.stringify(crashReport, null, 2) + "</pre></small>");
    }
    
    var hideStatus = function () {
        setTimeout(function () {
            $("#sending_status").hide();
        }, 1000); 
    }

    var showStatus = function() {
        $("#sending_status").show();
    }

    $("#crashes_link").off('click').on('click', function (event, ui) {
        //This is how you can check whether crashes are enabled.
        AppCenter.Crashes.isEnabled(function (isEnabled) {
            crashesEnabled = isEnabled;
            updateToggleButton();
        });
        text = attachmentsProvider.getString("text");
        attachment = attachmentsProvider.getString("binary");
        updateAttachment();

        //This is how you can check whether there was a crash in last session.
        AppCenter.Crashes.hasCrashedInLastSession(function (crashed) {
            if (crashed) {
                $.mobile.changePage("#myDialog", { role: "dialog" });

                //This is how you can retrieve last crash report.
                AppCenter.Crashes.lastSessionCrashReport(
                    function (data) {
                        crashReport = data;
                        updateCrashReport();
                    }
                );
            }
        });
        if (!listenerSet) {
            //This is how you can set crash listener function.
            var errorCallback = function (error) {
                alert(error);
            };

            var processFunction = function (attachments, sendCallback) {
                if (attachments.length > 0) {
                    showStatus();
                }
                var textSavedValue = attachmentsProvider.getString(attachmentsProvider.TEXT_KEY);
                if (textSavedValue != null && textSavedValue.length > 0) {
                    for (var i = 0; i < attachments.length; i++) {
                        //This is how you can send a text value along with the crash.
                        attachments[i].addTextAttachment(textSavedValue, "hello.txt");
                    }
                }

                var attachmentSavedValue = attachmentsProvider.getString(attachmentsProvider.BINARY_KEY);
                if (attachmentSavedValue != null && attachmentSavedValue.length > 0) {
                    attachmentsProvider.getFileContentAsBase64(attachmentSavedValue, function (base64Content) {
                        for (var i = 0; i < attachments.length; i++) {
                            //This is how you can send an image (f. e.) along with the crash.
                            attachments[i].addBinaryAttachment(base64Content, attachmentSavedValue, 'image/png');
                        }
                        sendCallback(true);
                        hideStatus();
                    }, function (e) {
                        sendCallback(true);
                        hideStatus();
                        alert(e + "Something went wrong and attachments not set.");
                    });
                } else {
                    sendCallback(true);
                    hideStatus();
                }
            };

            AppCenter.Crashes.process(processFunction, errorCallback);
        }
    })

    //This is how you can enable/disable crashes.
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
        attachmentsProvider.putString(attachmentsProvider.TEXT_KEY, $("#text_attachment").val());
        updateAttachment();
    });

    //This is the code that generates test crash in a native code.
    $("#btn_crash_native").off('click').on('click', function (event, ui) {
        AppCenter.Crashes.generateTestCrash();
    });

    $("#btn_attachment_img").off('click').on('click', function (event, ui) {
        var setOptions = function (srcType) {
            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: srcType,
                encodingType: Camera.EncodingType.PNG,
                mediaType: Camera.MediaType.PICTURE,
                allowEdit: true,
                correctOrientation: true
            }
            return options;
        }
        var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
        var options = setOptions(srcType);
        navigator.camera.getPicture(function cameraSuccess(imageUri) {
            if (!imageUri.length) {
                return;
            }
            var index = imageUri.lastIndexOf("?");
            attachment = imageUri.substr(0, index);
            attachmentsProvider.putString(attachmentsProvider.BINARY_KEY, attachment);
            updateAttachment();
        }, function cameraError(error) {
            alert("Unable to obtain picture: " + error);
        }, options);
    });
});  
