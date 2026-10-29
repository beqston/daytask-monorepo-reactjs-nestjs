import CompleteTask from '../components/home/complete-task'
import Navbar from '../components/ui/navbar'
import OnGoingProjectContaiiner from '../components/home/project-container'
import PagesWrapper from '../components/ui/pages-wrapper'
import HomeHead from '../components/home/home-head'
import InputContainer from '../components/home/input-container'
import CompleteTaskHead from '../components/home/complete-task-head'
import CompleteTasksWrapper from '../components/home/complete-tasks-wrapper'
import OngoingProjectsHead from '../components/home/ongoing-projects-head'
import PendingTasksWrapper from '../components/home/pending-tasks-wrapper'


export default function Home(){
    return(
       <PagesWrapper>

            {/* head of home page */}
            <HomeHead />

            {/* input container */}
            <InputContainer/>

            {/* complete task head */}
            <CompleteTaskHead />

            {/* complete tasks */}
            <CompleteTasksWrapper>
                <CompleteTask />
            </CompleteTasksWrapper>

            <PendingTasksWrapper>
                {/* ongoing projects head */}
                <OngoingProjectsHead />

                {/* ongoing projects container */}
                <OnGoingProjectContaiiner  />
            </PendingTasksWrapper>


            <Navbar />
       </PagesWrapper>
    )
}