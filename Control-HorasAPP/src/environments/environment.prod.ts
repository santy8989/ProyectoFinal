import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const environment = {
  production: true,
  firebaseConfig : {
    apiKey: "AIzaSyAOn3PzlPCqr25Vr-CSIggmAYITDmVLRpc",
    authDomain: "control-horasapp.firebaseapp.com",
    projectId: "control-horasapp",
    storageBucket: "control-horasapp.appspot.com",
    messagingSenderId: "640949412869",
    appId: "1:640949412869:web:cc9872d71ad42a10dba86c",
    measurementId: "G-CC63KFS3PH"
  },
};
const app = initializeApp(environment.firebaseConfig);
const analytics = getAnalytics(app);
