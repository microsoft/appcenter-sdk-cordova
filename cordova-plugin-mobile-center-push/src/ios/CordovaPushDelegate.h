#import <Foundation/Foundation.h>
#import <Cordova/CDVCommandDelegate.h>
#import "MobileCenterPushPlugin.h"

@import MobileCenterPush;

@class RNPush;

@protocol CordovaPushDelegate <MSPushDelegate>

@required
- (void) sendAndClearInitialNotification;
- (void) setEventsCallbackChannelForPlugin: (CDVPlugin *) plugin callbackId: (NSString*) id;
@end

@interface CordovaPushDelegateBase : NSObject<CordovaPushDelegate>
@property BOOL saveInitialNotification;
@property NSDictionary* initialNotification;
@property NSString* eventsCallbackId;
@property MobileCenterPushPlugin* crashesPlugin;
@end
