# Sample application

This is a sample application that demonstrates some of capabilities of App Center for Cordova

To run application and test those capabilities please follow the instructions below:

1.  Configure Application Secrets for bot iOS and Android

    In `config.xml` find `APP_SECRET` preference for both iOS and Android platforms and set it's value to application secret as displayed in App Center portal

2.  Change other plugins preferences if required

    Change `APPCENTER_ANALYTICS_ENABLE_IN_JS` and `APPCENTER_CRASHES_ALWAYS_SEND` values if you want. By default application is configured to not send analytics automatically to demonstrate/test scenario with programmatic switching App Center Analytics functionality on and off; Crashes plugin is also configured to process crashes in JS rather than send them automatically to demonstrate crashes processing and reports events handling.

3.  Configure Google FCM

    Download `google-services.json` from Firebase portal and put it near `config.xml` to enable receiving push notifications on Android and then find and uncomment the following section in `config.xml`:

    ```xml
    <!-- <resource-file src="google-services.json" target="google-services.json" /> -->
    ```

    For iOS no additional configuration is required.

4.  Install dependencies

    Run `npm install` in console to install Cordova CLI locally

5.  Run app on Android/iOS

    In console type `npm run android` or `npm run ios` to launch application on either Android of iOS device or emulator. The command will run application on device if connected or start an emulator and launch app on emulator.

    _Hint_: If you want to pass some additional arguments to underlying `cordova` command, add them after double dash `--`, for example to run application on iPhone 7 simulator use `npm run ios -- --target=iPhone-7`
