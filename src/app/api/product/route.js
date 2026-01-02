import { NextResponse } from "next/server";
import { connectDatabase } from "../../config/db";
import Product from "../../model/Product";
import { jwtVerify } from "jose";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

export const GET=async(request)=>{
    console.log("Product get call");
    const authHeader = request.headers.get("authorization");
        const token = authHeader?.split(" ")[1];
        console.log("Token",token);
    if(!token){
        return new NextResponse(JSON.stringify({error:"No token provided"}),{status:401});
    }
    console.log("==============");
    try{
        const {payload}=await jwtVerify(token,secretKey,{
            algorithms: ["HS256"]
        });
        
        console.log("Payload ",payload);


        await connectDatabase();
        const response=await Product.find();
        console.log("=======================");
        console.log("Schema",Product);
        console.log("=====================");
        console.log("Product Response",response);
       
        return new NextResponse(JSON.stringify(response),{status:200});
    }catch(error){
        return new NextResponse(JSON.stringify({error:error.message,detail:"Error while getting data"}),{status:404})
    }
}