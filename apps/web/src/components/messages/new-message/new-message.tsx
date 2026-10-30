import NewMessageHead from "./new-message-head";
import PagesWrapper from "../../ui/pages-wrapper";
import CreateGroup from "./create-group";
import ChatUser from "./chat-user";


import profile from "/images/profile-default.png"

export interface NewMessageHeadProps {
    setIsNewMessage: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NewMessage({setIsNewMessage}:NewMessageHeadProps){
    return(
        <PagesWrapper>
            <NewMessageHead setIsNewMessage={setIsNewMessage} />
            <CreateGroup />
            <ChatUser name="Alexander" image={profile} alphabet="A" isNewAlphabet={true} />
            <ChatUser name="Asher" image={profile}  isNewAlphabet={false} />
            <ChatUser name="Avery" image={profile}  isNewAlphabet={false} />
            <ChatUser name="Benjamin" image={profile} alphabet="B" isNewAlphabet={true} />
        </PagesWrapper>
    )
}