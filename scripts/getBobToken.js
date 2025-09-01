// getToken.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config()

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

signInWithEmailAndPassword(auth, "bob@example.com", "Password123")
  .then(async (userCredential) => {
    console.log("loggin in")
    const token = await userCredential.user.getIdToken();
    const bearerToken = `Bearer ${token}`
    fs.writeFileSync("scripts/bobToken.txt", bearerToken)
    console.log("Token written to bobToken.txt.txt");
  })
  .catch(console.error);
