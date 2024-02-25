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

function Home() {
  const axios = useAxios()
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [createGroupLoading, setCreateGroupLoading] = useState(false);
  const [groups, setGroups] = useState([])

  //#region set selected group
  const [selectedGroup, setSelectedGroup] = useState(null);

  //#endregion

  const [groupData, setGroupData] = useState({
    name: "",
    profileImageUrl: "",
    members: [],
    description: "",
  });

  const setUploadedImage = (data) => {
    if (data) {
      setGroupData(groupData => {return { ...groupData, profileImageUrl: data?.path }})
    }
  }
  const [userList, setUserList] = useState([])

  const onHandleChange = (e)=>{
    const { name, value } = e.target;
    setGroupData({ ...groupData, [name]: value });
  }

  const getGroups = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(url.getAllUserGroups, {
        page: 1,
        pageSize: 50,
      })
      if(response.statusCode === 200){
        const output = response?.data;
        setGroups(output.data ?? [])
        setSelectedGroup(output.data?.[0])
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

  const createGroup = async (groupData) => {
    try {
      setCreateGroupLoading(true);
      const response  = await axios.post(url.createGroup, groupData)
      if(response.statusCode === 200){
        const output = response?.data;
        if (output) {
          successToast(response?.message)
          getGroups()
          setShowCreateGroupModal(false)
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

  useEffect(()=> {
    getGroups()
  }, [])

  return (
    <>
      <div className='w-100 h-100 d-flex flex-row' style={{borderWidth: "10px"}} id="home-room">
        <div className="col-4" id="groupsSection">
          <ChatHeader onClickAddGroup={() => setShowCreateGroupModal(true)} />

          <ChatSearch headerColor={"#E8E8E8E"} />


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
              onClick={() => setSelectedGroup(group)}
              selected={selectedGroup?.groupId === group?.groupId}
             />}
           )}
          </div>

        </div>
        <div className="w-100 position-relative">
          <ChatList selectedGroup={selectedGroup} />
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
        <CustomImagePicker imageUrl={"http://localhost:3001/uploads/image-1708818796436-557390326"} size={150} />
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
      <Loader isLoading={isLoading || createGroupLoading} />
    </>
  );
}

export default Home;
