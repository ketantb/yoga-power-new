// src/firebase.js
import {initializeApp} from 'firebase/app';
import { getDatabase } from 'firebase/database'; // Import the 'database' object


const firebaseConfig = {
      apiKey: "AIzaSyC-yYmzq3BT2Q7Pkgqh3d8NhwDVKYPxbsM",
      authDomain: "cuba-goa.firebaseapp.com",
      projectId: "cuba-goa",
      storageBucket: "cuba-goa.appspot.com",
      messagingSenderId: "1015733134617",
      appId: "1:1015733134617:web:6853d960f7606af7771188",
};

const firebaseApp = initializeApp(firebaseConfig);

const database = getDatabase(firebaseApp);

export { database };
