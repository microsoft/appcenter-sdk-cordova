#import <Foundation/Foundation.h>
#import "CordovaPushDelegate.h"
#import "PushUtils.h"

static NSString *ON_PUSH_NOTIFICATION_RECEIVED_EVENT = @"notificationReceived";

@implementation CordovaPushDelegateBase

- (instancetype) init
{
    self.saveInitialNotification = true;
    self.initialNotification = nil;
    return self;
}

- (void)push:(MSPush *)push didReceivePushNotification:(MSPushNotification *)pushNotification
{
    // If saveInitialNotification is true, assume we've just been launched and save the first notification we receive.
    // This handles the scenario that when the user taps on a background notification to launch the app, the launch notification
    // gets sent to this native callback before the JS callback has a chance to register. So we need to save that notification off,
    // then send it when the JS callback regsters & stop saving notifications after
    if (self.saveInitialNotification && self.initialNotification == nil) {
        self.initialNotification = convertNotificationToJS(pushNotification);
        return;
    }

    [self sendCordovaEventWithBody:convertNotificationToJS(pushNotification)];
}

- (void) sendCordovaEventWithBody: (NSDictionary*) body
{
    NSDictionary* event = @{@"type": ON_PUSH_NOTIFICATION_RECEIVED_EVENT, @"body": body};
    CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                            messageAsDictionary:event];

    [result setKeepCallbackAsBool:YES];
    [self.pushPlugin.commandDelegate sendPluginResult:result callbackId:self.eventsCallbackId];
}

- (void) sendAndClearInitialNotification
{
    if (self.initialNotification) {
        [self sendCordovaEventWithBody:self.initialNotification];
        self.initialNotification = nil;
    }
    self.saveInitialNotification = false;
}

- (void) setEventsCallbackChannelForPlugin: (AppCenterPushPlugin*) plugin
                                callbackId: (NSString*) id
{
    self.pushPlugin = plugin;
    self.eventsCallbackId = id;
}

@end
