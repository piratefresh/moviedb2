import firebase from "firebase/app";
import keys from "../config/dev";
import "firebase/auth";
import "firebase/database";

const prodConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

const devConfig = {
  apiKey: keys.apiKey,
  authDomain: keys.authDomain,
  databaseURL: keys.databaseURL,
  projectId: keys.projectId,
  storageBucket: keys.storageBucket,
  messagingSenderId: keys.messagingSenderId
};

const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const db = firebase.database();
export const auth = firebase.auth();
