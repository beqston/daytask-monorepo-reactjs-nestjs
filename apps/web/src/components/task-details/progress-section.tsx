import ProjectProgress from "../project-progress";

interface ProgressSectionProps{
    percentage:number;
}
export default function ProgressSection({percentage}:ProgressSectionProps){
    return(
        <div className="flex justify-between mt-10 items-center py-2">
            <h3 className="text-2xl text-primary-pure-white ">Project Progress</h3>
            <ProjectProgress percentage={percentage} strokeWidth={4} size={80}/>
        </div>
    )
}