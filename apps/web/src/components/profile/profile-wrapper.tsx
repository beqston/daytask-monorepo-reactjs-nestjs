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

export interface InputWrapperPropsType {
  handleLogout: () => Promise<void>;
}

type EditField = "email" | "fullName" | "password";
type InputType = "text" | "email" | "password";

interface EditConfig {
  name: EditField;
  pattern: string;
  type: InputType;
}

const PATTERNS: Record<EditField, string> = {
  fullName: String.raw`(?=.{1,48}$)[a-zA-Z]+( [a-zA-Z]+)+`,
  email: String.raw`(?=.{1,254}$)[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,24}`,
  password: String.raw`(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,128}`,
};

export default function ProfileWrapper({ handleLogout }: InputWrapperPropsType) {
  const [showEdit, setShowEdit] = useState(false);
  const [editConfig, setEditConfig] = useState<EditConfig>({
    name: "fullName",
    pattern: "",
    type: "text",
  });

  const { user } = useAppSelector((state) => state.auth);
  const isGoogleLogin = Boolean(localStorage.getItem("isGoogleLogin"));

  function showEditInput(name: EditField, pattern = "", type: InputType = "text") {
    setEditConfig({ name, pattern, type });
    setShowEdit(true);
  }

  const profileFields: Array<{
    key: EditField;
    leftImage: string;
    value?: string;
    pattern: string;
    type: InputType;
  }> = [
    {
      key: "fullName",
      leftImage: useradd,
      value: user?.fullName,
      pattern: PATTERNS.fullName,
      type: "text",
    },
    {
      key: "email",
      leftImage: usertag,
      value: user?.email,
      pattern: PATTERNS.email,
      type: "email",
    },
    {
      key: "password",
      leftImage: lock,
      value: "Password",
      pattern: PATTERNS.password,
      type: "password",
    },
  ];

  return (
    <div>
      <section className="flex flex-col gap-2">
        {profileFields.map((field) => (
          <ProfileDetail
            key={field.key}
            leftImage={field.leftImage}
            value={field.value}
            rightImage={!isGoogleLogin ? edit : undefined}
            onClick={
              !isGoogleLogin
                ? () => showEditInput(field.key, field.pattern, field.type)
                : undefined
            }
          />
        ))}

        <MyTasksContainer leftImage={task} rightImage={arrowdown} />
        <PrivacyContainer leftImage={privacy} rightImage={arrowdown} />
        <SettingContainer leftImage={setting} value="Setting" rightImage={arrowdown} />
        <Logout handleLogout={handleLogout} />
      </section>

      {showEdit && (
        <EditInput
          key={editConfig.name}
          name={editConfig.name}
          pattern={editConfig.pattern}
          type={editConfig.type}
          setShowEdit={setShowEdit}
        />
      )}
    </div>
  );
}