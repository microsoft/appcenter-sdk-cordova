// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.


#import <Cordova/NSDictionary+CordovaPreferences.h>
#import "AppCenterShared.h"
#import "AppCenterSharedPlugin.h"

@import AppCenter;

@implementation AppCenterSharedPlugin

- (void)pluginInitialize
{
  
}

- (void)getInstallId:(CDVInvokedUrlCommand *)command
{
    CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                                  messageAsString:[[MSAppCenter installId] UUIDString]];

    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}

- (void)setUserId:(CDVInvokedUrlCommand *)command
{
    NSString* userId = [command argumentAtIndex:0 withDefault:nil andClass:[NSString class]];
    [MSAppCenter setUserId:userId];
    
    CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:result
                                callbackId:command.callbackId];
}

@end
