import { useNavigate } from 'react-router-dom'
import arrow from '/images/arrowleft.png'

export default function CreateTaskHead(){
    const navigate = useNavigate();
    return(
        <div className="flex justify-between  pt-4 items-center">
            <div 
                className="w-6 h-6 cursor-pointer"
            >
                <img src={arrow} className="object-fill w-full h-full" alt="arrow" onClick={()=>navigate(-1)}/>
            </div>
            <h1 className="text-primary-pure-white text-2xl">Create New Task</h1>

            <div className="w-6 h-6 invisible"></div> 
        </div>
    )
}
