import mongoose from "mongoose";

// const SERVER_MONGODB = "mongodb+srv://<user>:<password>@clusterprincipal.6vkmynp.mongodb.net/<nombre_bd>";
const SERVER_MONGODB = "mongodb+srv://esp_data:alhDkyk9xlfQ8UL2@clusterprincipal.6vkmynp.mongodb.net/sora";

export const connectDB = async () => {
    try{
        mongoose.connect(SERVER_MONGODB);
        console.log("DB esta conectado");
    }
    catch(error){
        console.log(error)
    }
}