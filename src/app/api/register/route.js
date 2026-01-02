import { NextResponse } from "next/server";
import { connectDatabase } from "../../config/db";
import User from "../../model/User";
import bcrypt from "bcryptjs";

export const POST=async(request)=>{
    try{
        await connectDatabase();
        const {email,name,password}=await request.json();
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        await User.create({
            email,
            name,
            password:hash
        });
        return  NextResponse.redirect(process.env.NEXT_PUBLIC_LOGIN);



    }catch(error){

        return new NextResponse(error.message,{status:500})
    }
}