import React, { useEffect, useState } from 'react'
import useImageUpload from '../../../hooks/useImageUpload'
import CustomImagePicker from '../../../components/ImagePicker';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import { IconButton, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';

import "./index.css"
import GroupChatUser from '../../../components/groupListItem';

const GroupInfo = ({groupDetails}) => {
  const [edit, setEdit] = useState(false);
  const { 
    onUploadImage,
    selectedImage,
    setSelectedImage,
    selectedFile,
    setSelectedFile,
    loading
   } = useImageUpload(groupDetails);
  useEffect(() => {
    setEdit(false)
  }, [groupDetails])

  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  return (
    <div className='d-flex flex-column gap-2'>
      <div className='d-flex flex-column justify-content-center gap-4 align-items-center py-3 info-section image-section'>
        <CustomImagePicker
          size={300}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          setSelectedFile={setSelectedFile}
          imageUrl={groupDetails?.profileImageUrl}
          groupName={groupDetails?.name}
          onEdit={() => setEdit(true)}
          editing={edit}
        />
        <div className='d-flex flex-column justify-content-center gap-2 align-items-center info-inner-section'>
          <Typography variant="h4" align="center"> 
            {groupDetails?.name}
          </Typography>
          <Typography variant="body" width={300} noWrap align="center">
            {groupDetails?.description}
          </Typography>
          <Typography variant="h5" width={300} noWrap align="center">
            {`${groupDetails?.totalMembers} Members`}
          </Typography>
        </div>
      </div>

      <div className='d-flex flex-column justify-content-center gap-4 align-items-center py-3 info-section image-section'>
        <div className='w-100'>

        <List sx={{width: "inherit"}}>
          <ListItem
            disablePadding
          >
            <ListItemButton>
              <IconButton sx={{backgroundColor: "#8a8", marginRight: '15px', color: "white"}} size="large" >
                <PersonAddRoundedIcon />
              </IconButton>
              <ListItemText id={2} primary={`Add new members`} />
            </ListItemButton>
          </ListItem>
          {[0, 1, 2, 3, 4, 5].map((value) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <GroupChatUser
                key={labelId}
                userImage={
                  "group?.profileImageUrl"
                }
                userName={"group?.name"}
                imageSize={48}
                isAdmin
             />
            );
          })}
        </List>
        </div>
      </div>
    </div>
  )
}

export default GroupInfo;
