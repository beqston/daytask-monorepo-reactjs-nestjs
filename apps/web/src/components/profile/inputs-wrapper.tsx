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

export default function InputsWrapper(){
    return(
        <form method="POST" className="flex flex-col gap-2">
            <Input htmlFor="username" leftImage={useradd} placehoolder="Fazil Laghari" type="text" rightImage={edit}/>
            <Input htmlFor="email" leftImage={usertag} placehoolder="fazzzil72@gmail.com" type="email" rightImage={edit}/>
            <Input htmlFor="password" leftImage={lock} placehoolder="Password" type="password" rightImage={edit}/>
            <Input htmlFor="mytask" leftImage={task} placehoolder="My Tasks" type="text" rightImage={arrowdown}/>
            <Input htmlFor="privacy" leftImage={privacy} placehoolder="Privacy" type="text" rightImage={arrowdown}/>
            <Input htmlFor="setting" leftImage={setting} placehoolder="Setting" type="text" rightImage={arrowdown}/>
            <Logout />
        </form>
    )
}