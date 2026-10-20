import { lazy, Suspense, useState } from "react"
import addsquare from "/images/create-task/addsquare.png"
import { Loading } from "../ui/loading";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import profile1 from '/images/profile1.png'
import closesquare from '/images/create-task/closesquare.png'
import { removeMember } from "../../store/slices/taskMembersSlice";

const UsersList = lazy(() => import("./users-list"));

export default function AddMembers(){
    const [showUsersList, setShowUsersList] = useState(false);
    const {members} = useAppSelector(state=>state.tasksmembers);
    const dispatch = useAppDispatch();

    function handleShowUsersList(){
        setShowUsersList(prev=>!prev)
    }

    function handleRemoveMember(id:string){
        dispatch(removeMember(id));
    }

    return(
        <div className="mt-4 flex flex-col gap-y-4">

            <h2 className="text-primary-pure-white font-medium text-2xl">Add team members</h2>

            {/* members add button */}
            <div className="flex gap-x-2">
                {
                    members.map((member)=>{
                        const firstName = member.fullName.split(" ")[0];
                        return(

                            <div key={member.id} className="flex gap-1 bg-light-blue-100 p-2 items-center">
                                <div className="flex gap-1 bg-light-blue-100 items-center">
                                    <div className="w-5 h-5 rounded-full">
                                        <img className="object-fill w-full h-full" src={member.imageUrl?member.imageUrl:profile1} alt="profile-image" />
                                    </div>
                                    <p className="text-primary-pure-white">{firstName}</p>
                                </div>

                                <div className="w-5 h-5 ml-4 cursor-pointer">
                                    <button type="button" onClick={()=>handleRemoveMember(member.id)} className="w-full h-full">
                                        <img className="object-fill w-full h-full" src={closesquare} alt="Close" />
                                    </button>
                                </div>
                            </div>
                           
                        )
                    })
                }
                <div className="w-10 h-10 bg-primary-yellow-100 flex justify-center items-center cursor-pointer">
                    <div className="w-6 h-6 md:w-7 md:h-7">
                        <button onClick={handleShowUsersList} type="button" className="w-full h-full">
                            <img className="object-fill w-full h-full" src={addsquare} alt="addsquare" />
                        </button>
                    </div>
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