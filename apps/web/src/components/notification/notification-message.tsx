interface NotificationMessageProps{
    image:string;
    author:string;
    actionType:string;
    whereIsActionType:string;
    time:string;
    actionTypesOther?:string;
}

export default function NotificationMessage({author, image, time, whereIsActionType, actionType, actionTypesOther}:NotificationMessageProps){
    return(
        <div className="flex justify-between gap-x-4 items-center md:gap-x-8">
            {/* notification author image container */}
            <div className="w-12 h-12 min-w-12 min-h-12 rounded-full ">
                <img src={image} alt="profile-image" className="object-fill w-full h-full" />
            </div>
            {/* notification author and actions container */}
            <div className="flex gap-x-2 flex-wrap">
                <span className="font-medium capitalize">{author}</span>
                <span className="text-primary-blue-100">{actionType}</span>
                <span className="text-primary-yellow-100 capitalize">{whereIsActionType}</span>
                {actionTypesOther && <span className="text-primary-blue-100">{actionTypesOther}</span>}
            </div>

            {/* time ago container */}
            <div>
                <span className="text-[14px] text-nowrap">{time}</span>
            </div>
        </div>
    )
}