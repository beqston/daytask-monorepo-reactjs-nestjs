export default function CompleteTasksWrapper({children}:{children:React.ReactNode}){
    return(
        <div className='overflow-hidden relative min-h-14'>
            {children}
        </div>
    )
}