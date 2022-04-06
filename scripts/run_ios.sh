#!/bin/sh

cd apps/mobile

if [ -z "$REACT_NATIVE_CLI_OPTIONS" ]; then
  ./node_modules/.bin/react-native run-ios --no-packager --simulator="iPhone 12" $@
else
  ./node_modules/.bin/react-native run-ios --no-packager --simulator="iPhone 12" "$REACT_NATIVE_CLI_OPTIONS" $@
fi
