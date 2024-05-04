import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/app.context";
import { Box, Button, Grid, Input, TextField } from "@mui/material";
import "./index.css";
import CustomImagePicker from "../../components/ImagePicker";
import useImageUpload from "../../hooks/useImageUpload";
import useAxios from "../../api/restClient";
import url from "../../api/url.ts"
import { dangerToast, successToast } from "../../components/customToast";

const SectionHeader = ({title}) => {
  return (
    <div className="w-100 section-hearder mt-2 mb-5">
      <span>{title}</span>
    </div>
  )
}

const ProfileSettings = () => {
  const axios = useAxios();
  const size = 180;
  const { user, isMobile, setUser } = useAppContext();

  const initialUser = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    imageURL: user?.imageURL || "",
  }

  const [editedUserDetails, setEditeduserDetails] = useState(initialUser);

  const [edit, setEdit] = useState(false);
  const { 
    onUploadImage,
    selectedImage,
    setSelectedImage,
    setSelectedFile,
    loading
  } = useImageUpload();

  const isFormDirty = JSON.stringify(initialUser) !== JSON.stringify(editedUserDetails) || selectedImage;

  const onUpdateProfile = async () => {
    const updateProfile = async (uploadedUrl) => {
      try {
        const response = await axios.post(url.Me, uploadedUrl ? {...editedUserDetails, imageURL: uploadedUrl} : editedUserDetails)
        if (response?.data) {
          successToast(response?.message || "Profile Updated SuccessFully")
          setUser(response?.data)
        } else {
          dangerToast(response?.message)
        }
      } catch (error) {
        dangerToast(error?.message)
      }
    }

    try {
      if (selectedImage) {
        // upload
        const uploadedUrl = await onUploadImage();
        await updateProfile(uploadedUrl)
      } else {
        await updateProfile()
      }
    } catch (error) {
      dangerToast(error?.message)
    }
  }

  useEffect(() => {
    setEditeduserDetails({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      imageURL: user?.imageURL || "",
    })
  }, [user])

  const formgridSpacing = isMobile ? 2 : 4;

  const handleOnChange = (e) => {
    const { name, value } = e?.target;
    setEditeduserDetails({...editedUserDetails, [name]: value})
  }
  
  return (
    <div className="container-fix">
      <div id="profile-cover-image-area" className="w-100">
        <img src="https://images.pexels.com/photos/133633/pexels-photo-133633.jpeg" id="cover-image" alt="cover" />
        <div className="container-l">
          
        </div>
      </div>
      <div id="profile-main-area" className="w-100">
        
        <div className="container px-5">
          <section id="pre-user-details-and-action-area" className="d-flex align-items-center mt-0 mb-3">
            <div id="profile-image-floting-holder" style={{bottom: size/2 + "px", height: size + "px", width: size + "px"}}>
              <CustomImagePicker
                imageUrl={user?.imageURL}
                firstName={user?.firstName}
                lastname={user?.lastName}
                size={size}
                showDelete={false}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                setSelectedFile={setSelectedFile}
                onEdit={() => setEdit(true)}
                editing={edit}
                id={"userInfoUpdate" + user?.userId}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center w-100"> 
              <div id="pre-user-details">
                <p className="profile-user-name">
                  <span>{user?.firstName || ""}</span>&nbsp;<span>{user?.lastName || ""}</span>
                </p>
              </div>
              <div id="pre-user-details-action">
                <Button variant="outlined" color="primary" size="medium" disabled={!isFormDirty} onClick={onUpdateProfile}>Save Changes</Button>
              </div>
            </div>
          </section>
          <section id="personal-details-section" className="mb-5">
            <SectionHeader title={"Personal details"}/>
            <div id="edit-user-details-form-area">
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={formgridSpacing}>
                  <Grid item xs={6}>
                    <TextField
                      id="editUserFirstName"
                      label="First Name"
                      variant="outlined"
                      name="firstName"
                      value={editedUserDetails?.firstName}
                      onChange={handleOnChange}
                      fullWidth
                      spellCheck="false"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="editUserLastName"
                      label="Last Name"
                      variant="outlined"
                      name="lastName"
                      value={editedUserDetails?.lastName}
                      onChange={handleOnChange}
                      fullWidth
                      spellCheck="false"
                    />
                  </Grid>
                  <Grid item xs={isMobile ? 12 : 6}>
                    <TextField
                      id="editUserEmail"
                      label="Email"
                      variant="outlined"
                      type="email"
                      value={editedUserDetails?.email}
                      name="email"
                      fullWidth
                      disabled
                      spellCheck="false"
                    />
                  </Grid>
                </Grid>
              </Box>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ProfileSettings;
