import mongoose,{Schema,models,model} from "mongoose";

const otpSchema=new Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:300
    }
},{timestamps:true});



const OTP=models.OTP || model("OTP",otpSchema);
export default OTP;