interface TasskContainerProps{
    isCompleted:boolean;
    text:string;
    date:string;
    users:string[]
}

export default function TaskContainer({text, isCompleted, date, users}:TasskContainerProps){
    return(
        <div 
            className={`${isCompleted?"bg-primary-yellow-100":"bg-primary-blue-200  border-l-14 border-l-primary-yellow-100"} p-4 flex justify-between items-center mt-4`}>
            
            {/* task's name and date container */}
            <div className={`${isCompleted?"pl-2 text-primary-grey-300":"pl-4 text-primary-pure-white" } flex flex-col gap-2`}>
                <h4 className="text-xl">{text}</h4>
                <span className={`${isCompleted?"text-primary-grey-300":"text-primary-white-400"}`}>{date}</span>
            </div>

            {/* users container */}
            <div className="flex -space-x-2 max-w-[50%] overflow-auto">
                {
                    users.map((user, index)=>{
                        return(
                            <div key={index} className="w-5 h-5">
                                <img src={user} alt="img" className="object-cover w-full h-full"/>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}