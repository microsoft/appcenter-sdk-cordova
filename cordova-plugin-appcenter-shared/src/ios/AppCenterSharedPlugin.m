
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

- (void)setAppSecret:(CDVInvokedUrlCommand *)command
{
    NSString* appSecret = [command argumentAtIndex:0 withDefault:nil andClass:[NSString class]];
    [AppCenterShared setAppSecret:appSecret];

    CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}

@end
