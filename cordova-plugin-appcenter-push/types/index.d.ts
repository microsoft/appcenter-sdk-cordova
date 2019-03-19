// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

declare namespace AppCenter {
    let Push: {
        isEnabled(
            success: (result: boolean) => void,
            error: (error: any) => void
        ): void;

        setEnabled(
            enabled: boolean, success: () => void,
            error: (error: any) => void
        ): void;

        addEventListener(
            eventname: string,
            listener: (pushNotification: { message: string, title: string, customProperties: {} }) => void
        ): void;

        removeEventListener(
            eventname: string,
            listener: (pushNotification: { message: string, title: string, customProperties: {} }) => void
        ): void;
    };
}
