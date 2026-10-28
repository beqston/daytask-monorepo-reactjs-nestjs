import type { TaskMember } from "../../types/task";
import ellipse1 from '/images/home/team-members/Ellipse1.png'

interface TaskMembersProps{
    members:TaskMember[];
}

export default function TaskMembers({members}:TaskMembersProps){
return(
    <div className='flex gap-1 -space-x-3 items-center'>
        {
            members.map((member)=>{
               return <img key={member.id} className='rounded-[50%] w-4 h-4' src={member.imageUrl || ellipse1} alt="members"/>
            })
        }
    </div>
    )
}