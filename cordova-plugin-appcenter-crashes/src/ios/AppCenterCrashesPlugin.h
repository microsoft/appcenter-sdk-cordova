// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>

// Implements Apache Cordova plugin for App Center Crashes
@interface AppCenterCrashesPlugin : CDVPlugin

- (void)pluginInitialize;

+ (void)crashProcessingDelayDidFinish;

- (void) lastSessionCrashReport: (CDVInvokedUrlCommand *)command;
- (void) hasCrashedInLastSession: (CDVInvokedUrlCommand *)command;
- (void) hasReceivedMemoryWarningInLastSession: (CDVInvokedUrlCommand *)command;
- (void) getCrashReports: (CDVInvokedUrlCommand *) command;
- (void)isEnabled:(CDVInvokedUrlCommand *)command;
- (void)setEnabled:(CDVInvokedUrlCommand *)command;
- (void)generateTestCrash:(CDVInvokedUrlCommand *)command;
- (void)crashUserResponse:(CDVInvokedUrlCommand *)command;
- (void)registerEventsCallback:(CDVInvokedUrlCommand *)command;

@end
