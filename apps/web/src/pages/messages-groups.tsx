import Navbar from "../components/ui/navbar";
import PagesWrapper from "../components/ui/pages-wrapper";
import ChatsLinks from "../components/messages/chat-links";
import MessagesHead from "../components/messages/messages-head";
import GroupMessagesWrapper from "../components/groups-messages/group-messages-wrapper";

import profile1 from "/images/profile1.png"

export default function MessageGroups(){

    return(
        <PagesWrapper>
            <MessagesHead />
            {/* chat and group buttons container */}
            <ChatsLinks />
            
            <GroupMessagesWrapper groupName="Android Developer" lastMessage="Hello, do your homeworks? " lastMessagesTime="12:31" imageUrl={profile1}  />
            <GroupMessagesWrapper groupName="Web Developer" lastMessage="Hello, what's new?" lastMessagesTime="20:10" imageUrl={profile1}  />

            <Navbar />
        </PagesWrapper>
    )
}