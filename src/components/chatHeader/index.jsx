import React from "react";
import "./index.css";
import { imageUrl } from "../../assets/index.ts";
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { ButtonBase, IconButton } from "@mui/material";
import { CustomAvatar } from "../Avatar/index.jsx";
function ChatHeader({
  onClickComment,
  onClickAddGroup,
  onClickMore,
  user,
  headerImage = imageUrl.GroupLogo,
  headerColor = "bg-light",
  iconColor = "",
}) {
  return (
    <div className="d-flex align-items-center  profile-chat-head">
      <ButtonBase className="mx-2 rounded-circle m-0 p-0">
        <CustomAvatar src={user?.imageURL} alt="User Avatar" firstName={user?.firstName} lastName={user?.lastName} size={52} />
      </ButtonBase>
      <div className="w-100 align-middle">
        <p className={`title-header ${iconColor}`}>{[user?.firstName, user?.lastName].filter(a => a).join(" ")}</p>
      </div>
      <div className="text-center last">
        <IconButton onClick={onClickComment}>
          <MessageRoundedIcon/>
        </IconButton >
        <IconButton onClick={onClickAddGroup}>
          <GroupAddRoundedIcon />
        </IconButton>
        <IconButton onClick={onClickMore}>
          <MoreVertRoundedIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default ChatHeader;
