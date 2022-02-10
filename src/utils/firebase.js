import { getDatabase, ref, set} from "firebase/database";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"
import * as auth from 'firebase/auth';

const firebaseConfig = {
    apiKey:"AIzaSyBMLQyIeO1X-zX2lFH_0ZcsV4HogGZmCSU",
    appId:"1:954797325440:web:2e15ece5bf4bbb5ef37a65",
    storageBucket:"valentines-matchmaker-5b935.appspot.com",
    projectId:"valentines-matchmaker-5b935",
    authDomain:"valentines-matchmaker-5b935.firebaseapp.com",
    messagingSenderId:"954797325440",
    measurementId:"G-FX5TNTQBYN",
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const storage = getStorage(app);

export {database, storage, auth }