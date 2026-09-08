import CreateButton from "../components/create-task/create-button";
import CreateTaskHead from "../components/create-task/create-task-head";
import TaskForm from "../components/create-task/task-form";
import PagesWrapper from "../components/ui/pages-wrapper";

export default function CreateTask(){
    return(
       <PagesWrapper>
        <CreateTaskHead />
        <TaskForm />
        <CreateButton />
       </PagesWrapper>
    )
}