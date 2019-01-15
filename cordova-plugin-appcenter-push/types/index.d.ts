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
            listener: (pushNotification: any) => void
        ): void;

        removeEventListener(
            eventname: string,
            listener: (pushNotification: any) => void
        ): void;
    };
}
