interface TaskMembersProps{
    members:string[];
}

export default function TaskMembers({members}:TaskMembersProps){
return(
    <div className='flex gap-1 -space-x-3 items-center'>
        {
            members.map((member, index)=>{
               return <img key={index} className='rounded-[50%] w-4 h-4' src={member} alt="members"/>
            })
        }
    </div>
    )
}