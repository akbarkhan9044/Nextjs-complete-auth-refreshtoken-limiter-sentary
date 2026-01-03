import { NextResponse } from "next/server";
import { connectDatabase } from "../../config/db";
import User from "../../model/User";
import bcrypt from "bcryptjs";
import { signJWT, signJWTRefresh } from "../../lib/jwt";
export const POST=async(request)=>{
    try{
        await connectDatabase();
        const {email,password}=await request.json();

        const user=await User.findOne({email});
        if(bcrypt.compareSync(password, user.password)){
           const accessToken=await signJWT({email:user.email,id:user._id});
            const refreshToken=await signJWTRefresh({
                email:user.email,
                id:user._id
            });

            console.log("Access token",accessToken);
            console.log("Refresh token",refreshToken);

            const response={
                userinfo:{
                    email:user.email,
                    name:user.name
                },
                accessToken,
                refreshToken
            }

            return new NextResponse(JSON.stringify(response),{status:200});

        }else{
            return new NextResponse("Invalid Credential",{status:500});
        }

    }catch(error){
        return new NextResponse("Invalid Credential",{status:500});
    }
}