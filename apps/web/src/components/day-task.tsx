import dayTask from "/images/day-task.png"
interface DayTaskType{
    justify:string;
}
export default function DayTask({justify}:DayTaskType){
    return(
        <div className={`flex ${justify}`}>
            <img src={dayTask} alt="day-task" />
        </div>
    )
}