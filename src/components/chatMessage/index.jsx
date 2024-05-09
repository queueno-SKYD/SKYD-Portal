import React , { useState } from "react";
import "./index.css"
import { CustomAvatar } from "../Avatar";

const ChatMessage = ({ message, isMine, time, senderName, senderImage, firstName, lastName }) => {
  return (
    <div
      className={`d-flex ${
        isMine ? "justify-content-end" : "justify-content-start"
      } mb-2 mt-2 gap-2`}
    >
      {!isMine && (
          <CustomAvatar src={senderImage} alt="User Avatar" firstName={firstName} lastName={lastName} size={30} />
        )}
      <div
        className={`px-2 py-0 d-flex arrorPointer ${isMine ? "arrorPointerRight" : "arrorPointerLeft"}`}
        style={{ borderRadius: "2px", backgroundColor: isMine ? "#93baf8" : "#faa3a3", maxWidth: "700px", minWidth: "200px" }}
      >
        <div className="w-100 text-blck">

          <small className="text-white small">
            {!isMine && senderName && <strong>{senderName}</strong>}
          </small>
          <div className={`mb-0 ${isMine ? "mt-2" : ""} chat-msg-text`}>{message}</div>
          <div className="small-right">
          <small className="text-white small">{time}</small>
          </div>
        </div>
      </div>
      {/* {isMine && senderImage && (
          <ImageWithFallback src={senderImage} alt="User Avatar" firstName={firstName} lastName={lastName} />
        )} */}
    </div>
  );
};

export default ChatMessage;
