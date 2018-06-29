
#import <Cordova/NSDictionary+CordovaPreferences.h>
#import "CordovaCrashesDelegate.h"
#import "CrashesUtils.h"
#import "AppCenterCrashesPlugin.h"
#import "AppCenterShared.h"

@import AppCenterCrashes;

@implementation AppCenterCrashesPlugin

static id<CordovaCrashesDelegate> crashDelegate;
// iOS crash processing has a half second delay https://github.com/Microsoft/AppCenter-SDK-iOS/blob/develop/AppCenterCrashes/AppCenterCrashes/MSCrashes.m#L296
static BOOL crashProcessingDelayFinished = NO;

- (void)pluginInitialize
{
    BOOL sendAutomatically = [self.commandDelegate.settings
                              cordovaBoolSettingForKey:@"APPCENTER_CRASHES_ALWAYS_SEND"
                              defaultValue:YES];

    [AppCenterShared configureWithSettings:self.commandDelegate.settings];

    CordovaCrashesDelegateBase* delegate = sendAutomatically ?
            [[CordovaCrashesDelegateAlwaysSend alloc] init] :
            [[CordovaCrashesDelegateBase alloc] init];

    [MSCrashes setDelegate:delegate];
    crashDelegate = delegate;

    [MSCrashes setUserConfirmationHandler:[delegate shouldAwaitUserConfirmationHandler]];
    [MSAppCenter startService:[MSCrashes class]];

    [self.class performSelector:@selector(crashProcessingDelayDidFinish) withObject:nil afterDelay:0.5];
}

+ (void)crashProcessingDelayDidFinish
{
    crashProcessingDelayFinished = YES;
}

- (void) lastSessionCrashReport: (CDVInvokedUrlCommand *)command
{
    dispatch_async(dispatch_get_main_queue(), ^void() {
        MSErrorReport *report = [MSCrashes lastSessionCrashReport];
        CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                                messageAsDictionary:convertReportToJS(report)];

        [self.commandDelegate sendPluginResult:result
                                    callbackId:command.callbackId];
    });
}

- (void) hasCrashedInLastSession: (CDVInvokedUrlCommand *)command
{
    dispatch_async(dispatch_get_main_queue(), ^void() {
        MSErrorReport *report = [MSCrashes lastSessionCrashReport];
        BOOL crashed = report != nil;

        CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:crashed];

        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    });
}

- (void) getCrashReports: (CDVInvokedUrlCommand *) command
{
    void (^fetchCrashReports)() = ^void() {
        CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                                messageAsArray:convertReportsToJS([crashDelegate getAndClearReports])];

        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    };

    if (crashProcessingDelayFinished){
        fetchCrashReports();
    } else {
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, NSEC_PER_SEC /2), dispatch_get_main_queue(), fetchCrashReports);
    }
}

- (void)isEnabled:(CDVInvokedUrlCommand *)command
{
    CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                                  messageAsBool:[MSCrashes isEnabled]];

    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}

- (void)setEnabled:(CDVInvokedUrlCommand *)command
{
    BOOL shouldEnable = [[command argumentAtIndex:0] boolValue];
    [MSCrashes setEnabled:shouldEnable];

    CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}

- (void)generateTestCrash:(CDVInvokedUrlCommand *)command
{
    [MSCrashes generateTestCrash];
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR]
                                callbackId:command.callbackId];
}

- (void)crashUserResponse:(CDVInvokedUrlCommand *)command
{
    BOOL doSend = [command argumentAtIndex:0];
    MSUserConfirmation response = doSend ? MSUserConfirmationSend : MSUserConfirmationDontSend;

    if ([crashDelegate respondsToSelector:@selector(reportUserResponse:)]) {
        [crashDelegate reportUserResponse:response];
    }

    NSDictionary* attachments = [command argumentAtIndex:1];
    [crashDelegate provideAttachments:attachments];
    [MSCrashes notifyWithUserConfirmation:response];

    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK]
                                callbackId:command.callbackId];
}

- (void)registerEventsCallback:(CDVInvokedUrlCommand *)command
{
    [crashDelegate setEventsCallbackChannelForPlugin:self callbackId:command.callbackId];
}

@end
