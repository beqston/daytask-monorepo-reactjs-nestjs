import type { Task } from '../../types/task'
import { getTaskHeaderTitle } from '../../utils/get-task-header-title';
import TaskContainer from './task'
import profile from '/images/profile-default.png'

interface ThisDayTaksProps{
    tasks:Task[],
    selectedDate: string;
}

export default function ThisDayTasks({tasks, selectedDate}:ThisDayTaksProps){
    const headerTitle = getTaskHeaderTitle(selectedDate);
    return(
        <div>
            <h3 className="text-2xl font-medium text-primary-pure-white mb-8">{headerTitle}</h3>
            {
                tasks.map((task)=>{
                    return <TaskContainer key={task.id} time={task.time} isCompleted={task.isCompleted || false} text={task.title} users={task.members.map(u=>u.imageUrl || profile)} />
                })
            }
        </div>
    )
}