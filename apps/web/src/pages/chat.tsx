import { useParams } from "react-router-dom";
import PagesWrapper from "../components/ui/pages-wrapper";
import ChatHead from "../components/chat/chat-head";
import Message from "../components/chat/message";

export default function ChatPage({}){
    const params = useParams();

    console.log(params)
    return(
        <PagesWrapper>
            <ChatHead username="Jhon Doe" isActive={true} />

            <Message isAuthor={true} text="Hello Friend" isSeen={true} isManyMessage={false} />
            <Message isAuthor={false} text="Hello, what's up?" isManyMessage={false}/>
            <Message isAuthor={false} text="Hello, what's up?" isManyMessage={true}/>
        </PagesWrapper>
    )
}