import AddTask from "../components/task-details/add-task";
import ProgressSection from "../components/task-details/progress-section";
import ProjectDetails from "../components/task-details/project-details";
import TaskDetails from "../components/task-details/task-details";
import TaskDetailsHead from "../components/task-details/task-details-head";
import TasksSection from "../components/task-details/tasks-section";
import PagesWrapper from "../components/ui/pages-wrapper";

export default function TaskDetailsPage(){
    return(
        <PagesWrapper>
            <TaskDetailsHead />
            <TaskDetails title="Real Estate App Desing" date="20 jun" />
            <ProjectDetails description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled" />
            <ProgressSection percentage={70}/>
            <TasksSection />
            <AddTask />

        </PagesWrapper>
    )
}