import profile from "/images/profile1.png"
import NotificationMessage from "./notification-message";

export default function NewNotification(){
    return(
        <div className="mt-10 text-primary-pure-white grid gap-4">
            <h2 className="font-medium text-xl">New</h2>
            <NotificationMessage author="Olivia Anna" actionType="left in comment in task" whereIsActionType="Mobile App  Desing Project" image={profile} time="31 min" />
        </div>
    )
}