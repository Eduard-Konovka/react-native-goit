import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDWjAXWOTaAw6hXkmmVqhxS-bPtq1vJbl0',
  authDomain: 'frejatech-4828a.firebaseapp.com',
  projectId: 'frejatech-4828a',
  storageBucket: 'frejatech-4828a.appspot.com',
  messagingSenderId: '346471556018',
  appId: '1:346471556018:web:2e67b1ffe629712c1efaab',
  measurementId: 'G-5ZT517PR2S',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
