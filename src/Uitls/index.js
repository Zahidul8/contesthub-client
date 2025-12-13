import axios from "axios";

export const saveOrUpdateUser = async (userData) => {

const {data} =await axios.post(`https://contesthub-server-five.vercel.app/user`, userData)
return data;

}


export const imageUploadCloudinary = async(imageData) => {
    const formData = new FormData();
      formData.append('file', imageData);
      formData.append('upload_preset',
         import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

       const res = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, formData);

       return res.data.secure_url;
}