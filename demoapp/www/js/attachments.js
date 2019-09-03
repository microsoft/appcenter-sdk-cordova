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
    }
}