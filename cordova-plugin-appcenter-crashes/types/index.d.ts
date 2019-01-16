interface Attachments {
  addTextAttachment(title: string, filename: string);
  addBinaryAttachment(base64string: string, filename: string, mimeType: string);
}

declare namespace AppCenter {
  let Crashes: {
    generateTestCrash(error?: (error: any) => void);

    hasCrashedInLastSession(
      success: () => void,
      error: (error: any) => void
    ): boolean;

    lastSessionCrashReport(
      success: (report: {}) => void,
      error: (error: any) => void
    ): void;

    isEnabled(
      success: (isEnabled: boolean) => void,
      error: (error: any) => void
    ): void;

    setEnabled(
      shouldEnable: boolean,
      success: () => void,
      error: (error: any) => void
    );

    process(
      processorFunction: (
        attachments: Attachments,
        success: (response: any) => void
      ) => void,
      errorCallback: (error: any) => void
    ): void;
  };
}
