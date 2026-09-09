import profile from "/images/profile1.png"
import NotificationMessage from "./notification-message";

export default function EarlierNotification(){
    return(
        <div className="mt-10 text-primary-pure-white grid gap-4">
            <h2 className="font-medium text-xl">Earlier</h2>
            <NotificationMessage author="robert brown" actionType="marked the task" whereIsActionType="Mobile App  Desing Project" image={profile} time="31 min" />
        </div>
    )
}