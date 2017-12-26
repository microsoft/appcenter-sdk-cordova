$(document).bind('pageinit', function () {

    var listenerSet = false;
    var crashesEnabled = false;
    var DISABLED_LBL = "Enable Crashes";
    var ENABLED_LBL = "Disable Crashes";
    var crashReport = "no data";

    var text = "";
    var attachment = "";

    var getFileContentAsBase64 = function (path, callback) {
        window.resolveLocalFileSystemURL(path, gotFile, fail);

        function fail(e) {
            alert(e);
        }

        function gotFile(fileEntry) {
            fileEntry.file(function (file) {
                var reader = new FileReader();
                reader.onloadend = function (e) {
                    var content = this.result;
                    callback(content);
                };
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
                /*attachments.addTextAttachment(text, 'hello.txt');
                getFileContentAsBase64(attachment, function (base64Image) {
                    alert(attachment);
                    alert(base64Image);
                    attachments.addBinaryAttachment(base64Image, attachment, 'image/png');
                    sendCallback(true);
                });*/

                sendCallback(true);
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
    });


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

    $("#btn_crash_js").off('click').on('click', function (event, ui) {
        //for(var i = 0; i === i; i++) {}
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
