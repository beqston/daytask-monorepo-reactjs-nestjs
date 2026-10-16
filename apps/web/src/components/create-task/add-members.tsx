import { Suspense, useState } from "react"
import UsersList from "./users-list"
import addsquare from "/images/create-task/addsquare.png"
import { Loading } from "../ui/loading";

export default function AddMembers(){
    const [showUsersList, setShowUsersList] = useState(false);

    function handleShowUsersList(){
        setShowUsersList(prev=>!prev)
    }

    return(
        <div className="mt-4 flex flex-col gap-y-4">

            <h2 className="text-primary-pure-white font-medium text-2xl">Add team members</h2>

            {/* members add button */}
            <div className="w-10 h-10 bg-primary-yellow-100 flex justify-center items-center cursor-pointer">
                <div className="w-6 h-6 md:w-7 md:h-7">
                    <button onClick={handleShowUsersList} type="button" className="w-full h-full">
                        <img className="object-fill w-full h-full" src={addsquare} alt="addsquare" />
                    </button>
                </div>
            </div>

            {
                showUsersList && 
                <Suspense fallback={<Loading />}>
                    <UsersList handleShowUsersList={handleShowUsersList} showUsersList={showUsersList} setShowUsersList={setShowUsersList}/>
                </Suspense>
            }
        </div>
    )
}