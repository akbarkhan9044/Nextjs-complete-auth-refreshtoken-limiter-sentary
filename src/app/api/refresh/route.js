import { NextResponse } from "next/server";
import { connectDatabase } from "../../config/db";
import { jwtVerify } from "jose";
import User from "../../model/User";
import { signJWT } from "../../lib/jwt";
const secretKey = new TextEncoder().encode(process.env.REFRESH);


export  const  POST=async(request)=>{
    try{
const data= await request.json();
const {refreshToken}=data;

        if(!refreshToken){
            return new NextResponse(JSON.stringify({error:"No Token provided"},{status:400}));

        }

        const decode=await jwtVerify(refreshToken,secretKey,{
            algorithms: ["HS256"]
        })

        if(!decode){
            return NextResponse(JSON.stringify({message:"Unauthorized"},{status:401}));
        }
        await connectDatabase();

        const user=await User.findOne({email:decode.payload.email});
        const accessToken=await signJWT({email:user.email,id:user._id});
        let datas= { 
            userinfo:{
            email:user.email,
            name:user.name
        },
        accessToken,
        refreshToken
    }
        return new NextResponse(JSON.stringify(datas),{status:201})
    }catch(error){
    
        return new NextResponse(JSON.stringify({error:"Error while refresh"}),{status:500})
    }
}