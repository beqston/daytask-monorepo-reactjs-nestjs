import { Link } from 'react-router-dom'
import CompleteTask from '../components/home/complete-task'
import ProjectContaiiner from '../components/home/project-container'
import Navbar from '../components/ui/navbar'
import PagesWrapper from '../components/ui/pages-wrapper'
import HomeHead from '../components/home/home-head'
import InputContainer from '../components/home/input-container'
import CompleteTaskHead from '../components/home/complete-task-head'
import CompleteTasksWrapper from '../components/home/complete-tasks-wrapper'
import OngoingProjectsHead from '../components/home/ongoing-projects-head'
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
                <CompleteTask title='Real Estate Website'/>
                <CompleteTask title='Finance Mobile App Desing' />
                <CompleteTask title='Real Finance Task' />
            </CompleteTasksWrapper>

            {/* ongoing projects head */}
            <OngoingProjectsHead />

            {/* ongoing projects container */}
            <ProjectContaiiner title='Mobile App Wireframe' percentage={75} />
            <ProjectContaiiner title='Real Estate Desings App' percentage={70} />
            <ProjectContaiiner title='Dashboards & App Desings' percentage={40} />
            <Navbar />
       </PagesWrapper>
    )
}