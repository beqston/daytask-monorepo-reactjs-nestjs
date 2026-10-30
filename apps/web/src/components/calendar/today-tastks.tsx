import TaskContainer from './task'
import profile from '/images/profile-default.png'


export default function TodayTasks(){
    return(
        <div>
            <h3 className="text-2xl font-medium text-primary-pure-white mb-8">Today's Tasks</h3>
            <TaskContainer text='Users Interviews' isCompleted={true} date='14:00 - 14:30' users={[profile, profile, profile]}/>
            <TaskContainer text='Wireframe' isCompleted={false} date='10:30 - 11:00' users={[profile]}/>
            <TaskContainer text='Testing' isCompleted={false} date='13:00 - 13:30' users={[profile, profile, profile]}/>
        </div>
    )
}