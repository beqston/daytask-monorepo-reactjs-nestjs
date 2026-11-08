import usertag from "/images/profile/usertag.png"
import edit from "/images/profile/edit.png"
import arrowdown from "/images/profile/arrowdown.png"
import lock from "/images/profile/lock.png"
import privacy from "/images/profile/privacy.png"
import setting from "/images/profile/setting.png"
import task from "/images/profile/task.png"
import useradd from "/images/profile/useradd.png"
import Logout from "./logout"
import { useAppSelector } from "../../store/hooks"
import { useState } from "react"
import EditInput from "./edit-input"
import ProfileDetail from "./profile-detail"
import MyTasksList from "./my-tasks-list"

export interface InputWrapperPropsType{
    handleLogout: () => Promise<void>;
}

export default function InputsWrapper({handleLogout}:InputWrapperPropsType){
    const [showEdit, setShowEdit] = useState(false);
    const [showEditObj, setShowEditObj] = useState({
        name:"",
        pattern:"",
        type:"text"
    })
    const {user} = useAppSelector(state=>state.auth);
    const userObj = {
        fullName:user?.fullName,
        email:user?.email,
        password:""
    }

    function showEditinput(name="", pattern="", type="text"){
        const updatedObj = { name, pattern, type };
        setShowEditObj(updatedObj);
        setShowEdit(!showEdit)
    }

    function handleSubmit(){}

    
    return(
        <div>
            <form className="flex flex-col gap-2">
                <ProfileDetail onClick={()=>showEditinput("fullName", "(?=.{1,48}$)[a-zA-Z]+( [a-zA-Z]+)+", "text" )} leftImage={useradd} value={userObj.fullName} rightImage={edit}/>
                <ProfileDetail onClick={()=>showEditinput("email", "(?=.{1,254}$)[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,24}", "email" )} leftImage={usertag} value={userObj.email} rightImage={edit}/>
                <ProfileDetail onClick={()=>showEditinput("password", "(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,128}", "password" )} leftImage={lock} value="Password" rightImage={edit}/>
                <ProfileDetail leftImage={task} value="My Tasks" rightImage={arrowdown}/>
                <MyTasksList />
                <ProfileDetail leftImage={privacy} value="Privacy" rightImage={arrowdown}/>
                <ProfileDetail leftImage={setting} value="Setting" rightImage={arrowdown}/>
                <Logout handleLogout={handleLogout}/>
            </form>


            {
                showEdit && <EditInput name={showEditObj.name} pattern={showEditObj.pattern} type={showEditObj.type} handleOnSubmit={handleSubmit} setShowEdit={setShowEdit} />
            }

        </div>
    )
}