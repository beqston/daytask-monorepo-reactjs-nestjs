import Navbar from "../components/ui/navbar";
import PagesWrapper from "../components/ui/pages-wrapper";
import MessagesHead from "../components/messages/messages-head";
import ChatsLinks from "../components/messages/chat-links";
import MessageWrapper from "../components/messages/message-wrapper";

import profile1 from "/images/profile1.png"
import { Link } from "react-router-dom";


export default function Messages(){

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

                <div className="flex justify-end px-8 mt-4">
                    <Link to={'/messages'} className="bg-primary-yellow-100 py-4 px-8" >Start Chat</Link>
                </div>

                {/* site navbar links container */}
                <Navbar />
        </PagesWrapper>
    )
}