import { useEffect, useState } from "react";
import CalendarHead from "../components/calendar/calendar-head";
import Schedule from "../components/calendar/schedule";
import ThisDayTasks from "../components/calendar/this-day-tasks";
import Navbar from "../components/ui/navbar";
import PagesWrapper from "../components/ui/pages-wrapper";
import type { Task } from "../types/task";
import api from "../api/api";
import { isAxiosError } from "axios";
import ErrorMessage from "../components/error/error";

export default function Calendar(){
    const[error, setError] = useState(false);
    const[errorText, setErrorText] = useState("");
    const [tasks, setTasks] = useState<Task[]>([]);
    
    async function getMyTasks(query?:string){
        try {
            if(query){
                const {data} = await api.get(`/tasks/my-tasks?date=${query}`);
                setTasks(data);
            }else{
                const {data} = await api.get('/tasks/my-tasks');
                setTasks(data);
            }
        } catch (error) {
            setError(true)
            setErrorText(isAxiosError(error)? error.response?.data?.message ?? "Something went wrong!":"Something went wrong!")
        }
    }
    
    useEffect(()=>{
      getMyTasks()
    }, [])

    if(error){
        return <div className="w-full h-screen grid place-items-center"><ErrorMessage text={errorText} /></div>
    }
    
    return(
        <PagesWrapper>
            <CalendarHead />
            <Schedule getMyTasks={getMyTasks} />
            <ThisDayTasks tasks={tasks} />
            <Navbar />
        </PagesWrapper>
    )
}