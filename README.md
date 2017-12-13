# App Center SDK for Cordova

App Center is mission control for mobile apps. Get faster release cycles, higher-quality apps, and the insights to build what users want.

The App Center SDK consists of a several plugins so you can use any or all of the following services:

1. App Center Analytics: App Center Analytics helps you understand user behavior and customer engagement to improve your app. The SDK automatically captures session count, device properties like model, OS version, etc. You can define your own custom events to measure things that matter to you. All the information captured is available in the App Center portal for you to analyze the data.

2. App Center Crashes: App Center Crashes will automatically generate a crash log every time your app crashes. The log is first written to the device's storage and when the user starts the app again, the crash report will be sent to App Center. Collecting crashes works for both beta and live apps, i.e. those submitted to the App Store. Crash logs contain valuable information for you to help fix the crash.

3. App Center Push: App Center Push enables you to send push notifications to users of your app from the App Center portal. We use APNs for iOS apps and FCM for Android. You can also segment your user base based on a set of properties and send them targeted notifications.

## Sample application

You can get familiar with SDK quickly by cloning this repository and running sample app in `sample` directory. For further instructions please refer to [sample's README](sample/README.md)

## 1. Installation

Add the App Center plugins that fit your needs directly from the Cordova CLI:

```bash
cordova plugin add cordova-plugin-appcenter-analytics
cordova plugin add cordova-plugin-appcenter-crashes
cordova plugin add cordova-plugin-appcenter-push
```

This will install all three of the plugins available today.

## 2. Link the SDK

To get it working in your app you will need to add some configuration values to your app configuration in `config.xml` file. See list of available parameters below

- `APP_SECRET` - _(required)_ App secret which enables App Center to map this app to the right user account

  Example:

  ```xml
  <platform name="android">
      <preference name="APP_SECRET" value="7a72dae0-f811-451b-8ae8-ecf7973e8359" />
  </platform>
  ```

  Notice that it's likely that Android and iOS platforms will be associated with different applications on App Center portal so you would need to add this preference twice - one for Android (as in example above) and another for iOS.

## 3. Configure Preferences
- `APPCENTER_ANALYTICS_ENABLE_IN_JS` - _(optional, default is "false")_ This preference controls whether Analytics will be enabled automatically (default option) or will require call to `Analytics.setEnabled()` in JS code before sending any usage data to App Center portal. This might be useful e.g. in case when an application may want to ask users whether they want to share analytics information.

  Example:

  ```xml
  <preference name="APPCENTER_ANALYTICS_ENABLE_IN_JS" value="true" />
  ```

- `APPCENTER_CRASHES_ALWAYS_SEND` - _(optional, default is "true")_ Specifies whether crash reports will always be sent automatically or would be available for processing in JavaScript  code. Opting to process crashes first means more work for the developer, but greater control over user privacy and allows you to attach a message with a crash report.

  Example:

  ```xml
  <preference name="APPCENTER_CRASHES_ALWAYS_SEND" value="false" />
  ```

### Push configuration

App Center Push plugin doesn't have it's own configuration preferences. Instead you will need to add Google FCM configuration for Android platform in your app. To do that simply follow the steps below:

1. Download `google-services.json` from Firebase portal to your app directory
2. Add the following snippet to Android platform section in your app's `config.xml`

    ```xml
    <resource-file src="google-services.json" target="google-services.json" />
    ```

    This will instruct Cordova to copy this file to platform directory at build time for further processing by Google Services plugin for Gradle

That's all - you've done configuring App Center Push in your app. For iOS there is no additional configuration is required.

Notice that there are still some additional actions need to be done on portal to connect App Center Push services to push providers.

# Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
