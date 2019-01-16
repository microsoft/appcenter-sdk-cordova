#import <Foundation/Foundation.h>

@import AppCenter;

@interface AppCenterShared : NSObject

+ (void) setAppSecret: (NSString *)secret;

+ (void) setUserId: (NSString *)userId;

+ (NSString *) getAppSecretWithSettings: (NSDictionary*) settings;

+ (void) configureWithSettings: (NSDictionary* ) settings;

+ (MSWrapperSdk *) getWrapperSdk;
+ (void) setWrapperSdk:(MSWrapperSdk *)sdk;

@end
