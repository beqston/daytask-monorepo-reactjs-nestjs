interface MessageWrapper{
    imageUrl?:string;
    groupName:string;
    lastMessage:string;
    lastMessagesTime:string;
}

export default function GroupMessagesWrapper({groupName, imageUrl,lastMessage, lastMessagesTime}:MessageWrapper){
    return(
        <section className="flex justify-between items-center px-8 py-4">
            <div className=" grid grid-cols-[47px_8fr] gap-x-4 pr-3">
                <div>
                    {
                        imageUrl? <img width={47} height={47} src={imageUrl} alt={groupName} />: <div className="w-11.75 h-11.75 bg-amber-200 rounded-bl-full"></div>
                    }
                </div>
                <div className="overflow-hidden">
                    <h3 className="text-primary-pure-white over overflow-hidden text-nowrap">{groupName}</h3>
                    <p className="text-primary-grey-100 overflow-x-hidden text-nowrap">{lastMessage}</p>
                </div>
            </div>

            <div className="min-w-14 w-14">
                <span className="text-primary-pure-white text-xs font-light">{lastMessagesTime}</span>
            </div>
        </section>
    )
}