interface MessageProps{
    text:string;
    isAuthor:boolean;
    isSeen?:boolean;
    isManyMessage:boolean;
}

export default function Message({text, isAuthor, isSeen, isManyMessage}:MessageProps){
    return(
        <div className={`flex w-full ${isAuthor?"flex-row-reverse":"flex-row"} ${isManyMessage?"mt-2":'mt-7'} relative`}>
            <p className={`w-[70%] flex ${isAuthor?"bg-primary-yellow-100 text-primary-grey-300":"bg-primary-blue-200 text-primary-pure-white"} p-4`}>{text}</p>
            {isSeen && <span className="text-primary-blue-200 text-[10px] absolute right-2 -bottom-1">Seen</span>}
        </div>
    )
}

