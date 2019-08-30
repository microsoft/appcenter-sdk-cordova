// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

$(document).bind('pageinit', function () {
    var listenerSet = false;
    var crashesEnabled = false;
    var DISABLED_LBL = "Enable Crashes";
    var ENABLED_LBL = "Disable Crashes";
    var crashReport = "no data";

    // This can be reexucuted and overwrite the data so make sure to look at the current value.
    var textAttachment = attachmentsProvider.getString(attachmentsProvider.TEXT_KEY);
    var binaryAttachment = attachmentsProvider.getString(attachmentsProvider.BINARY_KEY);

    var updateToggleButton = function () {
        $("#btn_toggle_crashes").text(crashesEnabled ? ENABLED_LBL : DISABLED_LBL);
    }

    var errorHandler = function (err) {
        alert("Something went wrong! " + err);
    }

    var updateToggleButton = function () {
        $("#btn_toggle_crashes").text(crashesEnabled ? ENABLED_LBL : DISABLED_LBL);
    }

    var updateCrashReport = function () {
        $("#crash_report").html("Crashed: " +  "<small><pre>" + JSON.stringify(crashReport, null, 2) + "</pre></small>");
    }

    var updateLowMemoryLabel = function (crashed) {
        $("#memory_warning_lbl").html(`Received low memory warning in last session: <b>${crashed ? "YES" : "NO"}</b>`);
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
        textAttachment = attachmentsProvider.getString(attachmentsProvider.TEXT_KEY);
        binaryAttachment = attachmentsProvider.getString(attachmentsProvider.BINARY_KEY);
        updateAttachmentUI();
        AppCenter.Crashes.hasReceivedMemoryWarningInLastSession(function (crashed) {
            updateLowMemoryLabel(crashed);
        });
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

            var processFunction = function (errorReports, sendCallback) {
                if (errorReports.length > 0) {
                    showStatus();
                }
                var textSavedValue = attachmentsProvider.getString(attachmentsProvider.TEXT_KEY);
                if (textSavedValue != null && textSavedValue.length > 0) {
                    for (var i = 0; i < errorReports.length; i++) {
                        //This is how you can send a text value along with the crash.
                        errorReports[i].addTextAttachment(textSavedValue, "hello.txt");
                    }
                }

                var attachmentSavedValue = attachmentsProvider.getString(attachmentsProvider.BINARY_KEY);
                if (attachmentSavedValue != null && attachmentSavedValue.length > 0) {
                    for (var i = 0; i < errorReports.length; i++) {
                        //This is how you can send an image (f. e.) along with the crash.
                        errorReports[i].addBinaryAttachment(attachmentSavedValue, "image.png", 'image/png');
                    }
                }
                
                sendCallback(true);
                hideStatus();
            };

            AppCenter.Crashes.process(processFunction, errorCallback);
        }
    })

    //This is how you can enable/disable crashes.
    $("#btn_toggle_crashes").off('click').on('click', function (event, ui) {
        crashesEnabled = !crashesEnabled;
        AppCenter.Crashes.setEnabled(crashesEnabled, updateToggleButton, errorHandler);
    });

    $("#btn_memory_warning").off('click').on('click', function (event, ui) {
        LowMemory.generateLowMemory();
    });

    var updateAttachmentUI = function () {
        $('#text_attachment_value').text("Current value: " + textAttachment);
        var imageDesc = null;
        if (typeof(binaryAttachment) === "string") {
            imageDesc = "Image";
        }
        $('#file_attachment_value').text("Current value: " + imageDesc);
    };

    $("#text_attachment").off('input').on('input', function (event, ui) {
        textAttachment = $("#text_attachment").val();
        attachmentsProvider.putString(attachmentsProvider.TEXT_KEY, textAttachment);
        updateAttachmentUI();
    });

    //This is the code that generates test crash in a native code.
    $("#btn_crash_native").off('click').on('click', function (event, ui) {
        AppCenter.Crashes.generateTestCrash();
    });

    $("#btn_attachment_img").off('click').on('click', function (event, ui) {
        var setOptions = function (srcType) {
            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
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
            binaryAttachment = imageUri;
            attachmentsProvider.putString(attachmentsProvider.BINARY_KEY, binaryAttachment);
            updateAttachmentUI();
        }, function cameraError() {
            binaryAttachment = null;
            attachmentsProvider.putString(attachmentsProvider.BINARY_KEY, binaryAttachment);
            updateAttachmentUI();
        }, options);
    });
});  
