import React from "react";
import ChatMessage from "../../components/chatMessage";

function ChatList() {
  const imageurl =
    "https://images.unsplash.com/photo-1533167649158-6d508895b680?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3BsYXNofGVufDB8fDB8fHww";
  return (
    <div className="w-100 d-flex flex-column align-items-center mt-5">
      <div className="card w-75">
        <div className="card-body">
          <div className="card-header text-center">Group chat</div>

          <div className="" style={{ height: 350, overflow: "scroll" }}>
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
            />
          </div>

          <div className="card-footer col-12 d-flex justify-space-between justify-content-between">
            <div className="col-10">
              <input
                type="text"
                className="form-control"
                id="inputPassword2"
                placeholder="Message here ......"
              />
            </div>

            <button className="btn btn-outline-primary btn-sm">
              <i
                class="fas fa-sync-alt fa-rotate-90"
                style={{ marginRight: 10 }}
              />
              Refresh
            </button>
            <button
              type="button"
              className=" btn btn-outline bg-primary text-white"
            >
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatList;
