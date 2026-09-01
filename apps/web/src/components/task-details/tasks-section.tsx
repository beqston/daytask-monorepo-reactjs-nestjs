import Task from "./task";

export default function TasksSection(){
    return(
        <section className="mt-8">
            <h3 className="text-primary-pure-white text-xl font-medium">All Tasks</h3>
            <Task title="User Interviews" isCompleted={true} />
            <Task title="Desing Sistem" isCompleted={true} />
            <Task title="Wireframes" isCompleted={true} />
            <Task title="Icons" isCompleted={false} />
            <Task title="Final mockups" isCompleted={false} />
        </section>
    )
}