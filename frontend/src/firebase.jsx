import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyA3gMhbXtmH84GaXs4sDGtw_mywelHX_cw",
  authDomain: "awt-project-cd66f.firebaseapp.com",
  projectId: "awt-project-cd66f",
  storageBucket: "awt-project-cd66f.appspot.com",
  messagingSenderId: "478626105156",
  appId: "1:478626105156:web:3c09231d143ff1ce37b911"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export {app, auth}