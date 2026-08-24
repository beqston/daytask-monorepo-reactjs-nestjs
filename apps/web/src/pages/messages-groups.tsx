import { NavLink } from "react-router-dom";
import Navbar from "../components/navbar";
import PagesWrapper from "../components/pages-wrapper";

export default function MessageGroups(){
        const navLinkClasses = ({isActive}:{isActive:boolean})=>{
        return  `
            ${isActive? "bg-[#FED36A]":"bg-[#263238] "}
        `
    }
    return(
        <PagesWrapper>
            <h1>messages grouyps page</h1>
                {/* chat and group buttons container */}
                <div className="grid grid-cols-2 p-4 lg:p-8 gap-4">
                    <NavLink to={'/messages'} className={navLinkClasses}>Chat</NavLink>
                    <NavLink to={'/message-groups'} className={navLinkClasses}>Groups</NavLink>
                </div>
            <Navbar />
        </PagesWrapper>
    )
}