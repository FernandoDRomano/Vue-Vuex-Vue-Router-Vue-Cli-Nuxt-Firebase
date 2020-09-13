import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBDVKJppDzEcKi9LnYQ2Yb0vi2gmztg0q4",
    authDomain: "crud-basico-con-vuex-vuerouter.firebaseapp.com",
    databaseURL: "https://crud-basico-con-vuex-vuerouter.firebaseio.com",
    projectId: "crud-basico-con-vuex-vuerouter",
    storageBucket: "crud-basico-con-vuex-vuerouter.appspot.com",
    messagingSenderId: "640296882579",
    appId: "1:640296882579:web:5a7ce6fa5813a307791866",
    measurementId: "G-MH8C5XLSDK"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
