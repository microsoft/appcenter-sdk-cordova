// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

var attachmentsProvider = {
    BINARY_KEY: "binary",
    TEXT_KEY: "text",

    putString: function (prefKey, value) {
        if (value !== null && value !== undefined) {
            localStorage.setItem(prefKey, value);
        } else {
            localStorage.removeItem(prefKey);
        }
    },

    getString: function (prefKey) {
        return localStorage.getItem(prefKey);
    },

    getFileContentAsBase64: function (path, callback, fail) {
        window.resolveLocalFileSystemURL(path, gotFile, fail);
        function gotFile(fileEntry) {
            fileEntry.file(function (file) {
                var reader = new FileReader();

                reader.onload = function (readerEvt) {
                    var binaryString = readerEvt.target.result;
                    callback(btoa(binaryString));
                };
                reader.onerror = function (e) {
                    fail(e);
                }

                reader.readAsBinaryString(file);
            });
        }
    }
}