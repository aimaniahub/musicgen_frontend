import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyATAerfsDcMLwnor3WWZv3qwoTE-hNGZGQ",
  authDomain: "trade-82909.firebaseapp.com",
  projectId: "trade-82909",
  storageBucket: "trade-82909.firebasestorage.app",
  messagingSenderId: "607223551968",
  appId: "1:607223551968:web:5e1d5719dbc4e33100fd85",
  measurementId: "G-HSRELPWD4F"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);