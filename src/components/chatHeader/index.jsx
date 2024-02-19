import React from "react";
import "./index.css";
import { imageUrl } from "../../assets/index.ts";
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
          <span class={`material-symbols-outlined fs-5 ${iconColor}`} onClick={onClickComment}>chat</span>
        </div>
        <div className="width-10  text-center">
          <i class={`material-symbols-outlined ${iconColor}`} onClick={onClickAddGroup}>group_add</i>
        </div>
        <div className="width-10  text-center">
          <i class={`material-symbols-outlined ${iconColor}`} onClick={onClickMore}>more_vert</i>
        </div>
      </div>
    </>
  );
}

export default ChatHeader;
