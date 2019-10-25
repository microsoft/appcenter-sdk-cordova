## Version 0.5.1 (under development)

- **[Fix]** Use exact version of the build gradle plugin in the Push module to avoid issues with unstable latest versions.

## Version 0.5.0

Changes:
- **[Behavior change]** Fix a security issue in the way native Android crashes are processed. As a result, the exception stack trace for crashes that occurred in Java code is now the raw Java stack trace and the associated exception message is now `null`.

Updated native SDK versions:
- Android from `2.3.0` to [2.4.0](https://github.com/microsoft/appcenter-sdk-android/releases/tag/2.4.0)
- iOS from `2.4.0` to [2.5.0](https://github.com/microsoft/appcenter-sdk-apple/releases/tag/2.5.0)
___

## Version 0.4.1

Updated native SDK versions:
- iOS from `2.3.0` to [2.4.0](https://github.com/microsoft/appcenter-sdk-apple/releases/tag/2.4.0)
___

## Version 0.4.0

Changes:
- **[Feature]** Catch "low memory warning" and provide the API to check if it has happened in last session:  `Crashes.hasReceivedMemoryWarningInLastSession()`.

Updated native SDK versions:
- Android from `2.2.0` to [2.3.0](https://github.com/microsoft/appcenter-sdk-android/releases/tag/2.3.0)
- iOS from `2.2.0` to [2.3.0](https://github.com/microsoft/appcenter-sdk-apple/releases/tag/2.3.0)
___

## Version 0.3.6

Changes:
- **[Bugfix]**: Removed deprecated framework tags

Updated native SDK versions:
- Android from `2.1.0` to [2.2.0](https://github.com/Microsoft/AppCenter-SDK-Android/releases/tag/2.2.0)
- iOS from `2.1.0` to [2.2.0](https://github.com/Microsoft/AppCenter-SDK-Apple/releases/tag/2.2.0)
___

## Version 0.3.5

- **[Bugfix]**: Fixed PushListener not being called from background
___

## Version 0.3.4

- Updated App Center dependencies
___

## Version 0.3.3

- Updated App Center dependencies
___

## Version 0.3.2

- Updated App Center dependencies
___

## Version 0.3.1

- Updated App Center dependencies
___

## Version 0.3.0

- **[Feature]** Allow setting userId that applies to crashes, handled errors and push logs.
- **[iOS][Breaking change]** Drop iOS 8 support. If you encounter errors during a build or the plugin installation please ensure your generated Podfile has proper target (i.e. `platform :ios, '9.0'`)
- Added declaration (d.ts) files
- Bug fixes
___

## Version 0.2.2

- Updated App Center dependencies
___

## Version 0.2.1

- Updated App Center dependencies
___

## Version 0.2.0

- Updated App Center dependencies
___

## Version 0.1.9

- Updated App Center dependencies
___

## Version 0.1.8

- Updated App Center dependencies
___

## Version 0.1.7

- Updated App Center dependencies (AppCenterPush - firebase dependency reintroduced for Android)

___

## Version 0.1.6

- Updated App Center dependencies

___

## Version 0.1.5

- Added App Center Shared js module to expose common methods
- Added method getInstallId to shared module
- Bug fixes

___

## Version 0.1.4

- Bug fixes

___

## Version 0.1.3

### Bug Fixes
- [Android][Push] fix SENDER_ID type issue #13

___

## Version 0.1.2

Initial release
