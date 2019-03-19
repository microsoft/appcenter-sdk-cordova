// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

declare namespace AppCenter {
    export function getInstallId(
        success: (installId: string) => void,
        error: (error: any) => void
    ): void;

    export function setUserId(
        userId: string,
        success: () => void,
        error: (error: any) => void
    ): void;
}
