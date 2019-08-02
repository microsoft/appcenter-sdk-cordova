module.exports = {
    generateLowMemory: function (successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "LowMemory", "generateLowMemory");
    }
};