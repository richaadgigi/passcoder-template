// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { config } from "./config";

// Initialize Firebase
const app = initializeApp(config.firebaseConfig);
const storage = getStorage(app);

export { storage, app };