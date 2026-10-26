import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
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

function getInitialState(): TaskFormState {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);

  return {
    title: "",
    details: "",
    time: now.toTimeString().slice(0, 5),
    date: tomorrow.toLocaleDateString("en-CA"),
    subtask: "",
  };
}

export default function TaskForm(){
    const [formState, setFormState] = useState(getInitialState);
    const {members} = useAppSelector(state=>state.tasksmembers);
    const dispatch = useAppDispatch();
    const memberIds = members.map(m=>m.id);
    const [showError, setShowError] = useState(false);
    const[errorText, setErrorText] = useState("");
    const[loading, setLoading] = useState(false);
    const [succsessMessage, setSuccsessMessage] = useState(false);
    
    function updateField<K extends keyof TaskFormState>(key: K, value: TaskFormState[K]) {
        setFormState(prev => ({ ...prev, [key]: value }));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (memberIds.length === 0) {
            setShowError(true);
            setErrorText("Please add member!");
            return;
        }
        if (!formState.time || !formState.date) {
            setShowError(true);
            setErrorText("Please select date and time!");
            return;
        }

        try {
            setLoading(true);
            await api.post("/tasks", {
                ...formState,
                memberIds,
                tzOffset: new Date().getTimezoneOffset(),
            });
            setFormState(getInitialState());
            dispatch(clearMembers());
            setSuccsessMessage(true);
        } catch (error) {
            setShowError(true);
            setErrorText(
                isAxiosError(error)
                    ? error.response?.data?.message ?? "Something went wrong!"
                    : "Something went wrong!"
            );
        } finally {
            setLoading(false);
            setTimeout(() => {
                setShowError(false);
                setSuccsessMessage(false);
            }, 10000);
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

            {
                succsessMessage && <p className="bg-primary-grey-300 text-green-400 p-4 fixed top-2 right-2">Task Added succsesfully!</p>
            }
        </section>
    )
}