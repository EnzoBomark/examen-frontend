import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const loginWithGoogle = async () => {
  GoogleSignin.configure({
    webClientId:
      '142163053657-m3dcebi0n765urrb9nj81g0t5og4196r.apps.googleusercontent.com',
  });

  try {
    const data = await GoogleSignin.signIn();

    if (!data) return;

    const googleCredential = auth.GoogleAuthProvider.credential(data.idToken);

    return await auth().signInWithCredential(googleCredential);
  } catch (error) {
    return;
  }
};
