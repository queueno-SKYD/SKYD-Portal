import React from "react";
import "./index.css";
import { imageUrl } from "../../assets/index.ts";
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
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
    <>
      <div className={`d-flex flex-row ${headerColor} w-100 align-items-center p-2`}>
        <div className="width-10 ">
          <img src={headerImage} alt="" />
        </div>
        <div className="width-60 align-middle">
          <p className={`title-header padding-left-10 ${iconColor}`}>{headerTitle}</p>
        </div>
        <div className="width-10  text-center">
          <MessageRoundedIcon onClick={onClickComment} />
        </div>
        <div className="width-10  text-center">
        <GroupAddRoundedIcon onClick={onClickAddGroup} />
        </div>
        <div className="width-10  text-center">
          <MoreVertRoundedIcon onClick={onClickMore} />
        </div>
      </div>
    </>
  );
}

export default ChatHeader;
