
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDoHvBE6Ws2Bd17IuCUi_XDOPZJ7-nka_4",
  authDomain: "resumaticai-wr94t.firebaseapp.com",
  projectId: "resumaticai-wr94t",
  storageBucket: "resumaticai-wr94t.firebasestorage.app",
  messagingSenderId: "304882457255",
  appId: "1:304882457255:web:672e3320d63ee3af201982"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
