import NewMessageHead from "./new-message-head";
import PagesWrapper from "../../ui/pages-wrapper";
import CreateGroup from "./create-group";
import ChatUser from "./chat-user";


import profile1 from "/images/profile1.png"

export interface NewMessageHeadProps {
    setIsNewMessage: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NewMessage({setIsNewMessage}:NewMessageHeadProps){
    return(
        <PagesWrapper>
            <NewMessageHead setIsNewMessage={setIsNewMessage} />
            <CreateGroup />
            <ChatUser name="Alexander" image={profile1} alphabet="A" isNewAlphabet={true} />
            <ChatUser name="Asher" image={profile1}  isNewAlphabet={false} />
            <ChatUser name="Avery" image={profile1}  isNewAlphabet={false} />
            <ChatUser name="Benjamin" image={profile1} alphabet="B" isNewAlphabet={true} />
        </PagesWrapper>
    )
}