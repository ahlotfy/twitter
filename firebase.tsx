import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCO6veaaQQHs7axwlecxodmbsTQCZ6QWKo",
  authDomain: "twitter-d6d51.firebaseapp.com",
  projectId: "twitter-d6d51",
  storageBucket: "twitter-d6d51.appspot.com",
  messagingSenderId: "342359333919",
  appId: "1:342359333919:web:f0df5ad986d90a64f2c92a",
};
const app = initializeApp(firebaseConfig);
const auth: any = getAuth(app);
const db: any = getFirestore(app);
const storage: any = getStorage(app);
export { auth, db, storage };
