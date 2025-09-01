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

signInWithEmailAndPassword(auth, "alice@example.com", "Password123")
  .then(async (userCredential) => {
    console.log("loggin in")
    const token = await userCredential.user.getIdToken();
    const bearerToken = `Bearer ${token}`
    fs.writeFileSync("scripts/aliceToken.txt", bearerToken)
    console.log("Token written to aliceToken.txt");
  })
  .catch(console.error);
