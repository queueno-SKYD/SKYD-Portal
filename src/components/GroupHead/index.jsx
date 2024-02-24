import React, { Children, useState } from "react";
import "./index.css";
import { imageUrl } from "../../assets/index.ts";
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { ArrowBack, CloseRounded } from "@mui/icons-material";
import { ButtonBase, IconButton } from '@mui/material';
import { CustomAvatar } from "../Avatar/index.jsx";

const GroupHeaderItem = ({selectedGroup, children, openInfo, setOpenInfo}) => {
  const isMobile = false;
  return (
    <div className={`h-100 d-flex flex-column pointer group-chat-info ${openInfo ? "close-small-width" : "open"}`} onClick={() => setOpenInfo(true)}>
      <div className="d-flex align-items-center group-chat-head">
        {isMobile && <IconButton>
          <ArrowBack fontSize="medium" />
        </IconButton>}
        <ButtonBase className="mx-2 rounded-circle">
          <CustomAvatar src={selectedGroup?.profileImageUrl} alt="User Avatar" firstName={selectedGroup?.name} lastName={"lastName"} size={40} />
        </ButtonBase>
        <div className="w-100 align-middle">
          <p className={`title-header`}>{selectedGroup?.name}</p>
          <small className="group-description">{selectedGroup?.description}</small>
        </div>
        <div className="text-center last">
          <IconButton >
            <MoreVertRoundedIcon onClick={() => console.log("")} />
          </IconButton>
        </div>
      </div>
      <div className="w-100 group-header-container">
        {children}
      </div>
    </div>
  )
}

const GroupHeaderInfo = ({selectedGroup, children, openInfo, setOpenInfo}) => {
  return (
    <div className={`d-flex flex-column group-chat-info group-chat-head-info ${openInfo ? "open" : "close"}`}>
      <div className="d-flex align-items-center group-chat-head">
        <IconButton onClick={() => setOpenInfo(false)} >
          <CloseRounded fontSize="medium" />
        </IconButton>
        <div className="w-100 align-middle">
          <p className={`title-header`}>Group info</p>
        </div>
      </div>
      <div className="group-header-container">
        {children}
      </div>
    </div>
  )
}

const GroupHeader = ({
  selectedGroup,
  chat
}) => {
  const [openInfo, setOpenInfo] = useState(false);

  return (
    <div className="d-flex flex-row">
      <GroupHeaderItem selectedGroup={selectedGroup} openInfo={openInfo} setOpenInfo={setOpenInfo}>
        {chat}
      </GroupHeaderItem>
      <GroupHeaderInfo selectedGroup={selectedGroup} openInfo={openInfo} setOpenInfo={setOpenInfo}>
        <p>dsfdsfsdfsfsf</p>
      </GroupHeaderInfo>
    </div>
  );
}

export default GroupHeader;
