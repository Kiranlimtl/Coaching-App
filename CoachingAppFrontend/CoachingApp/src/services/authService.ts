import { LoginRequest, RegisterRequest, ProfileDetails } from "@/type/authTypes";
import { fetchBase, fetchWithAuth } from "@/utils/fetch";
import { signInWithFirebase, registerWithFirebase } from "./firebaseAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth } from "firebase/auth";


export async function login(requestData: LoginRequest): Promise<LoginRequest> {
    console.log("Login request data:", requestData);

    const token = await signInWithFirebase(requestData.email, requestData.password);

    console.log("Firebase token:", token);

    const response = await fetchBase("/coach/login", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    console.log(response);

    await AsyncStorage.setItem("authToken", token);

    return response;
}

export async function register(requestData: RegisterRequest): Promise<RegisterRequest> {
    console.log("Register request data:", requestData);

    const cred = await registerWithFirebase(requestData.email, requestData.password);
    console.log("Firebase token:", cred);

    const { uid, token } = cred;

    if (!uid) {
        throw new Error("FireBase UID not found after registration");
    }
    const response = await fetchBase("/coach/register", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: { email: requestData.email, firebaseUid: uid },
    });
    console.log(response);

    await AsyncStorage.setItem("authToken", token);

    return response;
}   

export async function createProfileDetails(requestData: ProfileDetails): Promise<any> {
    console.log("Create proifle data:", requestData)
    const response = await fetchWithAuth("/coach/me", {
        method: "PATCH",
        body: requestData,
    });
    console.log("Profile creation response:", response);
    return response;
}
