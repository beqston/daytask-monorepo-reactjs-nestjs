import { NavLink, useLocation } from "react-router-dom";
import type { NavLinkRenderProps } from "react-router-dom";

import HomeIcon from "../../assets/icons/home.svg?react";
import MessagesIcon from "../../assets/icons/messages.svg?react";
import CalendarIcon from "../../assets/icons/calendar.svg?react";
import NotificationIcon from "../../assets/icons/notification.svg?react";
import addsquare from "../../assets/icons/addsquare.png";

export default function Navbar() {
  const location = useLocation();

  // check is active messages page
  const isMessageActive = location.pathname == "/messages" || location.pathname=="/message-groups";

  // style for link tags
  const getLinkClasses = (isActive: boolean) =>
    `flex flex-col items-center gap-2 cursor-pointer transition-colors duration-200 ${
      isActive ? "text-[#FCD068]" : "text-[#768C9E]"
    }`;

  // function for active pages color
  const navLinkClasses = ({ isActive }:NavLinkRenderProps) => getLinkClasses(isActive)

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full lg:w-[50%] z-50 bg-primary-blue-200 h-22 p-4 items-center">
      <ul className="flex gap-4 md:gap-8 justify-between items-center">
        
        <li>
          <NavLink to="/home" className={navLinkClasses}>
            <HomeIcon className="w-4 h-4 md:w-6 md:h-6 " />
            <span className="text-sm font-medium">Home</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/messages" className={getLinkClasses(isMessageActive)}>
            <MessagesIcon className="w-4 h-4 md:w-6 md:h-6" />
            <span className="text-sm font-medium">Messages</span>
          </NavLink>
        </li>

        {/* central button */}
        <li className="bg-primary-yellow-100 cursor-pointer min-w-8 min-h-8 md:w-13.5 md:h-13.5 flex justify-center items-center rounded-lg">
          <img width={24} height={24} src={addsquare} alt="add icon" />
        </li>

        <li>
          <NavLink to="/calendar" className={navLinkClasses}>
            <CalendarIcon className="w-4 h-4 md:w-6 md:h-6" />
            <span className="text-sm font-medium">Calendar</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/notification" className={navLinkClasses}>
            <NotificationIcon className="w-4 h-4 md:w-6 md:h-6" />
            <span className="text-sm font-medium">Notification</span>
          </NavLink>
        </li>

      </ul>
    </nav>
  );
}