interface ErrorHandler {
  (error: string): void;
}
interface SuccessHandler {
  (): void;
}

declare namespace AppCenter {
  let Analytics: {
    trackEvent(
      eventName: string,
      properties: {},
      success: SuccessHandler,
      error: ErrorHandler
    ): void;

    isEnabled(success: SuccessHandler, error: ErrorHandler): void;

    setEnabled(
      enabled: boolean,
      success: SuccessHandler,
      error: ErrorHandler
    ): void;
  };
}
