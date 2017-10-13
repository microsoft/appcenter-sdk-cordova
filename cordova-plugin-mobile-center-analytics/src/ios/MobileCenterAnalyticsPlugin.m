
#import <Cordova/NSDictionary+CordovaPreferences.h>

#import "MobileCenterAnalyticsPlugin.h"
#import "MobileCenterShared.h"

@import MobileCenterAnalytics;

@implementation MobileCenterAnalyticsPlugin

- (void)pluginInitialize
{
    [MobileCenterShared configureWithSettings: self.commandDelegate.settings];
    [MSMobileCenter startService:[MSAnalytics class]];

    BOOL enableInJs = [self.commandDelegate.settings
                       cordovaBoolSettingForKey:@"MOBILE_CENTER_ANALYTICS_ENABLE_IN_JS"
                       defaultValue:NO];

    if (enableInJs) {
        // Avoid starting an analytics session.
        // Note that we don't call this if startEnabled is true, because
        // that causes a session to try and start before MSAnalytics is started.
        [MSAnalytics setEnabled:false];
    }

    //[MSAnalytics setAutoPageTrackingEnabled:false]; // TODO: once the underlying SDK supports this, make sure to call this
}

- (void)isEnabled:(CDVInvokedUrlCommand *)command
{
    BOOL isEnabled = [MSAnalytics isEnabled];
    CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                                  messageAsBool:isEnabled];

    [self.commandDelegate sendPluginResult:result
                                callbackId:command.callbackId];
}

- (void)setEnabled:(CDVInvokedUrlCommand *)command
{
    BOOL shouldEnable = [[command argumentAtIndex:0] boolValue];
    [MSAnalytics setEnabled:shouldEnable];

    CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:result
                                callbackId:command.callbackId];
}

- (void)trackEvent:(CDVInvokedUrlCommand *)command
{
    NSString* eventName = [[command argumentAtIndex:0] stringValue];
    NSDictionary* properties = [command argumentAtIndex:1];

    [MSAnalytics trackEvent:eventName withProperties:properties];

    CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:result
                                callbackId:command.callbackId];
}

/*
// TODO: once the underlying SDK supports this
- (void)trackEvent:(CDVInvokedUrlCommand *)command
{
    NSString pageName = [command argumentAtIndex:0];
    NSDictionary properties = [command argumentAtIndex:1];

    [MSAnalytics trackPage:pageName withProperties:properties];

    [self.commandDelegate sendPluginResult:CDVCommandStatus_OK
                                callbackId:command.callbackId];
}
*/

@end
