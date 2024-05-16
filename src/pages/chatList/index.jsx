import React, { useState, useRef, useEffect } from "react";
import ChatMessage from "../../components/chatMessage";
import moment from "moment";
import "./index.css";
import { Button } from "@mui/material";
import { SendRounded } from "@mui/icons-material";
import GroupHeader from "../../components/GroupHead";
import GroupInfo from "./groupInfo/groupInfo";
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import Fab from '@mui/material/Fab';
import UseWs from "../../api/ws";
import { useAppContext } from "../../context/app.context";
import useAxios from "../../api/restClient";
import { PAGE_SIZE } from "../../helper/constants/constant.ts";
import url from "../../api/url.ts";
import { dangerToast } from "../../components/customToast/index.js";

function getTimeDifferenceForChat(sendAt) {
  const messageTime = moment(sendAt);
  const currentTime = moment();
  const diffInMinutes = currentTime.diff(messageTime, "minutes");

  if (diffInMinutes < 1) {
    return "Just now";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  } else if (diffInMinutes < 24 * 60) {
    const diffInHours = Math.floor(diffInMinutes / 60);
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  } else if (diffInMinutes < 7 * 24 * 60) {
    const diffInDays = Math.floor(diffInMinutes / (24 * 60));
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  } else {
    return messageTime.format("MMM D, YYYY");
  }
}

const ChatList = ({selectedGroup, onBack}) => {
  // const { user } = useAppContext();
  const axios = useAxios();
  const messagesEndRef = useRef(null);
  const groupSocket = UseWs("ws/v1/group");
  const { user } = useAppContext();

  const [messages, setMessages] = useState([]);
  const [hasMore, setHasMore] = useState(true); // Assume there's more data initially
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const [isNearTop, setIsNearTop] = useState(false);

  const divRef = useRef(null);
  const [height, setHeight] = useState('auto');

  const autoResize = (event) => {
    const textarea = event.target;
    setMsg(event.target.value)
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
      console.debug("In this")
      event.preventDefault();
      autoResize(event);
    }
  };

  useEffect(() => {
    // Set initial content of the div
    if (divRef.current)
      divRef.current.textContent = msg;
  }, [msg]);


  useEffect(() => {
    if (!groupSocket || !selectedGroup?.groupId) return;

    groupSocket.on("connect", () => {
      console.log("Connected to group socket");
      groupSocket.emit('joinGroup', selectedGroup?.groupId);
    });

    groupSocket.on("onNewGroupMessage", (data) => {
      console.log("Received group message:", data);
      setMessages((prevMessages) => [...prevMessages, data]);
      scrollToBottom("new msg event");
    });

    return () => {
      groupSocket.off("onNewGroupMessage");
    };
  }, [groupSocket, selectedGroup]);

  const sendMessageWs = () => {
    const data = {
      message: msg,
      recipientId: selectedGroup?.groupId,
      sendAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    }
    groupSocket.emit("sendGroupMessage", data)
  }
  const sendMessage = (e) => {
    console.debug("form submit", e)
    e.preventDefault();
    if (msg) {
      sendMessageWs();
      setMsg("");
      setHeight("auto")
      setTimeout(() => {
        scrollToBottom("send msg event");
      }, 150)
    }
  };

  const [isNotAtBottom, setIsNotAtBottom] = useState(undefined);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = messagesEndRef?.current;

    // Check if the scroll position is not at the bottom
    setIsNotAtBottom(scrollHeight > 100 ? (scrollTop + clientHeight) < scrollHeight : undefined);
    // console.debug("scrollTop, scrollHeight, clientHeight, isNotAtBottom", scrollTop, scrollHeight, clientHeight, isNotAtBottom)
    setIsNearTop(scrollTop < 350)
  };

  const fetchMessages = async (groupId, isScrollToTop=false) => {
    try {
      setIsLoading(true);
      if (groupId) {
        const response = await axios.post(url.getGroupMessage, {
          groupId,
          page: currentPage,
          pageSize: PAGE_SIZE,
        });
        if (response?.statusCode === 200) {
          const output = response?.data;
          console.debug("🚀 -------------------------------------🚀")
          console.debug("🚀 ~ fetchMessages ~ output:", output)
          console.debug("🚀 -------------------------------------🚀")
          const newMessages = output?.data.reverse(); // Reverse to get oldest to newest order
          setMessages((prevMessages) => [...newMessages, ...prevMessages]);
          if (!isScrollToTop) {
            setTimeout(() => {
              scrollToBottom("API load");
            }, 150)
          }
          if (output.data.length === PAGE_SIZE) {
            setHasMore(true);
            setCurrentPage((prevPage) => prevPage + 1);
          } else {
            setHasMore(false)
          }
        }
      }
    } catch (error) {
      console.debug(error);
      dangerToast(error.message);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const fetchMoreData = (groupId) => {
    fetchMessages(groupId, true);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setMessages([])
    setCurrentPage(1)
    setHasMore(true)
    fetchMessages(selectedGroup?.groupId);
  }, [selectedGroup]);

  useEffect(() => {
    if (currentPage > 1 && isNearTop ) {
      fetchMoreData(selectedGroup?.groupId);
    }
  }, [isNearTop, selectedGroup, currentPage])

  const scrollToBottom = (log) => {
    messagesEndRef.current.scrollTop = messagesEndRef?.current?.scrollHeight;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setIsNotAtBottom(false); 
  }

  return (
    <div>
      <GroupHeader
        selectedGroup={selectedGroup}
        onBack={onBack}
        chat={
          <div id="chat-container" className="h-100 d-flex flex-column">
            <div ref={messagesEndRef} className="inner overflow-auto custom-scroll" id="top" onScroll={handleScroll}>
            {messages?.length > 0 &&
                messages?.map((item, index) => {
                  return (
                    <ChatMessage
                      key={index}
                      message={item?.message}
                      isMine={user?.userId === item?.senderId}
                      time={getTimeDifferenceForChat(item?.sendAt)}
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
                onSubmit={sendMessage}
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
                  value={msg}
                ></textarea>
                <div className="button-container">
                  <Button
                    variant="text"
                    id="msg-send"
                    disabled={!msg}
                    type="submit"
                    value={msg}
                  >
                    <SendRounded />
                  </Button>
                </div>
              </form>
              {isNotAtBottom && <Fab size="medium" color="secondary" aria-label="go to end" onClick={scrollToBottom} id="scroll-to-bottom-cta">
                  <ExpandMoreRoundedIcon/>
                </Fab>}
            </div>  
          </div>
        }
        info={
          <div id="chat-container" className="h-100 d-flex flex-column">
            <div className="inner overflow-auto custom-scroll">
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
