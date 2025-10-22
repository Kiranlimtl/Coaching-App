import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';

export async function signInWithFirebase(email: string, password: string) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken();
        return token
    } catch (error: any) {
        if (error.code === "auth/invalid-credential" || error.code === "auth/wrong-password") {
      throw new Error("Invalid email or password");
    } else if (error.code === "auth/user-not-found") {
      throw new Error("No account found with this email");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}