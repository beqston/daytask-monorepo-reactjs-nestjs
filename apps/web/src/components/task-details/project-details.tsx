interface ProjectDetailsProps{
    description:string;
}
export default function ProjectDetails({description}:ProjectDetailsProps){
    return(
        <div className="mt-12">
            <h3 className="text-primary-pure-white text-2xl">Project Details</h3>
            <p className="text-primary-grey-200 mt-4">{description}</p>
        </div>
    )
}