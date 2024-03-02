import { useEffect, useState } from "react";
import useAxios from "../api/restClient";
import { dangerToast } from "../components/customToast";

const useImageUpload = () => {
  const axios = useAxios();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const [loading, setLoading] = useState(false);

  /**
   * Click to upload image
   * @returns response with uploaded file details or errors
   */
  const onUploadImage = () => {
    return new Promise(async (resolve, reject) => {
       try {
         const reader = new FileReader();
         reader.onload = async (e) => {
           const img = new Image();
           img.onload = async () => {
             const canvas = document.createElement('canvas');
             canvas.width = img.width;
             canvas.height = img.height;
             const ctx = canvas.getContext('2d');
             ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
             canvas.toBlob(async (blob) => {
               // Convert the blob to a File object
               const file = new File([blob], 'converted-image.jpg', { type: 'image/jpg' });
               try {
                const response = await axios.uploadFile(file, 'image');
                if(response?.statusCode === 200){
                  const output = response?.data?.path;
                   resolve(output); // Resolve the promise with the URL
                 } else {
                   reject(new Error('Upload failed'));
                 }
               } catch (error) {
                 reject(error); // Reject the promise with the error
               }
             }, 'image/png');
           };
           img.src = e.target.result;
         };
         reader.readAsDataURL(selectedFile);
       } catch (error) {
         reject(error); // Reject the promise with the error
       }
    });
   };

  return {
    onUploadImage,
    selectedImage,
    setSelectedImage,
    selectedFile,
    setSelectedFile,
    loading
  }
}

export default useImageUpload;
