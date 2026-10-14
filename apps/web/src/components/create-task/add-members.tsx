import UsersList from "./users-list"
import addsquare from "/images/create-task/addsquare.png"

export default function AddMembers(){

    return(
        <div className="mt-4 flex flex-col gap-y-4">

            <h2 className="text-primary-pure-white font-medium text-2xl">Add team members</h2>

            {/* members add button */}
            <div className="w-10 h-10 bg-primary-yellow-100 flex justify-center items-center cursor-pointer">
                <div className="w-6 h-6 ">
                    <img className="object-fill w-full h-full" src={addsquare} alt="addsquare" />
                </div>
            </div>

            <UsersList />
        </div>
    )
}