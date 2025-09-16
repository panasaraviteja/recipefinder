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











