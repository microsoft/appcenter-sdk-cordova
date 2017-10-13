#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>

// Implements Apache Cordova plugin for Mobile Center Push notifications
@interface MobileCenterPushPlugin : CDVPlugin

- (void)pluginInitialize;

- (void)isEnabled:(CDVInvokedUrlCommand *)command;
- (void)setEnabled:(CDVInvokedUrlCommand *)command;
- (void)sendAndClearInitialNotification:(CDVInvokedUrlCommand *)command;

@end
