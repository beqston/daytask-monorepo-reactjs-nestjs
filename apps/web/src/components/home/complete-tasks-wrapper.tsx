export default function CompleteTasksWrapper({children}:{children:React.ReactNode}){
    return(
        <div className='m-2 flex gap-2 overflow-hidden'>
            {children}
        </div>
    )
}