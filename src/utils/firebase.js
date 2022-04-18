import { getDatabase, ref, set} from "firebase/database";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"
import * as auth from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.apiKey,
    appId: process.env.appId,
    storageBucket: process.env.storageBucket,
    projectId: process.env.projectId,
    authDomain: process.env.authDomain,
    messagingSenderId: process.env.messagingSenderId,
    measurementId: process.env.measurementId,
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const storage = getStorage(app);

export {database, storage, auth}