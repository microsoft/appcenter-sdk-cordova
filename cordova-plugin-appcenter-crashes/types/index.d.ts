interface Attachments {
  addTextAttachment(title: string, filename: string);
  addBinaryAttachment(base64string: string, filename: string, mimeType: string);
}

declare namespace AppCenter {
  let Crashes: {
    generateTestCrash(error?: (error: string) => void);

    hasCrashedInLastSession(
      success: () => void,
      error: (error: string) => void
    ): boolean;

    lastSessionCrashReport(
      success: (report: {}) => void,
      error: (error: string) => void
    ): void;

    isEnabled(
      success: (isEnabled: boolean) => void,
      error: (error: string) => void
    ): void;

    setEnabled(
      shouldEnable: boolean,
      success: () => void,
      error: (error: string) => void
    );

    process(
      processorFunction: (
        attachments: Attachments,
        success: (response: any) => void
      ) => void,
      errorCallback: (error: string) => void
    ): void;
  };
}
