import { useNavigate } from 'react-router-dom'
import arrow from '/images/arrowleft.png'
import edit from '/images/edit.png'

export default function TaskDetailsHead(){
    const navigate = useNavigate();
    return(
        <div className="flex justify-between pt-4 items-center cursor-pointer" onClick={()=>navigate(-1)}>
            <div className="w-6 h-6">
                <img src={arrow} className="bg-cover" alt="arrow" />
            </div>
            <h1 className="text-primary-pure-white text-2xl">Task Details</h1>
            <div className="w-6 h-6 cursor-pointer">
                <img src={edit} className="bg-cover" alt="edit" />
            </div>
        </div>
    )
}
