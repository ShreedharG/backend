import mongoose from "mongoose";
import { db_name } from "../constants.js";

const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${db_name}`);
        console.log(`\nMongoDB connected to server!! Host name :  ${connectionInstance.connection.host}\n`);
    }
    catch (error) {
        console.log("Error while connecting to MongoDB", error);
        process.exit(1);
    }
}    

export default connectDb;