import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose"
export default async  function connectDB(){
    try {
        await  mongoose.connect(process.env.DB_CONNECT)
        console.log("Connected successfully.")
    } catch (error) {
        console.log("Not Connected" , error)
    }

} 

