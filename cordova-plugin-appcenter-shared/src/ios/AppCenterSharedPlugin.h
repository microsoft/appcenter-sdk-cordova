#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>

@interface AppCenterSharedPlugin : CDVPlugin

- (void)pluginInitialize;
- (void)getInstallId:(CDVInvokedUrlCommand *)command;

@end
