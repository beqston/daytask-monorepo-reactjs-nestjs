import completed from "/images/task-details/completed.png"
import tickcircle from "/images/task-details/tickcircle.png"

interface TaskProps{
    title:string;
    isCompleted:boolean;
}
export default function Task({title, isCompleted}:TaskProps){
    return(
        <div className="flex justify-between mt-4 bg-light-blue-100 p-4 items-center">
            <p className="text-primary-pure-white text-xl font-normal">{title}</p>

            <div className="bg-primary-yellow-100 w-8 h-8 flex justify-center items-center">
                <img src={isCompleted?completed:tickcircle} alt="sircle-status-task" className="w-6 h-6" />
            </div>
        </div>
    )
}