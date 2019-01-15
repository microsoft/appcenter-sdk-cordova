declare namespace AppCenter {
  let Analytics: {
    trackEvent(
      eventName: string,
      properties: {},
      success: () => void,
      error: (error: string) => void
    ): void;

    isEnabled(success: () => void, error: (error: string) => void): void;

    setEnabled(
      enabled: boolean,
      success: () => void,
      error: (error: string) => void
    ): void;
  };
}
