
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  projectId: "resumaticai-wr94t",
  appId: "1:304882457255:web:672e3320d63ee3af201982",
  storageBucket: "resumaticai-wr94t.firebasestorage.app",
  apiKey: "AIzaSyDoHvBE6Ws2Bd17IuCUi_XDOPZJ7-nka_4",
  authDomain: "localhost",
  messagingSenderId: "304882457255",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
