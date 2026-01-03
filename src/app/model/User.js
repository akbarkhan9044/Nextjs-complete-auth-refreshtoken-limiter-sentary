import mongoose, { Schema, model, models } from "mongoose";


const userSchema=await Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
},{timestamps:true});


const User=models.User || model("User",userSchema);
export default User;