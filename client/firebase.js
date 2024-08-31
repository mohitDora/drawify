import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBDE0Ek_OjV419BAiB8iOL20gNlehuR-4U",
  authDomain: "drawify-e45d5.firebaseapp.com",
  projectId: "drawify-e45d5",
  storageBucket: "drawify-e45d5.appspot.com",
  messagingSenderId: "734128889302",
  appId: "1:734128889302:web:b603bb76064f5b1d885877"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };