import { useState } from "react";
import { useAppSelector } from "../../store/hooks";
import AddMembers from "./add-members";
import AddNewInput from "./add-new-input";
import TimeDateContainer from "./date-time";
import TaskDetailsContainer from "./task-details";
import TaskTitleContainer from "./task-title";
import api from "../../api/api";
import ErrorMessage from "../error/error";
import { isAxiosError } from "axios";
import { Loading } from "../ui/loading";
import CreateButton from "./create-button";
import { clearMembers } from "../../store/slices/taskMembersSlice";

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
    const memberIds = members.map(m=>m.id);
    const [showError, setShowError] = useState(false);
    const[errorText, setErrorText] = useState("");
    const[loading, setLoading] = useState(false);
    
    function updateField<K extends keyof TaskFormState>(key: K, value: TaskFormState[K]) {
        setFormState(prev => ({ ...prev, [key]: value }));
    }

    async function handleSubmit(e:React.SubmitEvent<HTMLFormElement>){
        e.preventDefault();
        try {
            setLoading(true);
            if(memberIds.length == 0){
                setShowError(true);
                setErrorText("Please add member!");
                return;
            }
            await api.post('/tasks', {
                ...formState, 
                memberIds:memberIds
            });
            setFormState(getInitialState());
            clearMembers();
        } catch (error) {
            setShowError(true);
            if(isAxiosError(error)){
                setErrorText(error.response?.data?.message)
            }
            setErrorText("Something went Wrong!!");
        }finally{
            setLoading(false);
            setTimeout(()=>{
                setShowError(false);
            }, 10000)
        }
    }

    return(
        <section className="mt-14">
            <form onSubmit={(e)=>handleSubmit(e)}>
                <TaskTitleContainer value={formState.title} onChange={(v)=>updateField("title", v)} />
                <TaskDetailsContainer value={formState.details} onChange={(v)=>updateField("details", v)} />
                <AddMembers />
                <TimeDateContainer date={formState.date} onDateChange={(v)=>updateField("date", v)} time={formState.time} onTimeChange={(v=>updateField("time", v))} />
                <AddNewInput onChange={(v)=>updateField("subtask", v)} value={formState.subtask ?? ""} />
                <CreateButton />
            </form>
            {
                showError && <ErrorMessage text={errorText} />
            }

            {
                loading && <Loading />
            }
        </section>
    )
}