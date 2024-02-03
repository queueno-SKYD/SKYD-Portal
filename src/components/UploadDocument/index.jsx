import React, { useState } from "react";
import "./style.css";
import { POST, getHeaders } from "../../api/restClient.ts";
import { useLogin } from "../../context/login.context";
import url from "../../api/url.ts";
import MyModal from "../Model/index.jsx";

const UploadDocument = ({openModel, closeModal}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {token} = useLogin();
  const [formData, setFormData] = useState({
    fileName: "",
    fileURL: ""
  })
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(formData?.email && formData?.passwordConfirm){
      console.log("error")
      return;
    }
    console.debug(formData)
    try {
      setIsLoading(true);
      const response = await POST(url.uploadDocument, getHeaders(token), formData);
      console.log("response --->", JSON.stringify(response));
      if(response.data.statusCode === 200){
        const output = response?.data?.data;
        console.debug("🚀 ------------------------------------🚀")
        console.debug("🚀 ~ handleSubmit ~ output:", output)
        console.debug("🚀 ------------------------------------🚀")
        if(output){
          closeModal()
        }
      }
    } catch (error) {
      console.debug("🚀 ----------------------------------🚀")
      console.debug("🚀 ~ handleSubmit ~ error:", error)
      console.debug("🚀 ----------------------------------🚀")
    } finally {
      setIsLoading(false)
    }

  };
  return (
    <MyModal
        openModal={openModel}
        closeModal={closeModal} title={"Upload document"}
        closeOnBackdropClick={true}
        isCenter={true}
        onSave={(e) => handleSubmit(e)}
        isLoading={isLoading}
      >
        <form>
          <div className="row mb-3">
            <label htmlFor="fileName" className="col-sm-3 col-form-label" >
            file Name
            </label>
            <div className="col-sm-10">
              <input type="email" className="form-control" id="fileName" name="fileName"
                value={formData?.fileName}
                onChange={handleInputChange}/>
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="fileURL" className="col-sm-3 col-form-label">
            file URL
            </label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="fileURL" name="fileURL"
                value={formData?.fileURL}
                onChange={handleInputChange}/>
            </div>
          </div>
        </form>
      </MyModal>
  )
}

export default UploadDocument