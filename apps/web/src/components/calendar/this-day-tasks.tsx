import type { Task } from '../../types/task'
import { getTaskHeaderTitle } from '../../utils/get-task-header-title';
import TaskContainer from './task'
import profile from '/images/profile-default.png'

interface ThisDayTasksProps {
    tasks: Task[];
    selectedDate: string;
    loading: boolean;
}

export default function ThisDayTasks({ tasks, selectedDate, loading }: ThisDayTasksProps) {
    const headerTitle = getTaskHeaderTitle(selectedDate);

    return (
        <div>
            <h3 className="text-2xl font-medium text-primary-pure-white mb-8">{headerTitle}</h3>
            {
                loading ? (
                    <p className="text-gray-400">Loading tasks...</p>
                ) : tasks.length === 0 ? (
                    <h3 className='text-primary-pure-white'>Tasks not found!</h3>
                ) : (
                    tasks.map((task) => {
                        return (
                            <TaskContainer 
                                key={task.id} 
                                time={task.time} 
                                isCompleted={task.isCompleted || false} 
                                text={task.title} 
                                users={task.members.map(u => u.imageUrl || profile)} 
                            />
                        );
                    })
                )
            }
        </div>
    );
}