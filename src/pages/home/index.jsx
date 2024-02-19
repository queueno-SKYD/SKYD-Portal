import React from 'react'
import ChatList from '../chatList'
import ChatHeader from '../../components/chatHeader'
import ChatSearch from '../../components/chatSearch'
import GroupChatUser from '../../components/groupChatUser'
import './index.css'

function Home() {
  return (
    <>
        <div className='col-12 d-flex flex-row'>
            <div className='col-5 inner-shadow '>
                <ChatHeader />

                <ChatSearch 
                    headerColor={"#E8E8E8E"}
                />

                <GroupChatUser 
                    userImage={"https://media.istockphoto.com/id/1212800014/photo/young-man-in-black-shirt-at-the-studio-with-gray-background-concept-with-face-close-up-and.webp?s=170667a&w=0&k=20&c=K7GLkFQciFmLi8IMTK7-DpzqaLo-hoQl-Yxr8Xz2BN8="}
                    userName={"Kanahiya lal"}
                    lastMessage={"Hello mote !"}
                    lastMessageTime={"12:10 PM"}
                    messageCount={2}
                />
            </div>
            <div className='col-7 position-relative'>
                <ChatList/>
            </div>
        </div>
    </>
  )
}

export default Home