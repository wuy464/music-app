import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAZN8ziBNd74BOSQua7NHOQVj0c5QcajuE",
  authDomain: "musicapp-87ecd.firebaseapp.com",
  projectId: "musicapp-87ecd",
  storageBucket: "musicapp-87ecd.appspot.com",
  messagingSenderId: "915932418041",
  appId: "1:915932418041:web:add66a777124ace7daf728",
  measurementId: "G-Z1DG775BBT",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };
