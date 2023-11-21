import { getApp, getApps, initializeApp, deleteApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';


const firebaseConfig = {
    apiKey: "AIzaSyDaepqYnaB3PpkBOm9EJfl4PEPq5noAxBk",
    authDomain: "saas-translator-yt.firebaseapp.com",
    projectId: "saas-translator-yt",
    storageBucket: "saas-translator-yt.appspot.com",
    messagingSenderId: "42958048398",
    appId: "1:42958048398:web:1de4118b9524b45a968ddf"
};

// Your web app's Firebase configuration
const firebaseConfig_env = {
    apiKey: process.env.FIREBASE_CONFIG_API_KEY,
    authDomain: process.env.FIREBASE_CONFIG_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_CONFIG_PROJECT_ID,
    storageBucket: process.env.FIREBASE_CONFIG_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_CONFIG_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_CONFIG_APP_ID
};


// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);
const functions = getFunctions(app);

export { db, auth, functions };


