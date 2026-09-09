import EarlierNotification from "../components/notification/earlier-notification";
import NewNotification from "../components/notification/new-notification";
import NotificatonHead from "../components/notification/notofication-head";
import Navbar from "../components/ui/navbar";
import PagesWrapper from "../components/ui/pages-wrapper";

export default function Notification(){
    return(
        <PagesWrapper>
            <NotificatonHead />
            <NewNotification />
            <EarlierNotification />
            <Navbar />
        </PagesWrapper>
    )
}