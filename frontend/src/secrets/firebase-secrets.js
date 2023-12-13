import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAnR1ZEheC7sgE5SfkAUZWHdiNaqYBvWUA",
  authDomain: "pawpalcommunity.firebaseapp.com",
  databaseURL: "https://pawpalcommunity-default-rtdb.firebaseio.com",
  projectId: "pawpalcommunity",
  storageBucket: "pawpalcommunity.appspot.com",
  messagingSenderId: "384982605464",
  appId: "1:384982605464:web:0debcd8a13d31c3cc27aed",
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);