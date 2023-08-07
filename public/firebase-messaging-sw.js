/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/7.15.0/firebase-messaging.js'
);

firebase.initializeApp({
    apiKey: 'AIzaSyCbrxAgnXSNNoHaN7jeFr_aCruDs_Gby7Y',
    authDomain: 'chatnowapp-86d5e.firebaseapp.com',
    databaseURL: 'https://chatnowapp-86d5e-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'chatnowapp-86d5e',
    storageBucket: 'chatnowapp-86d5e.appspot.com',
    messagingSenderId: '1051947183435',
    appId: '1:1051947183435:web:d91498271eb15283f80cce',
  });

firebase.messaging();
