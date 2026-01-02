


import { auth } from "../config/auth";
import { cacheLife } from "next/cache";


async function getProductsFromAPI(accessToken) {
    "use cache";
    cacheLife("hours");

    const response = await fetch(`${process.env.NEXT_AUTH_URL}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) throw new Error("Failed to fetch products");
    return response.json();
}


export async function fetchAllProduct() {
    try {
        // 1. Get the dynamic data (headers/cookies) OUTSIDE the cache
        const session = await auth();
        const accessToken = session?.accessToken;

        if (!accessToken) {
            return { error: "Unauthorized", status: 401 };
        }

        // 2. Pass the data INTO the cached function
        return await getProductsFromAPI(accessToken);
        
    } catch (error) {
        console.error("Fetch error:", error);
        return { error: "Failed to load products" };
    }
}