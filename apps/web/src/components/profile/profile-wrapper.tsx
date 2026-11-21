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
import MyTasksContainer from "./my-tasks-container"
import PrivacyContainer from "./privacy-contaiiner"
import SettingContainer from "./setting-container"

export interface InputWrapperPropsType{
    handleLogout: () => Promise<void>;
}

type EdittField =  "email" | "fullName" | "password";

interface EditConfig {
    name:EdittField,
    pattern:string,
    type:string
}

const PATTERNS = {
    fullName: String.raw`(?=.{1,48}$)[a-zA-Z]+( [a-zA-Z]+)+`,
    email: String.raw`(?=.{1,254}$)[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,24}`,
    password: String.raw`(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,128}`,
};

export default function ProfileWrapper({handleLogout}:InputWrapperPropsType){
    const [showEdit, setShowEdit] = useState(false);
    const [editConfig, setEditConfig] = useState<EditConfig >({
        name: "fullName",
        pattern:"",
        type:"text"
    })
    const {user} = useAppSelector(state=>state.auth);

    function showEditinput(name: EdittField, pattern = "", type = "text") {
        setEditConfig({ name, pattern, type });
        setShowEdit(true);
    }

    return(
        <div>
            <section className="flex flex-col gap-2">
                <ProfileDetail onClick={()=>showEditinput("fullName", PATTERNS.fullName, "text" )} leftImage={useradd} value={user?.fullName} rightImage={edit}/>
                <ProfileDetail onClick={()=>showEditinput("email", PATTERNS.email, "email" )} leftImage={usertag} value={user?.email} rightImage={edit}/>
                <ProfileDetail onClick={()=>showEditinput("password", PATTERNS.password, "password" )} leftImage={lock} value="Password" rightImage={edit}/>
                <MyTasksContainer leftImage={task} rightImage={arrowdown} />
                <PrivacyContainer leftImage={privacy} rightImage={arrowdown}/>
                <SettingContainer leftImage={setting} value="Setting" rightImage={arrowdown}/>
                <Logout handleLogout={handleLogout}/>
            </section>


            {
                showEdit && <EditInput key={editConfig.name} name={editConfig.name} pattern={editConfig.pattern} type={editConfig.type} setShowEdit={setShowEdit} />
            }

        </div>
    )
}