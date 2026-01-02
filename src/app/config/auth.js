import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials"
import User from "../model/User";
import { connectDatabase } from "./db";
export const {
    handlers,
    signIn,
    signOut,
    auth
}=NextAuth({
    session:{
        strategy:"jwt"
    },
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            authorization:{
                params:{
                    prompt:"consent",
                    access_type:"offline",
                    response_type:"code"
                }
            }
        }),

        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,    
            authorization:{
                params:{
                    prompt:"consent",
                    access_type:"offline",
                    response_type:"code"
                }
            }
        }),
        Credentials({
            async authorize (credentials){
                if(credentials === null) return null;
                try{
                    await connectDatabase();
                    const response=await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/user`,{
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json"
                        },
                        body:JSON.stringify({
                            email:credentials.email,
                            password:credentials.password
                        })
                        
                    });
                    const user=await response.json();
                    console.log(user);

                    const accessToken=user.accessToken;
                    const refreshToken=user.refreshToken;
                    const userinfo=user.userinfo;
                    if(response.ok && user){
                        return {
                            accessToken,
                            refreshToken,
                            userinfo
                        }
                    }
                }catch(error){
                    throw new Error(error);
                }
            }
        })
    ],
    callbacks:{
        jwt:async({token,user,account})=>{
            if(user){
                token.accessToken=user.accessToken,
                token.refreshToken=user.refreshToken,
                token.userinfo=user.userinfo
                token.expiresAt= Math.floor(Date.now() / 1000 + 50),
                token
            }
            if(Date.now<token.expiresAt *1000){
                return token
            }
            else{
               return  await  refreshAccessToken(token);
            }
            
            
        },
        session:async({session,token})=>{
            session.accessToken=token.accessToken,
            session.userinfo=token.userinfo
            return session;
        }
    }
})



// async function refreshAccessToken(token) {
//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/refresh`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ refreshToken: token.refreshToken }),
//       });


//       if (!response.ok) throw refreshedTokens;

//       const res=await response.json();
  
//       return {
//         ...token,
//         accessToken: res.accessToken,
//         expiresAt: Math.floor(Date.now() / 1000 + 50),
//         refreshToken:  token.refreshToken,
//         userinfo:token.userinfo
//       };
//     } catch (error) {
//         console.log(error);
//       return { ...token, error: "RefreshAccessTokenError" };
//     }
//   }


  async function refreshAccessToken(token) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: token.refreshToken }),
      });
  
      const refreshedTokens = await response.json();
  
      if (!response.ok) {
        throw refreshedTokens;
      }
  
      return {
        ...token,
        accessToken: refreshedTokens.accessToken,
        // Update the expiry based on what your backend returns
        expiresAt: Math.floor(Date.now() / 1000 + 3600), 
        // Fallback to old refresh token if the backend doesn't rotate it
        refreshToken: refreshedTokens.refreshToken ?? token.refreshToken, 
      };
    } catch (error) {
      console.error("RefreshAccessTokenError:", error);
      return {
        ...token,
        error: "RefreshAccessTokenError",
      };
    }
  }