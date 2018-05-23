var exec = require('cordova/exec');

var AppCenter = {
    setAppSecret: function (appSecret, error) {
        exec(null, error, "AppCenterShared", "setAppSecret", [appSecret]);
    },

    getInstallId: function (success, error) {
        exec(success, error, "AppCenterShared", "getInstallId", []);
    }
};

module.exports = AppCenter;
