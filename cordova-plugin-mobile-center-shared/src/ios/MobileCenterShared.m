#import <Cordova/NSDictionary+CordovaPreferences.h>
#import "MobileCenterShared.h"

@implementation MobileCenterShared

static NSString *appSecret;
static MSWrapperSdk * wrapperSdk;

+ (void) setAppSecret: (NSString *)secret
{
    appSecret = secret;
}

+ (NSString *) getAppSecretWithSettings: (NSDictionary*) settings
{
    if (appSecret == nil) {
        appSecret = [settings cordovaSettingForKey:@"MOBILE_CENTER_APP_SECRET"];
        // If the AppSecret is not set, we will pass nil to MSMobileCenter which will error out, as expected
    }

    return appSecret;
}

+ (void) configureWithSettings: (NSDictionary* ) settings
{
    if ([MSMobileCenter isConfigured]) {
        return;
    }

    MSWrapperSdk* wrapperSdk =
    [[MSWrapperSdk alloc]
     initWithWrapperSdkVersion:@"0.0.1"
     wrapperSdkName:@"mobilecenter.cordova"
     wrapperRuntimeVersion:nil
     liveUpdateReleaseLabel:nil
     liveUpdateDeploymentKey:nil
     liveUpdatePackageHash:nil];

    [self setWrapperSdk:wrapperSdk];
    [MSMobileCenter configureWithAppSecret:[MobileCenterShared getAppSecretWithSettings: settings]];
}

+ (MSWrapperSdk *) getWrapperSdk
{
    return wrapperSdk;
}

+ (void) setWrapperSdk:(MSWrapperSdk *)sdk
{
    wrapperSdk = sdk;
    [MSMobileCenter setWrapperSdk:sdk];
}

@end
