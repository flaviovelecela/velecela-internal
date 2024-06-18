import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // Import the Auth module

const firebaseConfig = {
  apiKey: "AIzaSyBw5VUTh-BuBO5JV2yfH5THomY7vXnX-v4",
  authDomain: "velecela-internal.firebaseapp.com",
  projectId: "velecela-internal",
  storageBucket: "velecela-internal.appspot.com",
  messagingSenderId: "99865457197",
  appId: "1:99865457197:web:bd7aca689c7f236ecf3ea4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // Initialize Firebase Authentication

export { auth };