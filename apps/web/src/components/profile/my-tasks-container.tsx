import { useState } from "react";
import MyTasksList from "./my-tasks-list";
import ProfileDetail from "./profile-detail";

interface MyTasksContainerProps{
    leftImage:string,
    rightImage:string,

}

export default function MyTasksContainer({leftImage, rightImage}:MyTasksContainerProps){
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