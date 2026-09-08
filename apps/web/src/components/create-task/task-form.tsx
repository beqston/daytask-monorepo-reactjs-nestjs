import AddNewInput from "./add-new-input";
import TimeDateContainer from "./date-time";
import TaskDetailsContainer from "./task-details";
import TaskTitleContainer from "./task-title";

export default function TaskForm(){
    return(
        <section className="mt-14">

            <form action="/" method="POST">
                <TaskTitleContainer />
                <TaskDetailsContainer />
                <TimeDateContainer />
                <AddNewInput />
            </form>
            
        </section>
    )
}