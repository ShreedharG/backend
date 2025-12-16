import mongoose from "mongoose";
import { db_name } from "../constants.js";

const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${db_name}`);
        console.log(`\nMongoDB connected to server!! \nHost name :  ${connectionInstance.connection.host}`);
        console.log("Database Name : ", connectionInstance.connection.name);
        console.log(`${connectionInstance.connection.modelNames().length} Number of Models are registered`);
        console.log("MongoDB connection successful");
        console.log("---------------------------------------------------");
    }
    catch (error) {
        console.log("Error while connecting to MongoDB", error);
        process.exit(1);
    }
}    

export default connectDb;