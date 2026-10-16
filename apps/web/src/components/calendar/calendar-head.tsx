import arrow from '/images/arrowleft.png'
import addsquare from '/images/addsquare.png'
import { useNavigate } from 'react-router-dom'

export default function CalendarHead(){
    const navigate = useNavigate();
    return(
        <div className="flex justify-between pt-4 items-center ">
            <div onClick={()=>navigate(-1)} className="w-6 h-6 cursor-pointer">
                <img src={arrow} className="bg-cover" alt="arrow" />
            </div>
            <h1 className="text-primary-pure-white text-2xl">Schedule</h1>
            <div className="w-6 h-6 cursor-pointer">
                <img src={addsquare} className="object-fill w-full h-full" alt="addsquare" />
            </div>
        </div>
    )
}
