import api from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalStoreName } from '@root/shared/enums/local-store.enum';
// import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
GoogleSignin.configure({
    // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    webClientId: '135139072266-5l2ab382n6b2lqcl3d8k5cim23ft5ad8', // client ID of type WEB for your server (needed to verify user ID and offline access)
    // offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    // hostedDomain: '', // specifies a hosted domain restriction
    // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    // accountName: '', // [Android] specifies an account name on the device that should be used
    // iosClientId: '135139072266-bf2nfmh2ntanodig67fuqi9qt909154n.apps.googleusercontent.com', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    // googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
    // openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
    // profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});

export const firebaseService = {
    signInWithGoogle: async () => {
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();
            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            const rs = await auth().signInWithCredential(googleCredential);
            return rs;
        } catch (err) {
            throw 'Fail at Google Login';
        }
    },
    getToken: async (user: FirebaseAuthTypes.User) => {
        try {
            const rs = await user.getIdToken();
            await AsyncStorage.setItem(LocalStoreName.TOKEN, rs);
            return rs;
        } catch (err) {
            throw 'Get Token fail';
        }
    },
    signOut: async () => {
        try {
            const rs = await auth().signOut();
            AsyncStorage.getAllKeys().then((keys) => AsyncStorage.multiRemove(keys));
            return rs;
        } catch (err) {
            throw 'Fail at sign out';
        }
    },
    // signInWithFacebookAndroid: async () => {
    //     const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    //     if (result.isCancelled) {
    //       throw 'User cancelled the login process';
    //     }

    //     // Once signed in, get the users AccesToken
    //     const data = await AccessToken.getCurrentAccessToken();

    //     if (!data) {
    //       throw 'Something went wrong obtaining access token';
    //     }

    //     // Create a Firebase credential with the AccessToken
    //     const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

    //     // Sign-in the user with the credential
    //     return auth().signInWithCredential(facebookCredential);
    // }
};
