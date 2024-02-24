
import React, { useEffect, useState } from "react";
import ChatList from "../chatList";
import ChatHeader from "../../components/chatHeader";
import ChatSearch from "../../components/chatSearch";
import GroupChatUser from "../../components/groupListItem/index.jsx";
import "./index.css";
import MyModal from "../../components/Model";
import { Autocomplete, Avatar, Button, TextField } from "@mui/material";
import InputImageUpload from "../../components/inputImageUpload";
import useAxios from "../../api/restClient";
import url from "../../api/url.ts";
import { dangerToast, successToast } from "../../components/customToast/index.js";
import Loader from "../../components/Loder/index.jsx";

const userImg = "https://media.istockphoto.com/id/1212800014/photo/young-man-in-black-shirt-at-the-studio-with-gray-background-concept-with-face-close-up-and.webp?s=170667a&w=0&k=20&c=K7GLkFQciFmLi8IMTK7-DpzqaLo-hoQl-Yxr8Xz2BN8="

function Home() {
  const axios = useAxios()
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [createGroupLoading, setCreateGroupLoading] = useState(false);
  const [groups, setGroups] = useState([])

  //#region set selected group
  const [selectedGroup, setSelectedGroup] = useState(null);
  console.debug("🚀 ------------------------------------------🚀")
  console.debug("🚀 ~ Home ~ selectedGroup:", selectedGroup)
  console.debug("🚀 ------------------------------------------🚀")

  //#endregion

  const [groupData, setGroupData] = useState({
    name: "",
    profileImageUrl: "",
    members: [],
    description: "",
  });

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

  const shareFileWithUsers = async (groupData) => {
    try {
      setCreateGroupLoading(true);
      const response  = await axios.post(url.createGroup, groupData)
      if(response.statusCode === 200){
        const output = response?.data;
        if (output) {
          successToast("Shared document successfully")
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
          shareFileWithUsers(groupData);
        }}
        modalWidth={300}
        isLoading={false}
        saveButtonTitle={"Create Group"}
        customFooter={
          <div className="w-100 d-flex justify-content-center">
            <Button variant="contained" size="small" onClick={() => shareFileWithUsers(groupData)}>
              Create Group
            </Button>
          </div>
        }
      >
        <div className="rounded-circle d-flex justify-content-center">
          <Avatar
            alt="Remy Sharp"
            src={userImg}
            sx={{ width: 80, height: 80 }}
          />
        </div>
        <br />

        <div className="d-flex justify-content-center">
          <TextField value={groupData.profileImageUrl} onChange={onHandleChange} name="profileImageUrl"/>
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

export default Home
