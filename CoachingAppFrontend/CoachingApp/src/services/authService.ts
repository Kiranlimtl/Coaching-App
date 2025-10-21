import { LoginRequest, RegisterRequest } from "@/type/authTypes";
import { fetchBase } from "@/utils/fetch";
import AsyncStorage from "@react-native-async-storage/async-storage";


export async function login(requestData: LoginRequest): Promise<LoginRequest> {
    const response = await fetchBase("/coach/login", {
        method: "POST",
        body: requestData,
    });
    console.log(response);

    await AsyncStorage.setItem("authToken", response.token);

    return response;
}