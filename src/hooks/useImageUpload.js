import { useEffect, useState } from "react";
import useAxios from "../api/restClient";
import { dangerToast } from "../components/customToast";

const useImageUpload = (groupDetails) => {
  const axios = useAxios();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log("dssdddddd")
  }, [groupDetails])
  /**
   * Click to upload image
   * @returns response with uploaded file details or errors
   */
  const onUploadImage = async () => {
    setLoading(true)
    try {
      const response = axios.uploadFile(selectedFile, 'image');
      if(response?.statusCode === 200){
        const output = response?.data;
        return output;
      }
      return null;
    } catch (error) {
      dangerToast(error);
      return error;
    } finally {
      setLoading(false)
    }
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
