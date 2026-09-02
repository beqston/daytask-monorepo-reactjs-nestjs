import NewMessageHead from "./new-message-head";
import PagesWrapper from "../../ui/pages-wrapper";

export interface NewMessageHeadProps {
    setIsNewMessage: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NewMessage({setIsNewMessage}:NewMessageHeadProps){
    return(
        <PagesWrapper>
            <NewMessageHead setIsNewMessage={setIsNewMessage} />
        </PagesWrapper>
    )
}