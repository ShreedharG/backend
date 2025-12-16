import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

import connectDb from "./db/index.js";

connectDb();











/*
;( async () => {
  try{
    await mongoose.connect(`${process.env.MONGO_URI}/${db_name}`);
    app.on("error", (error) => {
        console.log("Error while connecting to the server", error);
        throw error;
    })

    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    })
  }
  catch (error){
    console.log("Error while connecting to MongoDB", error);
    throw error;
  }
})()

*/