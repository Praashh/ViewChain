import cloudinary from "cloudinary"

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECREY
});

export async function uploadAssetToCloudinary(ImageUrl: string){
    try {
        const result = await cloudinary.v2.uploader
         .upload(ImageUrl)
        return {
            success: true,
            result,
            message: "Asset Uploaded Successfully"
        }
    } catch (error) {
        console.warn("error", error)
        return {
            success: true,
            message: `Error while uploading asste ${error}`
        }
    }
}