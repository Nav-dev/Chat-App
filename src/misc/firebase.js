import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyCbrxAgnXSNNoHaN7jeFr_aCruDs_Gby7Y',
  authDomain: 'chatnowapp-86d5e.firebaseapp.com',
  databaseURL: 'https://chatnowapp-86d5e-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'chatnowapp-86d5e',
  storageBucket: 'chatnowapp-86d5e.appspot.com',
  messagingSenderId: '1051947183435',
  appId: '1:1051947183435:web:d91498271eb15283f80cce',
};

// Initialize Firebase

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
