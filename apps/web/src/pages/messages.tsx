import { NavLink } from "react-router-dom";
import Navbar from "../components/navbar";
import PagesWrapper from "../components/pages-wrapper";
import arrow from '/images/arrowleft.png'
import edit from '/images/edit.png'

export default function Messages(){
    const navLinkClasses = ({isActive}:{isActive:boolean})=>{
        return  `
            ${isActive? "bg-[#FED36A]":"bg-[#263238] "}
        `
    }
    return(
        <PagesWrapper>
                {/*head of messages page  */}
                <div className="flex justify-between pt-4 items-center ">
                    <div className="w-6 h-6">
                        <img src={arrow} className="bg-cover" alt="arrow" />
                    </div>
                    <h1 className="text-primary-pure-white text-2xl">Messages</h1>
                    <div className="w-6 h-6 cursor-pointer">
                        <img src={edit} className="bg-cover" alt="edit" />
                    </div>
                </div>

                {/* chat and group buttons container */}
                <div className="grid grid-cols-2 p-4 lg:p-8 gap-4">
                    <NavLink to={'/messages'} className={navLinkClasses}>Chat</NavLink>
                    <NavLink to={'/message-groups'} className={navLinkClasses}>Groups</NavLink>
                </div>

                <Navbar />
        </PagesWrapper>
    )
}