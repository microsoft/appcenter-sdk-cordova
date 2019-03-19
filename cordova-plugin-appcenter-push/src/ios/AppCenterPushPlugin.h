// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>

// Implements Apache Cordova plugin for App Center Push notifications
@interface AppCenterPushPlugin : CDVPlugin

- (void)pluginInitialize;

- (void)isEnabled:(CDVInvokedUrlCommand *)command;
- (void)setEnabled:(CDVInvokedUrlCommand *)command;
- (void)sendAndClearInitialNotification:(CDVInvokedUrlCommand *)command;

@end
