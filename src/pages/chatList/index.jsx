import React, { useState, useRef, useEffect } from "react";
import ChatMessage from "../../components/chatMessage";
import "./index.css";
import { Button } from "@mui/material";
import { SendRounded } from "@mui/icons-material";
import GroupHeader from "../../components/GroupHead";
import GroupInfo from "./groupInfo/groupInfo";
import ChatListViewModal from "../../viewModal/chatListViewModal.jsx";





const ChatList = ({selectedGroup, onBack}) => {
  const {callToGetMessages,getTimeDifferenceForChat,message,setMessage,callToSendMessage,messagesList,setSelectedGroup} = ChatListViewModal();

  const messagesEndRef = useRef(null);
  const divRef = useRef(null);
  const [height, setHeight] = useState('auto');

  const autoResize = (event) => {
    const textarea = event.target;
    setMessage(event.target.value)
    textarea.style.height = 'auto';
    if (textarea.scrollHeight < 300) {
      textarea.style.height = `${textarea.scrollHeight}px`;
      setHeight(`${textarea.scrollHeight}px`);
    } else {
      textarea.style.height = `${300}px`;
      setHeight('300px')
    }
  };

  const checkKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      autoResize(event);
    }
  };
  

  useEffect(() => {
    // Set initial content of the div
    // if (divRef.current)
    //   divRef.current.textContent = message;
    //   console.log("selectedGroup =====> ",selectedGroup);
      setSelectedGroup(selectedGroup);
      callToGetMessages();
  }, [selectedGroup]);


  // const handleContentChange = (event) => {
  //   setMsg(event.target.textContent);
  //   // Do whatever you need with the new content
  // };
  // Call addPlaceholder when component mounts to add placeholder initially

  // const sendMessage = (e) => {
  //   console.debug("form submit", e)
  //   e.preventDefault();
  //   if (message) {
  //     setMessagesList((item) => {
  //       return [
  //         ...item,
  //         {
  //           imageUrl:
  //             "https://images.unsplash.com/photo-1519363814881-9f4b382ca005?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3BsYXNofGVufDB8fDB8fHww",
  //           firstName: "Dheeraj",
  //           lastName: "Shrivastva",
  //           sendAt: new Date().toUTCString(),
  //           senderId: 25,
  //           message: message,
  //         },
  //       ];
  //     });
  //     setMessage("");
  //     setHeight("auto")
  //     scrollToBottom();
  //   }
  // };
  const scrollToBottom = () => {
    if (messagesEndRef?.current) {
      console.debug("sdssds")
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <div>
      <GroupHeader
        selectedGroup={selectedGroup}
        onBack={onBack}
        chat={
          <div id="chat-container" className="h-100 d-flex flex-column">
            <div className="inner overflow-auto custom-scroll" id="top" ref={messagesEndRef}>
              {messagesList?.length > 0 &&
                messagesList?.map((item, index) => {
                  return (
                    <ChatMessage
                      key={index}
                      message={item?.message}
                      isMine={2 === item?.userId}
                      time={getTimeDifferenceForChat(item?.createdAt)}
                      senderName={`${item?.firstName} ${item?.lastName}`}
                      senderImage={item?.imageUrl}
                      firstName={item?.firstName}
                      lastName={item?.lastName}
                    />
                  );
                })}
            </div>
            <div id="inputBox" className="w-100 h-100">
              <form
                className="w-100 h-100 form d-flex justify-space-between justify-content-between gap-2 align-items-end inputArea"
                onSubmit={callToSendMessage}
              >
                <textarea
                  className={`w-100 custom-scroll`}
                  id="inputMessage"
                  spellCheck
                  placeholder="Type your message"
                  rows={1}
                  style={{ height: height }}
                  onChange={autoResize}
                  onScroll={autoResize}
                  onKeyDown={checkKeyPress}
                  value={message}
                ></textarea>
                <div className="button-container">
                  <Button
                    variant="text"
                    id="msg-send"
                    disabled={!message}
                    type="submit"
                    value={message}
                  >
                    <SendRounded />
                  </Button>
                </div>
              </form>
            </div>  
          </div>
        }
        info={
          <div id="chat-container" className="h-100 d-flex flex-column">
            <div className="inner overflow-auto custom-scroll" ref={messagesEndRef}>
              <GroupInfo groupDetails={selectedGroup} />
            </div>
          </div>
        }
      />
      {/*  */}
    </div>
  );
}

export default ChatList;
