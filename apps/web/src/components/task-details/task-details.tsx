import ProjectMembers from "./project-members";
import calendar from "/images/task-details/calendar.png"
import group from "/images/task-details/group.png"



import prof1 from "/images/task-details/prof1.png"
import prof2 from "/images/task-details/prof2.png"
import prof3 from "/images/task-details/prof3.png"




interface TaskDetailsProps{
    title:string;
    date:string;
}

export default function TaskDetails({title, date}:TaskDetailsProps){
    return(
        <article>
            <h2 className="text-primary-pure-white text-3xl text-center mt-12 font-bold">{title}</h2>

            {/* calendar and members main container */}
            <div className="grid grid-cols-2 mt-8">
                {/* calendar container */}
                <div className="flex gap-4">
                    <div className="bg-primary-yellow-100 p-2 w-11.75 flex justify-center items-center h-11.75">
                        <div className="w-6 h-6"><img className="bg-cover" src={calendar} alt="calendar" /></div>
                    </div>

                    <div className="flex flex-col justify-between ">
                        <span className="text-primary-blue-100 text-xs">Due Date</span>
                        <span className="text-primary-pure-white text-xl ">{date}</span>
                    </div>
                </div>


                {/* members container */}
                <div className="flex justify-center gap-4">
                    <div className="bg-primary-yellow-100 p-2 w-11.75 flex justify-center items-center h-11.75">
                        <div className="w-6 h-6"><img className="bg-cover" src={group} alt="group" /></div>
                    </div>


                    <div className="flex flex-col justify-between ">
                        <span className="text-primary-blue-100 text-xs">Project Team</span>
                        <div>
                            <ProjectMembers members={[prof1, prof2, prof3]} />
                        </div>
                    </div>

                </div>

            </div>
        </article>
    )
}