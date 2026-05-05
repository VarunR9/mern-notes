import mongoose from "mongoose"
export const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connect Successfully");
    } catch(error){
        console.error("ERROR Connecting to MongoDB",error);
        process.exit(1);
    }
}