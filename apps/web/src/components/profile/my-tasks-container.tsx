import { useState } from "react";
import MyTasksList from "./my-tasks-list";
import ProfileDetail from "./profile-detail";
import type { ProfileDetailsProps } from "../../types/profile-details-props";


export default function MyTasksContainer({leftImage, rightImage}:ProfileDetailsProps){
    const [showDetails, setSHowDetails] = useState(false);
    function showTasks(){
        setSHowDetails(prev=>!prev);
    }
    return(
       <>
        <ProfileDetail onClick={showTasks} leftImage={leftImage} value="My Tasks" rightImage={rightImage}/>

        {
            showDetails &&  <MyTasksList />
        }
       </>
    )
}