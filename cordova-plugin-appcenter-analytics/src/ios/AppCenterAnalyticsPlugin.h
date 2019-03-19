// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>

// Implements Apache Cordova plugin for App Center Analytics
@interface AppCenterAnalyticsPlugin : CDVPlugin

- (void)pluginInitialize;

- (void)trackEvent:(CDVInvokedUrlCommand *)command;
- (void)isEnabled:(CDVInvokedUrlCommand *)command;
- (void)setEnabled:(CDVInvokedUrlCommand *)command;
@end
