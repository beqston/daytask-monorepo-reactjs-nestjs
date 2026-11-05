import usertag from "/images/profile/usertag.png"
import edit from "/images/profile/edit.png"
import arrowdown from "/images/profile/arrowdown.png"
import lock from "/images/profile/lock.png"
import privacy from "/images/profile/privacy.png"
import setting from "/images/profile/setting.png"
import task from "/images/profile/task.png"
import useradd from "/images/profile/useradd.png"
import Input from "../ui/input"
import Logout from "./logout"
import { useAppSelector } from "../../store/hooks"
import { useState } from "react"
import EditInput from "./edit-input"

export interface InputWrapperPropsType{
    handleLogout: () => Promise<void>;
}

export default function InputsWrapper({handleLogout}:InputWrapperPropsType){
    const [showEditObj, setShowEditObj] = useState({
        name:"",
        pattern:"",
        type:"text"
    })
    const {user} = useAppSelector(state=>state.auth);
    const [userObj, setUserObj] = useState({
        fullName:user?.fullName,
        email:user?.email,
        password:""
    })

    function showEditinput(name="", pattern="", type="text"){
        const updatedObj = { name, pattern, type };
        setShowEditObj(updatedObj);
    }

    function handleSubmit(){}

    return(
        <div>
            <form className="flex flex-col gap-2">
                <Input onClick={()=>showEditinput("fullName", "pattern", "text" )} onChange={(e)=>setUserObj(prev=>{return{...prev, fullName:e.target.value}})} htmlFor="fullName" leftImage={useradd} placeholder="Fullname" value={userObj.fullName} type="text" rightImage={edit}/>
                <Input onChange={(e)=>setUserObj(prev=>{return{...prev, email:e.target.value}})}  htmlFor="email" leftImage={usertag} placeholder="fazzzil72@gmail.com" type="email" value={userObj.email} rightImage={edit}/>
                <Input onChange={(e)=>setUserObj(prev=>{return{...prev, password:e.target.value}})} htmlFor="password" leftImage={lock} placeholder="Password" value={userObj.password} type="password" rightImage={edit}/>
                <Input htmlFor="mytask" leftImage={task} placeholder="My Tasks" type="text" rightImage={arrowdown}/>
                <Input htmlFor="privacy" leftImage={privacy} placeholder="Privacy" type="text" rightImage={arrowdown}/>
                <Input htmlFor="setting" leftImage={setting} placeholder="Setting" type="text" rightImage={arrowdown}/>
                <Logout handleLogout={handleLogout}/>
            </form>


            <EditInput name={showEditObj.name} pattern={showEditObj.pattern} type={showEditObj.type} handleOnSubmit={handleSubmit}/>

        </div>
    )
}