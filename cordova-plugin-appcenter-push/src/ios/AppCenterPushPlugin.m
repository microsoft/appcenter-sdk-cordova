
#import <Cordova/NSDictionary+CordovaPreferences.h>
#import "CordovaPushDelegate.h"
#import "PushUtils.h"
#import "AppCenterPushPlugin.h"
#import "AppCenterShared.h"

@import AppCenterPush;

@implementation AppCenterPushPlugin

static id<CordovaPushDelegate> pushDelegate;

- (void)pluginInitialize
{
    [AppCenterShared configureWithSettings:self.commandDelegate.settings];
    pushDelegate = [[CordovaPushDelegateBase alloc] init];
    [MSPush setDelegate:pushDelegate];
    [MSAppCenter startService:[MSPush class]];
}

- (void)isEnabled:(CDVInvokedUrlCommand *)command
{
    CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                                  messageAsBool:[MSPush isEnabled]];

    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}

- (void)setEnabled:(CDVInvokedUrlCommand *)command
{
    BOOL shouldEnable = [[command argumentAtIndex:0] boolValue];
    [MSPush setEnabled:shouldEnable];

    CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}

- (void)sendAndClearInitialNotification:(CDVInvokedUrlCommand *)command
{
    [pushDelegate sendAndClearInitialNotification];
    CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}

- (void)registerEventsCallback:(CDVInvokedUrlCommand *)command
{
    [pushDelegate setEventsCallbackChannelForPlugin:self callbackId:command.callbackId];
}

@end
