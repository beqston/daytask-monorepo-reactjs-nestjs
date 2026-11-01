import type { Task } from '../../types/task'
import TaskContainer from './task'
import profile from '/images/profile-default.png'

interface ThisDayTaksProps{
    tasks:Task[]
}

export default function ThisDayTasks({tasks}:ThisDayTaksProps){
    return(
        <div>
            <h3 className="text-2xl font-medium text-primary-pure-white mb-8">Today's Tasks</h3>
            {
                tasks.map((task)=>{
                    return <TaskContainer key={task.id} time={task.time} isCompleted={task.isCompleted || false} text={task.title} users={task.members.map(u=>u.imageUrl || profile)} />
                })
            }
        </div>
    )
}