import { Category } from "@/types";

const getCategories = async (storeId: string): Promise<Category[]> => {
  try {
    const res = await fetch(`http://localhost:3000/api/${storeId}/categories`, {
      cache: "no-cache",
    });

    // Handle non-OK responses
    if (!res.ok) {
      let errorText = await res.text();

      // Handle HTML/plaintext error responses
      if (
        errorText.startsWith("<!DOCTYPE html>") ||
        errorText.includes("<html")
      ) {
        errorText = "Server returned HTML error page";
      }

      console.error(`Failed to fetch categories: ${res.status} - ${errorText}`);
      return []; // Return empty array instead of throwing
    }

    return await res.json();
  } catch (error) {
    console.error("Network error in getCategories:", error);
    return []; // Return empty array on network errors
  }
};

export default getCategories;
