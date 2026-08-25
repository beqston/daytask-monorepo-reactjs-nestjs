import { NavLink } from "react-router-dom";

export default function ChatsLinks(){
    const navLinkClasses = ({isActive}:{isActive:boolean})=>{
        return  `
            ${isActive? "bg-[#FED36A]":"bg-[#263238]"} p-4 ${isActive?"text-primary-blue-200":"text-primary-pure-white"}
        `
    }

    return(
        <div className="grid grid-cols-2  lg:p-8 gap-4 text-center">
            <NavLink to={'/messages'} className={navLinkClasses}>Chat</NavLink>
            <NavLink to={'/message-groups'} className={navLinkClasses}>Groups</NavLink>
        </div>
    )
}
