const firebase = require('firebase/app')
require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");

const firebaseConfig = {
    apiKey: "AIzaSyClXQnyjJiwZk87gwkhFaSFJqO8gfujBcw",
    authDomain: "login-con-providers-y-storage.firebaseapp.com",
    databaseURL: "https://login-con-providers-y-storage.firebaseio.com",
    projectId: "login-con-providers-y-storage",
    storageBucket: "login-con-providers-y-storage.appspot.com",
    messagingSenderId: "117636394754",
    appId: "1:117636394754:web:0f309e8008aea58702dc1b",
    measurementId: "G-NJCB85CMT5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {firebase, db, auth, storage}