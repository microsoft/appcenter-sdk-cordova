declare namespace AppCenter {
    export function getInstallId(
        success: (installId: string) => void,
        error: (error: any) => void
    ): void;
}
