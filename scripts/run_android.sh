#!/bin/sh
cd apps/native

$ANDROID_HOME/platform-tools/adb reverse tcp:7007 tcp:7007 && \
  node node_modules/.bin/react-native run-android --no-jetifier --no-packager --variant localDebug --main-activity SplashActivity $REACT_NATIVE_CLI_OPTIONS "$@"
