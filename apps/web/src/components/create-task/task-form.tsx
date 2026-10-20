import { useState } from "react";
import { useAppSelector } from "../../store/hooks";
import AddMembers from "./add-members";
import AddNewInput from "./add-new-input";
import TimeDateContainer from "./date-time";
import TaskDetailsContainer from "./task-details";
import TaskTitleContainer from "./task-title";

type TaskFormState = {
    title:string;
    details:string;
    date:string;
    time:string;
    subtask?:string;
}

function getInitialState():TaskFormState{
    const now = new Date();
    return{
      title:"",
      details:"",
      time:now.toTimeString().slice(0, 5),
      date:now.toLocaleDateString("en-CA"),
      subtask:""
    }
} 

export default function TaskForm(){
    const [formState, setFormState] = useState(getInitialState);
    const {members} = useAppSelector(state=>state.tasksmembers);
    const membersIds = members.map(m=>m.id);
    
    function updateField<K extends keyof TaskFormState>(key: K, value: TaskFormState[K]) {
        setFormState(prev => ({ ...prev, [key]: value }));
    }

    return(
        <section className="mt-14">
            <form>
                <TaskTitleContainer value={formState.title} onChange={(v)=>updateField("title", v)} />
                <TaskDetailsContainer value={formState.details} onChange={(v)=>updateField("details", v)} />
                <AddMembers />
                <TimeDateContainer date={formState.date} onDateChange={(v)=>updateField("date", v)} time={formState.time} onTimeChange={(v=>updateField("time", v))} />
                <AddNewInput />
            </form>
        </section>
    )
}