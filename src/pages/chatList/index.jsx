import React, { useEffect, useState } from 'react'
import ChatMessage from '../../components/chatMessage';
import UseWs from '../../api/ws';

function ChatList() {
  const imageurl = 'https://images.unsplash.com/photo-1533167649158-6d508895b680?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3BsYXNofGVufDB8fDB8fHww'
  // const socket = UseWs()
  const socket2 = UseWs("ws/v1/personal")
  const [msg, setMessage] = useState("");
  useEffect(() => {

    socket2.on("connect", (data) => {
      console.debug("🚀 -----------------------------------🚀")
      console.debug("🚀 ~ socket.on ~ console:", socket2.id)
      console.debug("🚀 -----------------------------------🚀")
    })
  }, [])
  
  socket2.on("recieavePrivate", (data) => {
    console.debug("🚀 -----------------------------------🚀")
    console.debug("🚀 ~ socket.on ~ recieavePrivate:", data)
    console.debug("🚀 -----------------------------------🚀")
  })

  const sendMessage = (msg) => {
    const data = {
      message: msg,
      receiverId: 30,
      sendAt: new Date()
    }
    console.debug("🚀 -------------------------------🚀")
    console.debug("🚀 ~ sendMessage ~ data:", data)
    console.debug("🚀 -------------------------------🚀")
    socket2.emit("sendMessage", data)
  }
  return (
    <div className="w-100 d-flex flex-column align-items-center mt-5">
      <div className="card w-75">
        <div className="card-body">
          <div className="card-header text-center">Group chat</div>

          <div className="" style={{height:350, overflow:'scroll',}}>
          <ChatMessage
        message="Hi! How are you?"
        isMine={false}
        time="12:35 PM"
        senderName="John Doe"
        senderImage={imageurl}
      />
          <ChatMessage
        message="Hello there!"
        isMine={true}
        time="12:30 PM"
        senderName="You"
        senderImage={imageurl}
      />
      <ChatMessage
        message="Hi! How are you?"
        isMine={false}
        time="12:35 PM"
        senderName="John Doe"
        senderImage={imageurl}
      />
          <ChatMessage
        message="Hello there!"
        isMine={true}
        time="12:30 PM"
        senderName="You"
        senderImage={imageurl}
      /><ChatMessage
      message="Hi! How are you?"
      isMine={false}
      time="12:35 PM"
      senderName="John Doe"
      senderImage={imageurl}
    />
        <ChatMessage
      message="Hello there!"
      isMine={true}
      time="12:30 PM"
      senderName="You"
      senderImage={imageurl}
    />
          </div>

          <div className="card-footer col-12 d-flex justify-space-between justify-content-between">
            <div className="col-2 bg-primary rounded text-center align-middle">kanahiya</div>
            <div className="col-7">
              <input
                type="text"
                className="form-control"
                id="inputPassword2"
                placeholder="Message here ......"
                value={msg}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="col-1 btn btn-outline bg-secondary text-white"
              onClick={() => sendMessage(msg)}
            >
              Send
            </button>
            <button
              type="button"
              className="col-1 btn btn-outline bg-secondary text-white"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatList
