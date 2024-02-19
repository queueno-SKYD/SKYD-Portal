import React from "react";
import { Badge, Image } from "react-bootstrap";
import "./index.css";
function GroupChatUser({
  userImage,
  seenStatus,
  userName,
  lastMessage,
  lastMessageTime,
  onClick,
  messageCount,
}) {
  return (
    <>
      <div className="d-flex flex-row w-100 col-12 bg-light  bg-active mt-2 py-2" >
        <div className="col-1  d-flex align-items-center justify-content-center">
          <Image width={40} height={40} src={userImage} roundedCircle style={{objectFit:'cover'}} />
        </div>
        <div className="col-9  d-flex flex-column justify-content-center ph-10">
          <div>
            <p className="text-name text-bold">{userName}</p>
          </div>
          <div className="d-flex flex-row mt-2" >
            <div>
              <i class="material-symbols-outlined text-primary fs-5">
                done_all
              </i>
              {/* <span class="material-symbols-outlined">done</span> */}
              {/* <span className="text-status">You</span> */}
            </div>
            <div className="ph-5 text-message-wrapper text-message" >
              {lastMessage}
            </div>
          </div>
        </div>
        <div className="col-2  d-flex flex-column align-items-end justify-content-center ph-10">
          <div>
            <p className="text-time">{lastMessageTime}</p>
          </div>
          <div>
            {messageCount > 0 ? (
              <Badge bg="primary" className="rounded-circle m-2 text-message">
                {messageCount}
              </Badge>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default GroupChatUser;
