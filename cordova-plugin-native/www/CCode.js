/*global cordova, module*/

module.exports = {
    generateLowMemory: function (input, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "CCodePlugin", "generateLowMemory");
    }
};
