import React, { useEffect, useState } from "react";
import ChatList from "../chatList";
import ChatHeader from "../../components/chatHeader";
import ChatSearch from "../../components/chatSearch";
import GroupChatUser from "../../components/groupListItem/index.jsx";
import "./index.css";
import MyModal from "../../components/Model";
import { Autocomplete, Button, TextField } from "@mui/material";
import useAxios from "../../api/restClient";
import url from "../../api/url.ts";
import { dangerToast, successToast } from "../../components/customToast/index.js";
import Loader from "../../components/Loder/index.jsx";
import CustomImagePicker from "../../components/ImagePicker/index.jsx";
import { useAppContext } from "../../context/app.context.jsx";
import useImageUpload from "../../hooks/useImageUpload.js";

function Home() {
  const axios = useAxios()
  const { user } = useAppContext()
  const { isMobile } = useAppContext();
  const { setMobilenavHideen } = useAppContext();
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [createGroupLoading, setCreateGroupLoading] = useState(false);
  const [groups, setGroups] = useState([])
  const [searchString, setSearchString] = useState("");

  const { 
    onUploadImage,
    selectedImage,
    setSelectedImage,
    setSelectedFile,
    loading
   } = useImageUpload();

  //#region set selected group
  const [selectedGroup, setSelectedGroup] = useState(null);

  //#endregion

  const [groupData, setGroupData] = useState({
    name: "",
<<<<<<< Updated upstream
=======
    profileImageUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
>>>>>>> Stashed changes
    members: [],
    description: "",
  });

<<<<<<< Updated upstream
  const [userList, setUserList] = useState([])
=======
  const setUploadedImage = (data) => {
    if (data) {
      setGroupData(groupData => {return { ...groupData, profileImageUrl: data?.path }})
    }
  }
  const [userList, setUserList] = useState([]);
>>>>>>> Stashed changes

  const onHandleChange = (e)=>{
    const { name, value } = e.target;
    setGroupData({ ...groupData, [name]: value });
  }

  const getGroups = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(url.getAllUserGroups, {
        query: searchString,
        page: 1,
        pageSize: 50,
      })
      if(response?.statusCode === 200){
        const output = response?.data;
        setGroups(output.data ?? [])
        setSelectedGroup(output.data?.[0])
        setMobilenavHideen(true)
      }
    } catch (error) {
      console.debug(error)
      dangerToast(error.message)
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }
  }

  const clearState = () => {
    setGroupData({
      name: "",
      members: [],
      description: "",
    });
    setSelectedImage(null);
    setSelectedFile(null);
  }

  const createGroup = async (groupData) => {
    try {
      setCreateGroupLoading(true);
      const uploadedUrl = await onUploadImage()
      const response  = await axios.post(url.createGroup, {...groupData, profileImageUrl: uploadedUrl})
      if(response?.statusCode === 200){
        const output = response?.data;
        if (output) {
          successToast(response?.message)
          getGroups()
          setShowCreateGroupModal(false)
          clearState();
        } else {
          dangerToast(response.message)
        }
      }
    } catch (error) {
      dangerToast(error.message)
    } finally {
      setCreateGroupLoading(false)
    }
  }

  useEffect(() => {
    if (!isMobile) {
      setSelectedGroup(groups?.[0])
    }
  }, [isMobile, groups])

  const onBack = () => {
    setMobilenavHideen(false)
    setSelectedGroup(null)
  }

  const onSelectGroup = (group) => {
    setMobilenavHideen(true)
    setSelectedGroup(group)
  }

  useEffect(()=> {
    getGroups()
  }, [])

<<<<<<< Updated upstream
  const searchOnBlurHandler = () => {
    if (!searchString) {
      getGroups();
    }
  }
=======
>>>>>>> Stashed changes

  return (
    <>
      <div className={`w-100 h-100 d-flex flex-row`} style={{borderWidth: "10px"}} id="home-room">
        <div className={`col-4 ${selectedGroup ? "active-selected-group-hide-group-list" : "active-selected-group-visible-group-list"} `} id="groupsSection">
          <ChatHeader
            user={user}
            headerImage={user?.imageURL}
            onClickAddGroup={() => setShowCreateGroupModal(true)} 
          />

          <ChatSearch
            searchValue={searchString}
            onHandleChange={(e) => setSearchString(e?.target?.value)}
            onClickSearch={getGroups}
            headerColor={"#E8E8E8E"}
            onBlurHandler={searchOnBlurHandler}
          />


          <div className="inner overflow-auto" id="groups-list">
           {groups.map(group => 
             {
             return <GroupChatUser
              key={group?.groupId}
              userImage={
                group?.profileImageUrl
              }
              userName={group?.name}
              lastMessage={"Hello mote !"}
              lastMessageTime={"12:10 PM"}
              messageCount={2}
              onClick={() => onSelectGroup(group)}
              selected={selectedGroup?.groupId === group?.groupId}
              showDelete={false}
              showSave={false}
             />}
           )}
          </div>

        </div>
        <div className={`w-100 position-relative ${selectedGroup ? "active-selected-group-show-chat" : "active-selected-group-hide-chat"}`} id="messagesAndDetailsSection">
          <ChatList selectedGroup={selectedGroup} onBack={onBack} />
        </div>
      </div>

      <MyModal
        openModal={showCreateGroupModal}
        closeModal={() => setShowCreateGroupModal(false)}
        title={""}
        closeOnBackdropClick={true}
        isCenter={true}
        onSave={(e) => {
          createGroup(groupData);
        }}
        modalWidth={300}
        isLoading={false}
        saveButtonTitle={"Create Group"}
        customFooter={
          <div className="w-100 d-flex justify-content-center">
            <Button variant="contained" size="small" onClick={() => createGroup(groupData)}>
              Create Group
            </Button>
          </div>
        }
      >
        <div className="d-flex flex-column align-items-center">
<<<<<<< Updated upstream
        <CustomImagePicker
          size={150}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          setSelectedFile={setSelectedFile}
          imageUrl={null}
          groupName={groupData.name}
          onEdit={null}
          editing={true}
          id={"newGroupImage"}
          showDelete={false}
          showSave={false}
        />
=======
        <CustomImagePicker imageUrl={"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} size={150} />
>>>>>>> Stashed changes
        </div>
        <br />
        <TextField
          fullWidth
          label="Group Name"
          id="outlined-size-small"
          size="small"
          name="name"
          value={groupData.name}
          onChange={onHandleChange}
        />

        <TextField
          style={{
            marginTop: "10px",
          }}
          fullWidth
          label="Description"
          id="outlined-multiline-flexible"
          multiline
          value={groupData.description}
          name="description"
          onChange={onHandleChange}
          maxRows={3}
        />

        <Autocomplete
          style={{
            marginTop: "10px",
          }}
          multiple
          id="tags-outlined"
          options={userList}
          getOptionLabel={(option) => option.title}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField {...params} label="Members" placeholder="Members" />
          )}
        />
      </MyModal>
      <Loader isLoading={isLoading || createGroupLoading || loading} />
    </>
  );
}

export default Home;
