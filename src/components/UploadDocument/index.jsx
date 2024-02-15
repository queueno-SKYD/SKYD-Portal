import React, { useEffect, useState } from "react";
import "./style.css";
import { POST, getHeaders } from "../../api/restClient.ts";
import { useLogin } from "../../context/login.context";
import url from "../../api/url.ts";
import MyModal from "../Model/index.jsx";
import {successToast } from "../customToast/index.js";

const UploadDocument = ({openModel, closeModal, callAfterUpload, fileData, title}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {token} = useLogin();
  const [formData, setFormData] = useState({
    label: fileData?.label || "",
    fileURL: fileData?.fileURL || ""
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
    try {
      setIsLoading(true);
      if (fileData && fileData?.fileId) {
        const response = await POST(url.editDocument, getHeaders(token), {...formData, fileId: fileData?.fileId});
        console.log("response --->", JSON.stringify(response));
        if(response.data.statusCode === 200){
          const output = response?.data?.data;
          if(output){
            callAfterUpload();
            successToast("Document successfully deleted");
            closeModal();
          }
        }
        return;
      }
      const response = await POST(url.uploadDocument, getHeaders(token), formData);
      console.log("response --->", JSON.stringify(response));
      if(response.data.statusCode === 200){
        const output = response?.data?.data;
        if(output){
          callAfterUpload();
          successToast("Document successfully uploaded");
          closeModal();
        }
      }
    } catch (error) {
    } finally {
      setIsLoading(false)
      setFormData({
        label: "",
        fileURL: ""
      })
    }

  };
  return (
    <MyModal
        openModal={openModel}
        closeModal={closeModal} title={title}
        closeOnBackdropClick={true}
        isCenter={true}
        onSave={(e) => handleSubmit(e)}
        isLoading={isLoading}
        saveButtonTitle={fileData ? "Save change" : "Upload"}
      >
        <form>
          <div className="row mb-3">
            <label htmlFor="label" className="col-sm-3 col-form-label" >
            file Name
            </label>
            <div className="col-sm-10">
              <input type="email" className="form-control" id="label" name="label"
                value={formData?.label}
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