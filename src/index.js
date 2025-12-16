import dotenv from "dotenv";
import {app} from "./app.js";
dotenv.config({
  path: "./.env",
});

import connectDb from "./db/index.js";

(connectDb)()
.then(() => {
  app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running on port ${process.env.PORT || 8000}`);
  })
})
.catch((error) => {
  console.log("Error in DB connection!!!", error);
})











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