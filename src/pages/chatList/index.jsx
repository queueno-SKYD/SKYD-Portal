import React, { useState, useRef, useEffect } from "react";
import ChatMessage from "../../components/chatMessage";
import Card from "../../components/Card";
import moment from "moment";
import { useLogin } from "../../context/login.context";
import "./index.css";
import GroupList from "../home";
import ChatHeader from "../../components/chatHeader";
import ChatSearch from "../../components/chatSearch";
import GroupChatUser from "../../components/groupChatUser";

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

function ChatList() {
  const { user } = useLogin();
  const messagesEndRef = useRef(null);
  console.debug(user?.userId, user);
  const [messagesList, setMessagesList] = useState(messages);
  const [msg, setMsg] = useState("");
  const inputDivRef = useRef(null);

  // Function to read the content of the div
  const readContent = () => {
    if (inputDivRef.current) {
      const content = inputDivRef.current.innerText;
      const placeholder = inputDivRef.current.getAttribute("data-placeholder");
      inputDivRef.current.innerText = "";
      return content === placeholder ? "" : content;
    }
    return "";
  };

  // Function to add placeholder content if the div is empty
  const addPlaceholder = () => {
    if (inputDivRef.current) {
      if (inputDivRef.current.textContent.trim() === "") {
        inputDivRef.current.textContent =
          inputDivRef.current.getAttribute("data-placeholder");
      }
    }
  };

  // Call addPlaceholder when component mounts to add placeholder initially
  React.useEffect(() => {
    addPlaceholder();
  }, []);
  const sendMessage = (e) => {
    e.preventDefault();
    const msg = readContent();
    console.debug("🚀 -----------------------------🚀");
    console.debug("🚀 ~ sendMessage ~ msg:", msg);
    console.debug("🚀 -----------------------------🚀");
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
      scrollToBottom();
    }
  };
  const scrollToBottom = () => {
    if (messagesEndRef?.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };
  const clearPlaceholder = () => {
    if (inputDivRef.current) {
      const placeholder = inputDivRef.current.getAttribute("data-placeholder");
      if (inputDivRef.current.textContent.trim() === placeholder) {
        inputDivRef.current.textContent = "";
      }
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messagesList]);

  return (
    <>
      <div className="inner overflow-auto" id="messages" ref={messagesEndRef}>
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
      <div id="inputBox">
        <di className="w-100 h-100 d-flex flex-column align-self-center inputArea mb-1">
          {/* <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias neque accusantium culpa libero quaerat amet, est tempora itaque aspernatur rem necessitatibus quasi consequuntur voluptatem illo quae voluptatibus pariatur ab molestias suscipit sit facilis deleniti recusandae. Impedit odio alias ex veniam neque expedita architecto sint quam ratione incidunt voluptatibus nesciunt fuga excepturi laboriosam cum iure autem ipsam exercitationem numquam tempora, vel dolor id natus! Impedit, ipsam labore! Ex odit animi vero architecto neque, voluptas excepturi placeat commodi, eveniet, eius repellendus optio ullam omnis cum eaque rem iure incidunt unde repudiandae aliquid quaerat ipsa a numquam sequi. Sapiente tempora nisi eligendi eum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quisquam repellat mollitia quae, totam non, est aliquam iusto similique cupiditate nesciunt nemo recusandae maiores. Quod distinctio, ab eligendi expedita natus tenetur magni? Nulla quisquam excepturi at. Ducimus consequatur corrupti nostrum praesentium! Maxime libero voluptates eligendi quas sequi? Consectetur aliquid quibusdam, ut laudantium accusantium ab nam ea ex voluptate sapiente animi hic voluptatum necessitatibus dignissimos quam dolore enim temporibus architecto quidem, est adipisci tempore officia! Aperiam odit maxime architecto quo aliquam hic, porro, praesentium aspernatur fugit earum, quaerat dolores impedit enim. Mollitia, tempora asperiores eaque harum placeat deleniti quidem dignissimos nam corporis facere facilis consequuntur. Aspernatur ex cumque dignissimos ratione quos perspiciatis fugiat alias, ipsam assumenda nobis, eaque amet dicta. Dignissimos ea alias recusandae repudiandae saepe harum nemo, laboriosam reprehenderit earum aspernatur, eum commodi numquam sit atque et quas optio natus tempora neque error. Accusantium beatae voluptas neque culpa consequuntur eligendi aperiam labore, sunt unde explicabo minima cumque eveniet optio fugiat porro harum placeat animi cupiditate facilis autem perferendis non hic, omnis eaque! Quis, ullam. Illum earum est delectus voluptatibus eaque quam sunt explicabo, quidem libero at nihil doloremque sequi, iure debitis qui! Rem dolores tenetur, ad odio iure laudantium neque.
          </p> */}
          <form className="form w-100 h-100 d-flex justify-space-between justify-content-between gap-2 align-items-end">
            <div
              className="w-100 h-100"
              id="inputMessage"
              contentEditable
              ref={inputDivRef}
              data-placeholder="Enter text here..." // Set the placeholder using data-* attribute
              onBlur={addPlaceholder}
              onFocus={clearPlaceholder}
            ></div>
            <button
              type="button"
              className=" btn btn-outline bg-secondary text-white send"
              onClick={(e) => sendMessage(e)}
            >
              <i class="fas fa-paper-plane"></i>
            </button>
          </form>
        </di>
      </div>
    </>
  );
}

export default ChatList;
