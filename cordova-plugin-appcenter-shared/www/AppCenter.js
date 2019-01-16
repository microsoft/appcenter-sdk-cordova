var exec = require('cordova/exec');

var AppCenter = {
    getInstallId: function (success, error) {
        exec(success, error, "AppCenterShared", "getInstallId", []);
    },

    setUserId: function (userId, success, error) {
        exec(success, error, "AppCenterShared", "setUserId", [userId]);
    },

    setLogUrl: function (logUrl, success, error) {
        exec(success, error, "AppCenterShared", "setLogUrl", [logUrl]);
    }
};

module.exports = AppCenter;
