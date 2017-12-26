$(document).bind('pageinit', function () {

    var listenerSet = false;
    var crashesEnabled = false;
    var DISABLED_LBL = "Enable Crashes";
    var ENABLED_LBL = "Disable Crashes";
    var crashReport = "no data";

    var text = "";
    var attachment = "";

    var getFileContentAsBase64 = function (path, callback, fail) {
        window.resolveLocalFileSystemURL(path, gotFile, fail);

        function gotFile(fileEntry) {
            fileEntry.file(function (file) {
                var reader = new FileReader();
                reader.onloadend = function (e) {
                    var content = this.result;
                    callback(content);
                };
                reader.onerror = function (e) {
                    fail();
                }
                // The most important point, use the readAsDatURL Method from the file plugin
                reader.readAsDataURL(file);
            });
        }
    };

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
        if (!listenerSet) {
            var errorCallback = function (error) {
                alert(error);
            };

            var processFunction = function (attachments, sendCallback) {
                //TO DO Is this working?

                if (text.length() > 0) {
                    attachments.addTextAttachment(text, 'hello.txt');
                }
                if (attachment.length() > 0) {
                    getFileContentAsBase64(attachment, function (base64Image) {
                        attachments.addBinaryAttachment(base64Image, attachment, 'image/png');
                        sendCallback(true);
                    }, function () {
                        sendCallback(true);
                        alert("Something went wrong and attachments not set.");
                    });
                } else {
                    sendCallback(true);
                }
            };

            AppCenter.Crashes.process(processFunction, errorCallback);
        }

        AppCenter.Crashes.hasCrashedInLastSession(function (crashed) {
            if (crashed) {
                AppCenter.Crashes.lastSessionCrashReport(
                    function (data) {
                        crashReport = data;
                        updateCrashReport();
                    }
                );
            }
        });
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
        updateAttachment();
    });

    $("#btn_crash_native").off('click').on('click', function (event, ui) {
        AppCenter.Crashes.generateTestCrash();
    });

    $("#btn_attachment_img").off('click').on('click', function (event, ui) {
        window.OurCodeWorld.Filebrowser.filePicker.single({
            success: function (data) {
                if (!data.length) {
                    return;
                }

                attachment = data[0];
                updateAttachment();
            },

            error: function (err) {
                alert(err);
            }
        });
    });
});  
