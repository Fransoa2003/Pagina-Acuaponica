import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        mongoose.connect('mongodb://127.0.0.1/sora');
        console.log("DB esta conectado");
    }
    catch(error){
        console.log(error)
    }
}