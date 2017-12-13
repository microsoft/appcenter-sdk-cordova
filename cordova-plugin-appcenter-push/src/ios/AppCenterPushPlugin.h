#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>

// Implements Apache Cordova plugin for App Center Push notifications
@interface AppCenterPushPlugin : CDVPlugin

- (void)pluginInitialize;

- (void)isEnabled:(CDVInvokedUrlCommand *)command;
- (void)setEnabled:(CDVInvokedUrlCommand *)command;
- (void)sendAndClearInitialNotification:(CDVInvokedUrlCommand *)command;

@end
