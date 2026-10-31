import { useEffect, useState } from 'react';
import api from '../../api/api';
import ProjectProgress from '../project-progress';
import type { Task } from '../../types/task';
import profile from '/images/profile-default.png'
import { Loading } from '../ui/loading';
import ErrorMessage from '../error/error';
import { isAxiosError } from 'axios';

export default function OnGoingProjectContaiiner(){
    const [pendingTasks, setPendingTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState("");

    function formatDueDate(date: Date | string): string {
        const d = typeof date === 'string'
            ? (() => {
                const [y, m, day] = date.split('T')[0].split('-').map(Number);
                return new Date(y, m - 1, day);
            })()
            : date;

        const formattedDate = new Intl.DateTimeFormat('en-GB', {
            month: 'long',
            day: 'numeric',
        }).format(d);

        return `Due on: ${formattedDate}`;
    }

    async function getPendingProjects() {
        try {
            setLoading(true);
            const { data } = await api.get('/tasks/pending/from-start');
            setPendingTasks(data);
        } catch (error) {
            setError(true)
            setErrorText(isAxiosError(error)? error.response?.data?.message ?? "Something Went Wrong!": "Something Went Wrong!")
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        getPendingProjects();
    }, []);

    if(loading) return <div className='translate-y-4'><Loading /></div>
    if(error) return <ErrorMessage text={errorText}/>
        if(pendingTasks.length == 0){
        return <p className='text-2xl font-medium text-primary-grey-100 mt-2'>Pending tasks list is empty</p>
    }

    return(
        <>
            {
                pendingTasks.map((task)=>{
                    return(
                        <article key={task.id} className='text-primary-pure-white bg-light-blue-100 flex flex-col gap-8 p-8 mt-8 '>
                            <h2 className='text-3xl'>{task.title}</h2>
                            <div className="flex justify-between">
                                <div className="flex flex-col gap-2">
                                    <p className='text-xl'>Team members</p>
                                    <div className='flex relative -space-x-2 w-full'>
                                        {
                                            task.members.map(member=>{
                                                return(
                                                    <div key={member.id} className='relative group'>
                                                        <img
                                                        className='rounded-[50%] w-4 h-4 md:w-5 md:h-5 cursor-pointer'
                                                        src={member.imageUrl || profile}
                                                        alt="members"
                                                        />
                                                        {/* Tooltip */}
                                                        <div className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block 
                                                                        bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10'>
                                                        {member.fullName}
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>

                                    <p className='text-xl'>{formatDueDate(task.date)}</p>

                                </div>

                                {/* progress  */}
                                <ProjectProgress percentage={task.percentage || 0} />
                            </div>
                        </article>
                    )
                })
            }
        </>

    )
}