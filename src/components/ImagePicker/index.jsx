import React from 'react';
import { Box, Typography, IconButton, Input, ButtonBase, Tooltip } from '@mui/material';
import { AccountCircle, PhotoCamera, Edit, DeleteForeverRounded, SaveAsRounded } from '@mui/icons-material';
import "./index.css"
import { CustomAvatar } from '../Avatar';

const CustomImagePicker = ({ imageUrl, groupName, size=300, selectedImage, setSelectedImage, setSelectedFile, onDelete, onEdit, editing, onSave }) => {
  
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

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
      <Input
        accept="image/*"
        type="file"
        hidden
        disabled={!editing}
        id="icon-button-file"
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
          
          <div className='w-100 d-flex justify-content-center align-items-center left' onClick={editing && selectedImage ? onSave : onDelete}>
            {editing && selectedImage ? (
              <Tooltip enterDelay={1000} leaveDelay={200} title="Save change!" placement="top" arrow>
                <SaveAsRounded /> 
              </Tooltip>
            ) : 
              <Tooltip enterDelay={1000} leaveDelay={200} title="Delete" placement="top" arrow>
                <DeleteForeverRounded /> 
              </Tooltip>
            }
          </div>
          <label htmlFor='icon-button-file' className='w-100 d-flex justify-content-center align-items-center right pointer' onClick={onEdit}>
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
