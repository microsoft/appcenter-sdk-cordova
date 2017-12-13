#import <Foundation/Foundation.h>

@import MobileCenter;

@interface MobileCenterShared : NSObject

+ (void) setAppSecret: (NSString *)secret;

+ (NSString *) getAppSecretWithSettings: (NSDictionary*) settings;

+ (void) configureWithSettings: (NSDictionary* ) settings;

+ (MSWrapperSdk *) getWrapperSdk;
+ (void) setWrapperSdk:(MSWrapperSdk *)sdk;

@end
