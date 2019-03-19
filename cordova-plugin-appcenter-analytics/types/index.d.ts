// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

declare namespace AppCenter {
    let Analytics: {
        trackEvent(
            eventName: string,
            properties: {},
            success: () => void,
            error: (error: any) => void
        ): void;

        isEnabled(
            success: (isEnabled: boolean) => void,
            error: (error: any) => void
        ): void;

        setEnabled(
            enabled: boolean,
            success: () => void,
            error: (error: any) => void
        ): void;
    };
}
