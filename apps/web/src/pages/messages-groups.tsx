import Navbar from "../components/ui/navbar";
import PagesWrapper from "../components/ui/pages-wrapper";
import ChatsLinks from "../components/messages/chat-links";

export default function MessageGroups(){

    return(
        <PagesWrapper>
            <h1>messages grouyps page</h1>
                {/* chat and group buttons container */}
                <ChatsLinks />
            <Navbar />
        </PagesWrapper>
    )
}