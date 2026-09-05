import TaskContainer from './task'
import ellipse1 from '/images/home/team-members/Ellipse1.png'
import ellipse2 from '/images/home/team-members/Ellipse2.png'
import ellipse3 from '/images/home/team-members/Ellipse3.png'

export default function TodayTasks(){
    return(
        <div>
            <h3 className="text-2xl font-medium text-primary-pure-white mb-8">Today's Tasks</h3>
            <TaskContainer text='Users Interviews' isCompleted={true} date='14:00 - 14:30' users={[ellipse1, ellipse2, ellipse3]}/>
            <TaskContainer text='Wireframe' isCompleted={false} date='10:30 - 11:00' users={[ellipse1]}/>
            <TaskContainer text='Testing' isCompleted={false} date='13:00 - 13:30' users={[ellipse1, ellipse3, ellipse2]}/>
        </div>
    )
}