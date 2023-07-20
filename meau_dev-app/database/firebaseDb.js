import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD1v1d-8UQG3m1JMPP1nzYxqCrhPOjofQA",
  authDomain: "meau-dev-app.firebaseapp.com",
  projectId: "meau-dev-app",
  storageBucket: "meau-dev-app.appspot.com",
  messagingSenderId: "1057731607853",
  appId: "1:1057731607853:web:6be692328d3d523d51e7a4",
  measurementId: "G-5KJ460VHD2"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);

// export default db;
