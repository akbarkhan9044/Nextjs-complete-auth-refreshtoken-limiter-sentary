"use server"
import { signIn,signOut } from "../config/auth";
import { AuthError } from "next-auth";
export async function doSocialLogin(formData){
    const action=formData.get("action");
    await signIn(action,{redirectTo:"/"})

}


export async function credentialLogin(data){
    try{
        const cred={
            email:data.email,
            password:data.password,
            redirect:false
        }
       const response= await signIn("credentials",cred);
       if(response){

       }
       return response;
    }catch(error){
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                case 'CallbackRouteError': 
                    return { error: "Invalid credentials!" };
                default:
                    return { error: "Something went wrong." };
            }
        }
    
        // 3. CRITICAL: If it's not an AuthError, it's likely a Redirect.
        // We MUST re-throw it so Next.js can navigate the user.
        throw error;
    }

}

export async function doLogOut(formData){
    const action=formData.get("action")

    await signOut({redirectTo:"/login"})

}