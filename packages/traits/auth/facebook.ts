import auth from '@react-native-firebase/auth';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';

export const loginWithFacebook = async () => {
  try {
    LoginManager.setLoginBehavior('web_only');

    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) return;

    const data = await AccessToken.getCurrentAccessToken();

    if (!data) return;

    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken
    );

    return await auth().signInWithCredential(facebookCredential);
  } catch (error) {
    return;
  }
};
