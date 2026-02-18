import axiosInstance from "./axiosInstance";
import { API_PATHS } from "./apiPaths";

const uploadImage = async (imageFile) => {
    const formData = new FormData();
    // Append the image file to the form data
    formData.append('image', imageFile);

    try {
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Set content type for file upload
            },
        });
        return response.data; // Return response data
    } catch (error) {
        throw error; // Rethrow error for handling
    }
};

export default uploadImage;