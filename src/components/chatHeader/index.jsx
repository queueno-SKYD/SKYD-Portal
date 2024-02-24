import React from "react";
import "./index.css";
import { imageUrl } from "../../assets/index.ts";
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { ButtonBase, IconButton } from "@mui/material";
function ChatHeader({
  onClickComment,
  onClickAddGroup,
  onClickMore,
  headerTitle = "Skyd Admin",
  headerImage = imageUrl.GroupLogo,
  headerColor = "bg-light",
  iconColor = "",
}) {
  return (
    <div className="d-flex align-items-center  profile-chat-head">
      <ButtonBase className="mx-2 rounded-circle">
        <img src={headerImage} alt="" />
      </ButtonBase>
      <div className="w-100 align-middle">
        <p className={`title-header ${iconColor}`}>{headerTitle}</p>
      </div>
      <div className="text-center last">
        <IconButton>
          <MessageRoundedIcon onClick={onClickComment} />
        </IconButton >
        <IconButton>
          <GroupAddRoundedIcon onClick={onClickAddGroup} />
        </IconButton>
        <IconButton>
          <MoreVertRoundedIcon onClick={onClickMore} />
        </IconButton>
      </div>
    </div>
  );
}

export default ChatHeader;
