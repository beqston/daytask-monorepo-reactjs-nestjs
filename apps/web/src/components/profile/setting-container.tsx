import { useState } from "react";
import SettingList from "./setting-list";

interface ProfileDetailProps{
    leftImage:string,
    rightImage:string,
    value:string,
}
export default function SettingContainer({ leftImage, rightImage, value}:ProfileDetailProps){
    const[showSetting, setShowSetting] = useState(false);

    function handleShowPrivacy(){
        setShowSetting(prev=>!prev);
    }
    return(
        <div className="mt-2">
            <div className="text-primary-grey-100 flex flex-col relative">
                <img src={leftImage} alt="icon" width={24} height={24} className={`absolute top-2 left-2`}/>
                <div className="outline-0 bg-light-blue-100 p-2 pl-10">
                    {value}
                </div>
                <img onClick={handleShowPrivacy} src={rightImage} alt="icon" width={24} height={24} className={`absolute right-2 top-2 cursor-pointer`}/>
            </div>

            {showSetting && <SettingList /> }
        </div>
    )
}