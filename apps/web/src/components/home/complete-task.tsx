import { useEffect, useState } from 'react'
import api from '../../api/api'
import TaskMembers from './task-members'
import { isAxiosError } from 'axios'
import ErrorMessage from '../error/error'
import { Loading } from '../ui/loading'
import type { Task } from '../../types/task'

export default function CompleteTask(){
    const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState(false);
    const [errorText, setErrorText] = useState("");


    async function getCompletedTasks(){
        try {
            setLoading(true);
            const { data } = await api.get('/tasks/completed');
            setCompletedTasks(data);
        } catch (error) {
            setError(true);
            setErrorText(isAxiosError(error)
            ? error.response?.data?.message ?? "Something went wrong!":"Something went wrong!"
        )
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        getCompletedTasks()
    }, []);

    if(loading){
        return <div className='translate-y-4'><Loading /></div>
    }

    if(error){
        return <ErrorMessage text={errorText} />
    }

    if(completedTasks.length == 0){
        return <p className='text-2xl font-medium text-primary-grey-100 mt-2'>Completed tasks list is empty</p>
    }

    return(
        <div className='flex gap-2'>
            {
                completedTasks.map((item, index)=>{
                    return(
                        <div key={item.id} style={{backgroundColor:index == 0?'#FED36A':'#455A64'}} className={`mt-4 text-${index == 0?'black':'white'} overflow-hidden border-2 shrink flex-1 p-2 border-white min-w-[80%] lg:min-w-58`}>
                            <div className='grid grid-rows-2'>
                                {/* title of complete task */}
                                <h3 className={`text-3xl font-bold `}>{item.title}</h3>
                                {/* task information details congtainer */}
                                <div className='mt-4'>
                                    <div className='flex gap-4'>
                                        <p className={`text-${index==0?'primary-black-200':'bg-primary-white-400'}`}>Team members</p>
                                        
                                        {/* members imgages container */}
                                        <TaskMembers members={item.members} />
                                    </div>

                                    <div className="w-full">
                                        <div className={`flex justify-between mb-1 text-sm font-medium mt-4 text-${index== 0?'primary-black-200':'bg-primary-white-400'}`}>
                                            <span>Completed</span>
                                            <span>100%</span>
                                        </div>
                                        <progress
                                            value={100}
                                            max={100}
                                            className="w-full h-2.5 rounded-full overflow-hidden
                                                    [&::-webkit-progress-bar]:#212832
                                                    [&::-webkit-progress-value]:bg-white
                                                    [&::-moz-progress-bar]:bg-[#212832]
                                                    bg-white"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>

    )
}