import mongoose from "mongoose";

export const dbConnect = async()=>{
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;
        connection.on("connected",()=>{
            console.log("Connected to database");
        })
        connection.on("error",(e)=>{
            console.log("some error occured"+e);
            process.exit();
        })
    } catch (error) {
        console.log("Something went wrong");
        console.log(error);
    }
}