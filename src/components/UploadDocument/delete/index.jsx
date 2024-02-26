import React, { useState } from "react";
import "../style.css";
import useAxios from "../../../api/restClient";
import url from "../../../api/url.ts";
import MyModal from "../../Model/index.jsx";
import {dangerToast, successToast } from "../../customToast/index.js";

const DeleteDocument = ({openModel, closeModal, callAfterUpload, fileId}) => {
  const axios = useAxios();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    label: "",
    fileURL: ""
  })
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const deleteUser = async (id) => {
    if(formData?.email && formData?.passwordConfirm){
      console.log("error")
      return;
    }
    console.debug(formData)
    try {
      setIsLoading(true);
      const response = await axios.post(url.deleteDocument, formData);
      if(response?.statusCode === 200){
        const output = response?.data;
        if(output){
          callAfterUpload();
          successToast("Document successfully uploaded");
          closeModal()
        }
      }
    } catch (error) {
      dangerToast(error.message)
    } finally {
      setIsLoading(false)
    }

  };
  return (
    <MyModal
      openModal={openModel}
      closeModal={closeModal}
      title={"Confirm For Deletion!"}
      closeOnBackdropClick={true}
      isCenter={true}
      onSave={deleteUser}
      isLoading={isLoading}
      saveButtonTitle={"Delete"}
      cancelButtonTitle={"Cancel"}
    >
      <p className="text-center">Are you sure, you want delete this user?</p>
    </MyModal>
  )
}

export default DeleteDocument