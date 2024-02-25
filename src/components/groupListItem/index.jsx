import React from "react";
import { Badge } from "react-bootstrap";
import "./index.css";
import { CustomAvatar } from "../Avatar";
import { ButtonBase, Chip } from "@mui/material";
function GroupChatUser({
  userImage,
  seenStatus,
  userName,
  lastMessage,
  lastMessageTime,
  onClick,
  messageCount,
  selected,
  imageSize=50,
  lastSeen,
  done,
  isMe,
  isAdmin,
}) {
  return (
    <>
      <ButtonBase className={`d-flex flex-row w-100 justify-content-between pointer py-2 px-3 group-container-list ${selected ? "selected" : ""}`
        }
        onClick={onClick}
      >
        <div className="d-flex align-items-center justify-content-center">
          {/* <Image width={40} height={40} src={userImage} roundedCircle style={{objectFit:'cover'}} /> */}
        <CustomAvatar src={userImage} alt="User Avatar" firstName={userName} lastName={"lastName"} size={imageSize} />
        <div className="d-flex flex-column justify-content-center px-3">
          <div>
            <p className="text-bold text-start">{userName}</p>
          </div>
          <div className="d-flex flex-row mt-2" >
            <div>
              {lastSeen && <i class="material-symbols-outlined text-primary fs-5">
                done_all
              </i>}
              {done && <span class="material-symbols-outlined">done</span>}
              {isMe && <span className="text-status">You</span>}
            </div>
            <div className="text-message-wrapper text-message" >
              {lastMessage}
            </div>
          </div>
        </div>
        </div>
        <div className="d-flex flex-column align-items-end justify-content-end">
          <div>
            {lastMessageTime && <p className="text-time">{lastMessageTime}</p>}
            {isAdmin && <Chip label="Admin" />}
          </div>
          <div>
            {messageCount > 0 ? (
              <Badge bg="primary" className="rounded-circle m-2 text-message">
                {messageCount}
              </Badge>
            ) : null}
          </div>
        </div>
      </ButtonBase>
    </>
  );
}

export default GroupChatUser;
