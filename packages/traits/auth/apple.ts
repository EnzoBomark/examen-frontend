import { appleAuth } from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';

export const loginWithApple = async () => {
  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    if (!appleAuthRequestResponse.identityToken) return;

    const { identityToken, nonce } = appleAuthRequestResponse;

    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce
    );

    return await auth().signInWithCredential(appleCredential);
  } catch (error) {
    return;
  }
};
