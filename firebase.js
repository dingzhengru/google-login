import firebase from 'firebase'

const firebaseConfig = {
    apiKey: 'AIzaSyAnHjYD0htUcgKgq6qiHnKwqA7wcaZsLSM',
    authDomain: 'login-af40a.firebaseapp.com',
    databaseURL: 'https://login-af40a.firebaseio.com',
    projectId: 'login-af40a',
    storageBucket: 'login-af40a.appspot.com',
    messagingSenderId: '362329142534',
    appId: '1:362329142534:web:cd3dbac8b63d1a0f211a87'
};
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();


export { db }