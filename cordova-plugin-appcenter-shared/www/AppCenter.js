var exec = require('cordova/exec');

var AppCenter = {
    setAppSecret: function (appSecret, success, error) {
        exec(success, error, "AppCenterShared", "setAppSecret", [appSecret]);
    },

    getInstallId: function (success, error) {
        exec(success, error, "AppCenterShared", "getInstallId", []);
    }
};

module.exports = AppCenter;
