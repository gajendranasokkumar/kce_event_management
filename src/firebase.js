import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyB9gq8FwK620ZCQniutDv6ZvzZxjaBj-NM",
  authDomain: "proposalimages.firebaseapp.com",
  projectId: "proposalimages",
  storageBucket: "proposalimages.appspot.com",
  messagingSenderId: "243268124956",
  appId: "1:243268124956:web:ae07899a415acfaf7fbad9",
  measurementId: "G-PW4SH0MY78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)