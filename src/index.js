import dotenv from "dotenv";
dotenv.config();

import {app} from "./app.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "./utils/cloudinary.js";
import connectDb from "./db/index.js";

(connectDb)()
.then(async () => {

  console.log("Testing Cloudinary connection");
  const response = await uploadOnCloudinary("./test.png");

  if(response){
    console.log("\n********Successfull Cloudinary connection! **************");
    console.log("Upload Success:", response.secure_url);
    await deleteFromCloudinary(response.public_id);  
  }

  else {
    console.log("Upload failed")
  }

  app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running on port ${process.env.PORT || 8000}`);
  });

})
.catch((error) => {
  console.log("Error in DB connection!!!", error);
});











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