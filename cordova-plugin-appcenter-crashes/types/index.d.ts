interface ErrorHandler {
  (error: string): void;
}
interface SuccessHandler {
  (): void;
}

interface ReportHandler {
  (report: {}): void;
}

interface CrashUserResponseHandler {
  (response: any): void;
}

interface Attachments {
  addTextAttachment(title: string, filename: string);
  addBinaryAttachment(base64string: string, filename: string, mimeType: string);
}

interface ProcessorHandler {
  (attachments: Attachments, success: CrashUserResponseHandler): void;
}

declare namespace AppCenter {
  let Crashes: {
    generateTestCrash(error?: ErrorHandler);

    hasCrashedInLastSession(
      success: SuccessHandler,
      error: ErrorHandler
    ): boolean;

    lastSessionCrashReport(success: ReportHandler, error: ErrorHandler): void;

    isEnabled(success: (isEnabled: boolean) => void, error: ErrorHandler): void;

    setEnabled(
      shouldEnable: boolean,
      success: SuccessHandler,
      error: ErrorHandler
    );

    process(
      processorFunction: ProcessorHandler,
      errorCallback: ErrorHandler
    ): void;
  };
}
