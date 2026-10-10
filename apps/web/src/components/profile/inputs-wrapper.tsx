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


export interface InputWrapperPropsType{
    handleLogout: () => Promise<void>;
}

export default function InputsWrapper({handleLogout}:InputWrapperPropsType){

    return(
        <form className="flex flex-col gap-2">
            <Input htmlFor="username" leftImage={useradd} placeholder="Fazil Laghari" type="text" rightImage={edit}/>
            <Input htmlFor="email" leftImage={usertag} placeholder="fazzzil72@gmail.com" type="email" rightImage={edit}/>
            <Input htmlFor="password" leftImage={lock} placeholder="Password" type="password" rightImage={edit}/>
            <Input htmlFor="mytask" leftImage={task} placeholder="My Tasks" type="text" rightImage={arrowdown}/>
            <Input htmlFor="privacy" leftImage={privacy} placeholder="Privacy" type="text" rightImage={arrowdown}/>
            <Input htmlFor="setting" leftImage={setting} placeholder="Setting" type="text" rightImage={arrowdown}/>
            <Logout handleLogout={handleLogout}/>
        </form>
    )
}