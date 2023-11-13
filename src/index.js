
// import App from './App'
import 'react-app-polyfill/stable'
import 'core-js'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import store from './store'
import { HashRouter } from 'react-router-dom'
import { initializeApp} from "firebase/app";
import 'react-toastify/dist/ReactToastify.css';
const firebaseConfig = {
  // apiKey: "AIzaSyDJvzaEbE1dAg22tfnpdk0TnO92m8I1kug",
  // authDomain: "uploadingfile-cb68e.firebaseapp.com",
  // projectId: "uploadingfile-cb68e",
  // storageBucket: "uploadingfile-cb68e.appspot.com",
  // messagingSenderId: "877657240307",
  // appId: "1:877657240307:web:1dfc6f15a2bc1ccaccbd86"

apiKey: "AIzaSyC-yYmzq3BT2Q7Pkgqh3d8NhwDVKYPxbsM",
authDomain: "cuba-goa.firebaseapp.com",
projectId: "cuba-goa",
storageBucket: "cuba-goa.appspot.com",
messagingSenderId: "1015733134617",
appId: "1:1015733134617:web:6853d960f7606af7771188",
//   measurementId: "G-DL3673EFZF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


createRoot(document.getElementById('root')).render(
  <HashRouter>
  <Provider store={store}>
    <App />
  </Provider>
  </HashRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
