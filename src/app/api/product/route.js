import { NextResponse } from "next/server";
import { connectDatabase } from "../../config/db";
import Product from "../../model/Product";
import { jwtVerify } from "jose";
import * as Sentry from "@sentry/nextjs";
const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

export const GET=async(request)=>{

    const authHeader = request.headers.get("authorization");
        const token = authHeader?.split(" ")[1];

    if(!token){
        return new NextResponse(JSON.stringify({error:"No token provided"}),{status:401});
    }

    try{
        const {payload}=await jwtVerify(token,secretKey,{
            algorithms: ["HS256"]
        });
        


        await connectDatabase();
        const response=await Product.find();
        
        Sentry.captureException("Something went wrong",{
            tags:{
                section:"fetchAllProductAPI"
            }
        })
        return new NextResponse(JSON.stringify(response),{status:200});
    }catch(error){
    
        return new NextResponse(JSON.stringify({error:error.message,detail:"Error while getting data"}),{status:404})
    }
}