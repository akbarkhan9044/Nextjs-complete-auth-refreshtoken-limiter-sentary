import { connectDatabase } from "../config/db";
import OTP from "../model/OtoModel";
import Product from "../model/Product";
import { cacheLife } from "next/cache";
export async function getDataProductFromId(id){
    "use cache";
    cacheLife("hours");

    await connectDatabase();

    // 1. Use .lean() to get a plain JS object (required for caching)
    const product = await Product.findById(id).lean();

    if (!product) return null;

    // 2. MongoDB _id and Dates must be stringified 
    // because "use cache" requires serializable data.
    return JSON.parse(JSON.stringify(product));
}

export async function getOTPForValidation(email){
    await connectDatabase();
    const otp=OTP.findOne({email});
    if(!otp) return null;
    return  otp;

}
