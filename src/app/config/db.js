import mongoose from "mongoose";

export const connectDatabase=async()=>{
    try{
        const connection=await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected");
        console.log(connection.connection.host);
    }catch(error){
        console.log(error.message);
        console.log("Error while connecting");
    }
}