// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>

@interface AppCenterSharedPlugin : CDVPlugin

- (void)pluginInitialize;
- (void)getInstallId:(CDVInvokedUrlCommand *)command;
- (void)setUserId:(CDVInvokedUrlCommand *)command;

@end
