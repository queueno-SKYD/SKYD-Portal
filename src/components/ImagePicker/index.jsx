import React from 'react';
import { Box, Tooltip, TextField } from '@mui/material';
import { AccountCircle, PhotoCamera, Edit, DeleteForeverRounded, SaveAsRounded } from '@mui/icons-material';
import "./index.css"
import { CustomAvatar } from '../Avatar';

const CustomImagePicker = (
  { 
    imageUrl,
    groupName,
    size=300,
    selectedImage,
    setSelectedImage,
    setSelectedFile,
    onDelete,
    onEdit,
    editing,
    onSave,
    id,
    showDelete=true,
    showSave=true,
  }) => {

  const handleImageChange = (event) => {
    console.debug("ddd click")
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      
      setSelectedFile(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const showSaveOrDelete = (editing && selectedImage && showSave) || showDelete;

  return (
    <>
    <Box
      sx={{
        position: 'relative',
        width: size,
        height: size,
        borderRadius: '50%', // Make the frame circular
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&:hover': {
          cursor: 'pointer',
          borderColor: 'blue',
        },
      }}
      className='image-picker-label'
    >
      <TextField
        type="file"
        InputProps={{
          accept: 'image/*', // Accepts only image files
        }}
        hidden
        disabled={editing ? false : true}
        id={id}
        onChange={editing ? handleImageChange : null}
      />
      <div
        style={{
          position: 'absolute',
          top:   0,
          bottom:   0,
          left:   0,
          right:   0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%', 
          overflow: "hidden",
          zIndex: 100,
          '&:hover': {
            backgroundColor: 'rgba(0,   0,   0,   0.3)',
          },
        }}
      >
        <div className='image-picker-label-hover justify-between'>
          
          {showSaveOrDelete && <div className='w-100 d-flex justify-content-center align-items-center left' onClick={editing && selectedImage ? onSave : onDelete}>
            {editing && selectedImage && showSave ? (
              <Tooltip enterDelay={1000} leaveDelay={200} title="Save change!" placement="top" arrow>
                <SaveAsRounded /> 
              </Tooltip>
            ) : showDelete ?
              <Tooltip enterDelay={1000} leaveDelay={200} title="Delete" placement="top" arrow>
                <DeleteForeverRounded /> 
              </Tooltip>
              : null
            }
          </div>}
          <label htmlFor={id} className={`w-100 d-flex justify-content-center align-items-center right pointer ${!showSaveOrDelete ? "center-1" : ""}`} onClick={onEdit}>
            {editing ? (
              <Tooltip enterDelay={1000} leaveDelay={200} title="Select Image" placement="top" arrow>
                <PhotoCamera />
              </Tooltip>) : (
              <Tooltip enterDelay={1000} leaveDelay={200} title="Edit" placement="top" arrow>
                <Edit />
              </Tooltip>
            )}
          </label>
        </div>
      </div>
      {(selectedImage || imageUrl) ? (
        <CustomAvatar src={editing && selectedImage ? selectedImage : imageUrl} alt="User Avatar" firstName={groupName} lastName={"lastName"} size={size} />
      ) : (
        <AccountCircle sx={{ fontSize:  size + 40, color: 'grey.500' }} />
      )}
    </Box>
    </>
    
  );
};

export default CustomImagePicker;
