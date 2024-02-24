import React, { useState } from "react";
import ChatList from "../chatList";
import ChatHeader from "../../components/chatHeader";
import ChatSearch from "../../components/chatSearch";
import GroupChatUser from "../../components/groupChatUser";
import "./index.css";
import MyModal from "../../components/Model";
import { Autocomplete, Avatar, Button, TextField } from "@mui/material";
import InputImageUpload from "../../components/inputImageUpload";

const userImg = "https://media.istockphoto.com/id/1212800014/photo/young-man-in-black-shirt-at-the-studio-with-gray-background-concept-with-face-close-up-and.webp?s=170667a&w=0&k=20&c=K7GLkFQciFmLi8IMTK7-DpzqaLo-hoQl-Yxr8Xz2BN8="

function Home() {
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [groupData, setGroupData] = useState({
    name: "",
    image: "",
    members: [],
    description: "",
    members: [],
  });
  const [userList, setUserList] = useState([])
  const onHandleChange = (e)=>{
    const { name, value } = e.target;
    setGroupData({ ...groupData, [name]: value });
  }
  return (
    <>
      <div className="col-12 d-flex flex-row">
        <div className="col-5 inner-shadow ">
          <ChatHeader onClickAddGroup={() => setShowCreateGroupModal(true)} />

          <ChatSearch headerColor={"#E8E8E8E"} />

          <div id="messages" style={{ overflow: "scroll", height: 450 }}>
            <GroupChatUser
              userImage={
                "https://media.istockphoto.com/id/1212800014/photo/young-man-in-black-shirt-at-the-studio-with-gray-background-concept-with-face-close-up-and.webp?s=170667a&w=0&k=20&c=K7GLkFQciFmLi8IMTK7-DpzqaLo-hoQl-Yxr8Xz2BN8="
              }
              userName={"Kanahiya lal"}
              lastMessage={"Hello mote !"}
              lastMessageTime={"12:10 PM"}
              messageCount={2}
            />
          </div>
        </div>
        <div className="col-7 position-relative">
          <ChatList />
        </div>
      </div>

      <MyModal
        openModal={showCreateGroupModal}
        closeModal={() => setShowCreateGroupModal(false)}
        title={""}
        closeOnBackdropClick={true}
        isCenter={true}
        onSave={(e) => {
          setShowCreateGroupModal(false);
        }}
        modalWidth={300}
        isLoading={false}
        saveButtonTitle={"Create Group"}
        customFooter={
          <div className="w-100 d-flex justify-content-center">
            <Button variant="contained" size="small">
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
          <InputImageUpload value={groupData.image} onChange={onHandleChange} />
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
    </>
  );
}

export default Home;
