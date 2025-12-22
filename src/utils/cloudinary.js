import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME , 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;

        // upload to cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        })

        console.log("File uploaded on cloudinary successfully", response.url);
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath); // remove the locally saved temp file as upload failed
        console.error("Error while uploading on cloudinary", error);
        return null;
    }
}

export { uploadOnCloudinary };