// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // Import the Auth service

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBw5VUTh-BuBO5JV2yfH5THomY7vXnX-v4",
  authDomain: "velecela-internal.firebaseapp.com",
  projectId: "velecela-internal",
  storageBucket: "velecela-internal.appspot.com",
  messagingSenderId: "99865457197",
  appId: "1:99865457197:web:bd7aca689c7f236ecf3ea4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
const auth = getAuth(app);
export { auth };
