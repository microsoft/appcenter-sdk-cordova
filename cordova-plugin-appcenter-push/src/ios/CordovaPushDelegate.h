// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

#import <Foundation/Foundation.h>
#import <Cordova/CDVCommandDelegate.h>
#import "AppCenterPushPlugin.h"

@import AppCenterPush;

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
@property AppCenterPushPlugin* pushPlugin;
@end
