import { Alert, Linking, Platform } from 'react-native';
import { setLocalValue } from '@racket-traits/async-storage';
import InAppReview from 'react-native-in-app-review';
import config from '@racket-common/config';

const askInterval = 1000 * 60 * 6; // 5 minutes  //1000 * 60 * 60 * 24 * 7 // one week

export const rate = async () => {
  if (InAppReview.isAvailable()) return InAppReview.RequestInAppReview();

  try {
    const url = Platform.select({
      ios: `itms-apps://itunes.apple.com/us/app/id${config.APP_STORE_ID}?mt=8`,
      android: 'https://www.google.se',
    }) as string;

    const supported = await Linking.canOpenURL(url);

    supported && Linking.openURL(url);

    setLocalValue(
      'rateConfig',
      { lastAsked: 0, hasRated: false },
      ({ lastAsked }) => ({ lastAsked, hasRated: true })
    );
  } catch (error) {
    console.error(error);
  }
};

export const momentToAskToRate = () => {
  setLocalValue(
    'rateConfig',
    { lastAsked: 0, hasRated: false },
    ({ lastAsked, hasRated }) => {
      const prev = { lastAsked, hasRated };
      const now = Date.now();

      if (hasRated) return prev;
      if (now - lastAsked <= askInterval) return prev;

      Alert.alert('Rate app', '', [
        { text: 'Yes', onPress: rate },
        { text: 'No' },
      ]);
      return { lastAsked: now, hasRated };
    }
  );
};
