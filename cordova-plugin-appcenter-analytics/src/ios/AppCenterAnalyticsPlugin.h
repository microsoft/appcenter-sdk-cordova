#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>

// Implements Apache Cordova plugin for App Center Analytics
@interface AppCenterAnalyticsPlugin : CDVPlugin

- (void)pluginInitialize;

- (void)trackEvent:(CDVInvokedUrlCommand *)command;
- (void)isEnabled:(CDVInvokedUrlCommand *)command;
- (void)setEnabled:(CDVInvokedUrlCommand *)command;
@end
