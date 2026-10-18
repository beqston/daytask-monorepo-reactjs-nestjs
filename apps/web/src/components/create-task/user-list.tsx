import profile1 from "/images/profile1.png"
import addsquare from "/images/addsquare.png"
import type { User } from "@daytask/types";

interface UserListPropsType{
    user:Pick<User, 'id' | 'fullName' | 'imageUrl'>,
    fullName:string,   
    handleClick:(user:Pick<User, 'id' | 'fullName' | 'imageUrl'>)=>void; 
}

export default function UserList({fullName, user, handleClick}:UserListPropsType){

    return(
        <div className="flex w-full justify-between border-2 border-primary-blue-100 p-4">
            <div className="flex gap-2">
                <div className="w-6 h-6 md:w-8 md:h-8">
                    <img src={profile1} alt="profile-image" className="object-fill w-full h-full"/>
                </div>
                <p>{fullName}</p>
            </div>

            <button onClick={()=>handleClick(user)} type="button" className="w-8 h-8">
                <img className="object-fill w-full h-full" src={addsquare} alt="add-member"/>
            </button>
        </div>
    )
}