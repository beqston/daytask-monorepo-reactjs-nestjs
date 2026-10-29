import type { TaskMember } from "../../types/task";
import profile from '/images/profile-default.png'

interface TaskMembersProps {
  members: TaskMember[];
}

export default function TaskMembers({ members }: TaskMembersProps) {
  return (
    <div className='flex -space-x-2 items-center'>
      {
        members.map((member) => (
          <div key={member.id} className='relative group'>
            <img
              className='rounded-[50%] w-4 h-4 md:w-5 md:h-5 cursor-pointer'
              src={member.imageUrl || profile}
              alt="members"
            />
            {/* Tooltip */}
            <div className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block 
                            bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10'>
              {member.fullName}
            </div>
          </div>
        ))
      }
    </div>
  )
}