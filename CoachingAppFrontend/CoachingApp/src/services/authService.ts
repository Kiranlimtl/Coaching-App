import { LoginRequest, RegisterRequest } from "@/type/authTypes";
import { fetchBase } from "@/utils/fetch";
import { signInWithFirebase } from "./firebaseAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";


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