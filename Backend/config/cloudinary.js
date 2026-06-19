import { v2 as cloudinary } from 'cloudinary'

const connectcloudinary = async () => {
    try {

        cloudinary.config({

            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_SECRET_KEY
        })
    }
    catch (error) {
        console.error("Cloudinary Config Error:", error.message);
        process.exit(1);
    }
}

export default connectcloudinary; 