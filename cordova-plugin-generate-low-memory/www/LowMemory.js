// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

module.exports = {
    generateLowMemory: function (successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "LowMemory", "generateLowMemory");
    }
};