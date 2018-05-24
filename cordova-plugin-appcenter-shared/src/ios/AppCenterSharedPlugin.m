
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

@end
