Step 1: Start Metro
First, you will need to run Metro, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

# Using npm
npm start

# OR using Yarn
yarn start
Step 2: Build and run your app
With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

Android
# Using npm
npm run android

# OR using Yarn
yarn android
iOS
For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

bundle install
Then, and every time you update your native dependencies, run:

bundle exec pod install
For more information, please visit CocoaPods Getting Started guide.

# Using npm
npm run ios

# OR using Yarn
yarn ios
If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

Step 3: Modify your app
Now that you have successfully run the app, let's make changes!

Open App.tsx in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by Fast Refresh.

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

Packages Used Install these before running the project: npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/stack

npm install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context react-native-vector-icons

• FOR VECTOR ICONS: Edit android/app/build.gradle (NOT android/build.gradle) and add:
