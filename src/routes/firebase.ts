import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCRW8tyrU8Onj_3U_iPMoY7oM-JCciS2vQ",
  authDomain: "twcc-2e270.firebaseapp.com",
  projectId: "twcc-2e270",
  storageBucket: "twcc-2e270.appspot.com",
  messagingSenderId: "239774867976",
  appId: "1:239774867976:web:04cc5203184009ee0027bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);