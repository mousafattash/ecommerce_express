import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectdb= async()=>{
    return await mongoose.connect(process.env.db_connection).then
    (() => {
        console.log("connected to database");
    }).catch((err) => {
        console.log("error connecting to database", err);
    });
}

export default connectdb;