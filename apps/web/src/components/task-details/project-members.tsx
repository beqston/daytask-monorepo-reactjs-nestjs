interface ProjectMembersProps {
    members: string[];
}

export default function ProjectMembers({ members }: ProjectMembersProps) {
    return (
        <div className="flex -space-x-1 overflow-hidden p-1">
            {members.map((member, index) => (
                <img 
                    key={index} 
                    src={member} 
                    alt="profile" 
                    className="w-4 h-4 rounded-full ring-2 ring-white object-cover" 
                />
            ))}
        </div>
    );
}