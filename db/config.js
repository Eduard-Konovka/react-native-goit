import { initializeApp } from 'firebase/app';
import { initializeAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { initializeFirestore } from 'firebase/firestore';

import { getReactNativePersistence } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBI5tbmeqaQtD3vb6QVb0I23qvSxC2pvjE',
  authDomain: 'frejatech-6cacc.firebaseapp.com',
  projectId: 'frejatech-6cacc',
  storageBucket: 'frejatech-6cacc.appspot.com',
  messagingSenderId: '1097155039757',
  appId: '1:1097155039757:web:7e678fc9935fe70ed17b44',
  measurementId: 'G-DP55W31FR3',
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const storage = getStorage(app);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
