interface MessageWrapper{
    imageUrl?:string;
    author:string;
    lastMessage:string;
    minuteAgo:string;
    isReadMessage:boolean;
}

export default function MessageWrapper({author, imageUrl, isReadMessage, lastMessage, minuteAgo}:MessageWrapper){
    return(
        <section className="flex justify-between items-center px-8 py-4">
            <div className=" grid grid-cols-[47px_8fr] gap-x-4 pr-3">
                <div>
                    {
                        imageUrl? <img width={47} height={47} src={imageUrl} alt={author} />: <div className="w-11.75 h-11.75 bg-amber-200 rounded-bl-full"></div>
                    }
                </div>
                <div className="overflow-hidden">
                    <h3 className="text-primary-pure-white over overflow-hidden text-nowrap">{author}</h3>
                    <p className="text-primary-grey-100 overflow-x-hidden text-nowrap">{lastMessage}</p>
                </div>
            </div>

            <div className="flex flex-col min-w-14 w-14 justify-end items-center gap-2">
                <span className="text-primary-pure-white text-xs font-light">{minuteAgo} min</span>
                <div className={`w-2 h-2 ${isReadMessage?"invisible":"visible"} bg-primary-yellow-100 rounded-full`}></div>
            </div>
        </section>
    )
}