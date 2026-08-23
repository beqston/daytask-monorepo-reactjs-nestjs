import { NavLink } from "react-router-dom";
import type { NavLinkRenderProps } from "react-router-dom";

import HomeIcon from "../assets/icons/home.svg?react";
import MessagesIcon from "../assets/icons/messages.svg?react";
import CalendarIcon from "../assets/icons/calendar.svg?react";
import NotificationIcon from "../assets/icons/notification.svg?react";
import addsquare from "../assets/icons/addsquare.png";

export default function Navbar() {
  // function for active pages color
  const navLinkClasses = ({ isActive }:NavLinkRenderProps) =>
    `flex flex-col items-center gap-2 cursor-pointer transition-colors duration-200 ${
      isActive ? "text-[#FCD068]" : "text-[#768C9E]"
    }`;

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full lg:w-[50%] z-50 bg-primary-blue-200 h-22 p-4 items-center">
      <ul className="flex gap-8 justify-between items-center">
        
        <li>
          <NavLink to="/home" className={navLinkClasses}>
            <HomeIcon className="w-6 h-6" />
            <span className="text-sm font-medium">Home</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/messages" className={navLinkClasses}>
            <MessagesIcon className="w-6 h-6" />
            <span className="text-sm font-medium">Messages</span>
          </NavLink>
        </li>

        {/* central button */}
        <li className="bg-primary-yellow-100 cursor-pointer w-13.5 h-13.5 flex justify-center items-center rounded-lg">
          <img width={24} height={24} src={addsquare} alt="add icon" />
        </li>

        <li>
          <NavLink to="/calendar" className={navLinkClasses}>
            <CalendarIcon className="w-6 h-6" />
            <span className="text-sm font-medium">Calendar</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/notification" className={navLinkClasses}>
            <NotificationIcon className="w-6 h-6" />
            <span className="text-sm font-medium">Notification</span>
          </NavLink>
        </li>

      </ul>
    </nav>
  );
}