import React, { useState, useRef, useEffect } from "react";
import ChatMessage from "../../components/chatMessage";
import moment from "moment";
import "./index.css";
import { Button } from "@mui/material";
import { SendRounded } from "@mui/icons-material";
import GroupHeader from "../../components/GroupHead";
import GroupInfo from "./groupInfo/groupInfo";

const messages = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1533167649158-6d508895b680?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3BsYXNofGVufDB8fDB8fHww",
    firstName: "John",
    lastName: "Doe",
    sendAt: "Thu, 11 Jan 2024 13:56:18 GMT",
    senderId: 23,
    message: "How are you?",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3BsYXNofGVufDB8fDB8fHww",
    firstName: "Alice",
    lastName: "Smith",
    sendAt: "Fri, 12 Jan 2024 08:20:42 GMT",
    senderId: 45,
    message:
      "I'm doing well, thank you! how about you? do you want to have some dinner with bob? he is smart guy",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1520697966256-358ab2b720f2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3BsYXNofGVufDB8fDB8fHww",
    firstName: "Emily",
    lastName: "Johnson",
    sendAt: "Sat, 13 Jan 2024 15:30:05 GMT",
    senderId: 67,
    message: "Nice weather today!",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1519363814881-9f4b382ca005?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3BsYXNofGVufDB8fDB8fHww",
    firstName: "Dheeraj",
    lastName: "Shrivastva",
    sendAt: "Sun, 14 Jan 2024 10:45:30 GMT",
    senderId: 25,
    message:
      "Hello everyone! Please let me know if you have any issue on chat app",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1486842575568-b63e9f8ea1e3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNwbGFzaHxlbnwwfHwwfHx8",
    firstName: "Sophia",
    lastName: "Wilson",
    sendAt: "Mon, 15 Jan 2024 12:10:15 GMT",
    senderId: 1011,
    message: "Good morning!",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1512316806173-83cce75b4cc0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BsYXNofGVufDB8fDB8fHww",
    firstName: "Liam",
    lastName: "Martinez",
    sendAt: "Tue, 16 Jan 2024 09:55:20 GMT",
    senderId: 1213,
    message: "What's up?",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1519363814881-9f4b382ca005?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3BsYXNofGVufDB8fDB8fHww",
    firstName: "Dheeraj",
    lastName: "Shrivastva",
    sendAt: "Sun, 14 Jan 2024 10:45:30 GMT",
    senderId: 25,
    message: "I'm excited for the weekend!",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1528901166006-7a93d63d2838?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3BsYXNofGVufDB8fDB8fHww",
    firstName: "Olivia",
    lastName: "Garcia",
    sendAt: "Wed, 17 Jan 2024 14:20:55 GMT",
    senderId: 1415,
    message: "Me to!",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1524989188314-62ea5fee6b2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3BsYXNofGVufDB8fDB8fHww",
    firstName: "Ethan",
    lastName: "Rodriguez",
    sendAt: "Thu, 18 Jan 2024 11:35:40 GMT",
    senderId: 1617,
    message: "Let's catch up soon!",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1512626120414-a26aee18a8e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3BsYXNofGVufDB8fDB8fHww",
    firstName: "Ava",
    lastName: "Hernandez",
    sendAt: "Fri, 19 Jan 2024 08:45:25 GMT",
    senderId: 1819,
    message: "How was your day?",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1519363814881-9f4b382ca005?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3BsYXNofGVufDB8fDB8fHww",
    firstName: "Dheeraj",
    lastName: "Shrivastva",
    sendAt: "Sun, 14 Jan 2024 10:45:30 GMT",
    senderId: 25,
    message: "fine",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1506405391164-9cf726a3e6c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNwbGFzaHxlbnwwfHwwfHx8",
    firstName: "Noah",
    lastName: "Lopez",
    sendAt: "Sat, 20 Jan 2024 16:30:50 GMT",
    senderId: 2021,
    message: "I'm looking forward to the party!",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1505238680356-667803448bb6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHNwbGFzaHxlbnwwfHwwfHx8",
    firstName: "Isabella",
    lastName: "Young",
    sendAt: "Sun, 21 Jan 2024 09:10:35 GMT",
    senderId: 2223,
    message: "Happy Sunday!",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1510936110437-01396c161fbb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fHNwbGFzaHxlbnwwfHwwfHx8",
    firstName: "Mason",
    lastName: "Perez",
    sendAt: "Mon, 22 Jan 2024 12:40:20 GMT",
    senderId: 2425,
    message: "Have a great day!",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1512455105856-d1577b2ebfbd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHNwbGFzaHxlbnwwfHwwfHx8",
    firstName: "Charlotte",
    lastName: "Flores",
    sendAt: "Tue, 23 Jan 2024 14:55:15 GMT",
    senderId: 2627,
    message: "Looking forward to seeing you!",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1517577644210-67241a3dbec3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHNwbGFzaHxlbnwwfHwwfHx8",
    firstName: "Landon",
    lastName: "Gonzalez",
    sendAt: "Wed, 24 Jan 2024 11:20:30 GMT",
    senderId: 2829,
    message: "Have a wonderful day ahead!",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1535124644144-5953a4e9d786?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fHNwbGFzaHxlbnwwfHwwfHx8",
    firstName: "Lucas",
    lastName: "Martinez",
    sendAt: "Thu, 25 Jan 2024 09:45:10 GMT",
    senderId: 3031,
    message: "Let's meet up soon!",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1537634111690-27c47bf4d79d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHNwbGFzaHxlbnwwfHwwfHx8",
    firstName: "Harper",
    lastName: "Lee",
    sendAt: "Fri, 26 Jan 2024 13:10:25 GMT",
    senderId: 3233,
    message: "Have a fantastic weekend!",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1519178616873-39f10e56e057?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHNwbGFzaHxlbnwwfHwwfHx8",
    firstName: "Evelyn",
    lastName: "Harris",
    sendAt: "Sat, 27 Jan 2024 10:25:40 GMT",
    senderId: 3435,
    message: "Enjoy your day!",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1515769859881-3f9e000c43d2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHNwbGFzaHxlbnwwfHwwfHx8",
    firstName: "Alexander",
    lastName: "Clark",
    sendAt: "Sun, 28 Jan 2024 09:30:55 GMT",
    senderId: 3637,
    message: "Sending positive vibes your way!",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1517058619449-e2a39e1b423d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHNwbGFzaHxlbnwwfHwwfHx8",
    firstName: "William",
    lastName: "Walker",
    sendAt: "Mon, 29 Jan 2024 11:15:20 GMT",
    senderId: 3839,
    message: "Have a productive day!",
  },
];

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
  const messagesEndRef = useRef(null);

  const [messagesList, setMessagesList] = useState(messages);
  const [msg, setMsg] = useState("");
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
      event.preventDefault();
      autoResize(event);
    }
  };

  useEffect(() => {
    // Set initial content of the div
    if (divRef.current)
      divRef.current.textContent = msg;
  }, [msg]);


  // const handleContentChange = (event) => {
  //   setMsg(event.target.textContent);
  //   // Do whatever you need with the new content
  // };
  // Call addPlaceholder when component mounts to add placeholder initially

  const sendMessage = (e) => {
    console.debug("form submit", e)
    e.preventDefault();
    if (msg) {
      setMessagesList((item) => {
        return [
          ...item,
          {
            imageUrl:
              "https://images.unsplash.com/photo-1519363814881-9f4b382ca005?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3BsYXNofGVufDB8fDB8fHww",
            firstName: "Dheeraj",
            lastName: "Shrivastva",
            sendAt: new Date().toUTCString(),
            senderId: 25,
            message: msg,
          },
        ];
      });
      setMsg("");
      setHeight("auto")
      scrollToBottom();
    }
  };
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
  }, [messagesList]);

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
                      isMine={25 === item?.senderId}
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
