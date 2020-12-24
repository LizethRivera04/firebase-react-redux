import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAlLSoesc7L_loIg01j6Ero_pA4QpQY7uA",
    authDomain: "my-react-7b910.firebaseapp.com",
    projectId: "my-react-7b910",
    storageBucket: "my-react-7b910.appspot.com",
    messagingSenderId: "685885294446",
    appId: "1:685885294446:web:9fa1752843b1402925e37f"
};

firebase.initializeApp(firebaseConfig);

//referencia a DB
const db = firebase.firestore();

//auth provider de Google
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

//exportar db, provider y firebase
export {
    db,
    googleAuthProvider,
    firebase
}