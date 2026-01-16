import { fetchWithAuth } from "@/utils/fetch";
import { Class , ClassListDisplay } from "@/type/classTypes";

export async function getClassListItems(): Promise<ClassListDisplay[]> {
    console.log("Fetching class list items from:", `${process.env.EXPO_PUBLIC_BACKEND_BASE_URL}/class/list-item`);
    try {
            const data = await fetchWithAuth(`/class/list-item`);

        if (data && Array.isArray(data.classesAsListItem)) {
            return data.classesAsListItem;
        }
        console.log(data);
        console.error("Invalid data format received:", data);
        return [];
    } catch (error) {
        console.error("Error fetching class list items:", error);   
        throw error;
    }

}

export async function getClasses(): Promise<Class> {
    const response = await fetchWithAuth(`${process.env.EXPO_PUBLIC_BACKEND_BASE_URL}/class`);

    if (!response.ok) {
        throw new Error("Failed to fetch classes");
    } 
    const data: Class = await response.json();
    return data;
}
