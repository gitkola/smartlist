import {initializeApp, getApps, getApp} from 'firebase/app';
import {initializeAuth, getAuth, Auth} from 'firebase/auth';
import {getDatabase} from 'firebase/database';
import Config from 'react-native-config';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {getReactNativePersistence} from '../utils/getReactNativePersistance';

const firebaseConfig = {
  apiKey: Config.FIREBASE_API_KEY,
  authDomain: Config.FIREBASE_AUTH_DOMAIN,
  projectId: Config.FIREBASE_PROJECT_ID,
  storageBucket: Config.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Config.FIREBASE_MESSAGING_SENDER_ID,
  appId: Config.FIREBASE_APP_ID,
};

let app;

export let auth: Auth;

if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
  } catch (error) {
    console.log('Error initializing app: ' + error);
  }
} else {
  app = getApp();
  auth = getAuth(app);
}

export const db = getDatabase(app, Config.FIREBASE_DATABASE_URL);
export default app;
