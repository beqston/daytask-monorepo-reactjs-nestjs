import Navbar from "../components/ui/navbar";
import PagesWrapper from "../components/ui/pages-wrapper";
import MessagesHead from "../components/messages/messages-head";
import ChatsLinks from "../components/messages/chat-links";
import MessageWrapper from "../components/messages/message-wrapper";

import profile1 from "/images/profile1.png"
import { useState } from "react";
import NewMessage from "../components/messages/new-message/new-message";


export default function Messages(){

    const [isNewMessage, setIsNewMessage] = useState(false);

    if(isNewMessage){
        return (
            <NewMessage  setIsNewMessage={setIsNewMessage} />
        )
    }

    return(
        <PagesWrapper>
                {/*head of messages page  */}
                <MessagesHead />

                {/* chat and group buttons container */}
                <ChatsLinks />

                {/* all messages container */}
                <div>
                    <MessageWrapper author="Jhon Doe" isReadMessage={false} lastMessage="Hello, i am jhon dddddddddd sssssssssssss sssssssssssssssssss" minuteAgo="31" imageUrl={profile1}  />
                    <MessageWrapper author="Jhon Doe" isReadMessage={true} lastMessage="Hello, i am jhon" minuteAgo="31" imageUrl={profile1}  />
                </div>

                <div onClick={()=>setIsNewMessage(true)} className="flex justify-end px-8 mt-4">
                    <button className="bg-primary-yellow-100 py-4 px-8" >Start Chat</button>
                </div>

                {/* site navbar links container */}
                <Navbar />
        </PagesWrapper>
    )
}