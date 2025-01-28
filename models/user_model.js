import mongoose from "mongoose";
import connectDB from "../db/db.js";

// Connect to the database
connectDB();

const userSchema = new mongoose.Schema({
     name: {type:String , required:true},
     email: {type:String , required:true , unique:true},
     password: {type:String , required:true},
     date: {type:Date , default: Date.now} // adding date field to the schema
});

const User = mongoose.model("user" , userSchema);

export default User; 

