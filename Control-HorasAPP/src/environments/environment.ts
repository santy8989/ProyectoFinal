import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyAOn3PzlPCqr25Vr-CSIggmAYITDmVLRpc",
    authDomain: "control-horasapp.firebaseapp.com",
    projectId: "control-horasapp",
    storageBucket: "control-horasapp.appspot.com",
    messagingSenderId: "640949412869",
    appId: "1:640949412869:web:cc9872d71ad42a10dba86c",
    measurementId: "G-CC63KFS3PH"
  }
};
const app = initializeApp(environment.firebaseConfig);
const analytics = getAnalytics(app);

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
