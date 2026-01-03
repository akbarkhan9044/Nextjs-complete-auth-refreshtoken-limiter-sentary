


import { auth } from "../config/auth";
import { cacheLife } from "next/cache";
import { Logger } from "./logger";

async function getProductsFromAPI(accessToken,user="") {
    "use cache";
    cacheLife("minutes");

    const response = await fetch(`${process.env.NEXT_AUTH_URL}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) throw new Error("Failed to fetch products");
    Logger.debug("fetchAllProduct",{message:"User got the product",user:user})
    return response.json();
}


export async function fetchAllProduct() {
    try {
        // 1. Get the dynamic data (headers/cookies) OUTSIDE the cache
        const session = await auth();
        console.log("Session",session);
        const accessToken = session?.accessToken;
        Logger.debug("fetchAllProduct",{message:"Accessing token",user:session.userinfo.email})
        if (!accessToken) {
            return { error: "Unauthorized", status: 401 };
        }
 
        // 2. Pass the data INTO the cached function
        return await getProductsFromAPI(accessToken,session.userinfo.email);
        
    } catch (error) {

        Logger.error("Error while fetching product data",error);
       
        console.error("Fetch error:", error);
        return { error: "Failed to load products" };
    }
}