import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBQgSJy9Df_XJE3ZXj64kUtheFfi2yHGwA",
    authDomain: "localhost",
    projectId: "tidy-home-319707",
    storageBucket: "tidy-home-319707.appspot.com",
    messagingSenderId: "453086581998",
    appId: "1:453086581998:web:3ea70be3ef02c5bb124fff",
    measurementId: "${config.measurementId}"
};

const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);