var attachmentsProvider = {

    putString: function (prefKey, value) {
        localStorage.setItem(prefKey, value);
    },

    getString: function (prefKey) {
        return localStorage.getItem(prefKey);
    },

    getFileContentAsBase64: function (path, callback, fail) {
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
    }
}