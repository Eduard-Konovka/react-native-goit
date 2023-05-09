import * as firebase from 'firebase';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAgix42_ERq08H4UD7GgJ_Pb28z6d7CiyQ',
  authDomain: 'freja-db.firebaseapp.com',
  projectId: 'freja-db',
  storageBucket: 'freja-db.appspot.com',
  messagingSenderId: '1010133054620',
  appId: '1:1010133054620:web:58191cebb48ef2f24fa959',
  measurementId: 'G-NDY9Z019F5',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
