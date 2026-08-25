import arrow from '/images/arrowleft.png'
import edit from '/images/edit.png'

export default function MessagesHead(){
    return(
        <div className="flex justify-between pt-4 items-center ">
            <div className="w-6 h-6">
                <img src={arrow} className="bg-cover" alt="arrow" />
            </div>
            <h1 className="text-primary-pure-white text-2xl">Messages</h1>
            <div className="w-6 h-6 cursor-pointer">
                <img src={edit} className="bg-cover" alt="edit" />
            </div>
        </div>
    )
}
