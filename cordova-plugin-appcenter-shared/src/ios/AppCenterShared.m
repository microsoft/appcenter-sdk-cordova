#import <Cordova/NSDictionary+CordovaPreferences.h>
#import "AppCenterShared.h"

@implementation AppCenterShared

static NSString *appSecret;
static MSWrapperSdk * wrapperSdk;

+ (void) setAppSecret: (NSString *)secret
{
    appSecret = secret;
    [MSAppCenter configureWithAppSecret:secret];
}

+ (NSString *) getAppSecretWithSettings: (NSDictionary*) settings
{
    if (appSecret == nil) {
        appSecret = [settings cordovaSettingForKey:@"APP_SECRET"];
        // If the AppSecret is not set, we will pass nil to MSAppCenter which will error out, as expected
    }

    return appSecret;
}

+ (void) configureWithSettings: (NSDictionary* ) settings
{
    if ([MSAppCenter isConfigured]) {
        return;
    }

    MSWrapperSdk* wrapperSdk =
    [[MSWrapperSdk alloc]
     initWithWrapperSdkVersion:@"0.0.1"
     wrapperSdkName:@"appcenter.cordova"
     wrapperRuntimeVersion:nil
     liveUpdateReleaseLabel:nil
     liveUpdateDeploymentKey:nil
     liveUpdatePackageHash:nil];

    [self setWrapperSdk:wrapperSdk];
    [MSAppCenter configureWithAppSecret:[AppCenterShared getAppSecretWithSettings: settings]];
}

+ (MSWrapperSdk *) getWrapperSdk
{
    return wrapperSdk;
}

+ (void) setWrapperSdk:(MSWrapperSdk *)sdk
{
    wrapperSdk = sdk;
    [MSAppCenter setWrapperSdk:sdk];
}

@end
