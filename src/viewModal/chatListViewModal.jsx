import { useEffect, useState } from "react";
import moment from "moment";
import { useAppContext } from "../context/app.context";
import url from "../api/url.ts";
import useAxios from "../api/restClient";
import { dangerToast } from "../components/customToast/index.js";

const ChatListViewModal = () => {
  const axios = useAxios();
  const [messagesList, setMessagesList] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedGroup, setSelectedGroup] = useState()
  const loginStore = useAppContext();

  // API call to get messages
  const callToGetMessages = async () => {
    try {
      let param = {
        groupId:selectedGroup?.groupId
      }
      const response = await axios.post(url.getGroupChats, param);
        if (response?.statusCode === 200) {
          const output = response?.data;
          const status = response?.httpStatus;
          if (output && status === "OK") {
            setMessagesList(output);
            console.log("Message sent ");
          } else {
            console.log("Message sent Error");
            dangerToast("something went wrong !")
          }
        }
    } catch (error) {
      console.log("Error ---->", error)
      dangerToast("something went wrong !")
      
    }
    
  };

  // API call to send message
  const callToSendMessage = async (e) => {
    e.preventDefault();
    let chatMessage ={
        senderId: 2,
        message: message,
        groupId: selectedGroup?.groupId,
        createdAt: new Date().toUTCString(),
    }
    const response = await axios.post(url.sendMessgae, chatMessage);
    console.log("response------->", response)
      if (response?.statusCode === 200) {
        const status = response?.httpStatus;
        if (status === "OK") {
          console.log("Message sent ");
          callToGetMessages();
        } else {
          console.log("Message sent Error");
          dangerToast("something went wrong !")
        }
      }
    setMessage("");


  };

  // Function to get time difference for chat
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
  return {
    messagesList,
    getTimeDifferenceForChat,
    callToGetMessages,
    callToSendMessage,
    message,
    setMessage,
    setSelectedGroup
  };
};

export default ChatListViewModal;
