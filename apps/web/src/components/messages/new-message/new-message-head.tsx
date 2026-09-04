import type { NewMessageHeadProps } from './new-message'
import arrow from '/images/arrowleft.png'
import search from '/images/home/search.png'


export default function NewMessageHead({setIsNewMessage}:NewMessageHeadProps){
    return(
        <div className="flex justify-between pt-4 items-center">
            <div 
                className="w-6 h-6 cursor-pointer"
                onClick={()=>setIsNewMessage(false)} 
            >
                <img src={arrow} className="bg-cover" alt="arrow" />
            </div>
            <h1 className="text-primary-pure-white text-2xl">New Messages</h1>
            <div className="w-6 h-6 cursor-pointer">
                <img src={search} className="object-fill w-full h-full" alt="edit" />
            </div>
        </div>
    )
}
