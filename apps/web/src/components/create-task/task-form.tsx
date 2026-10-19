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

const initialState:TaskFormState = {
    title:"",
    details:"",
    time:"10:30",
    date:"2022-10-18",
    subtask:""
} 

export default function TaskForm(){
    const [formState, setFormState] = useState(initialState);
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
                <TimeDateContainer />
                <AddNewInput />
            </form>
        </section>
    )
}