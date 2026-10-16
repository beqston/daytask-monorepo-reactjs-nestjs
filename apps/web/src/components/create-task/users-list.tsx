import { useEffect, useRef, useState } from "react"
import api from "../../api/api";
import UserList from "./user-list";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addMember } from "../../store/slices/taskMembersSlice";

interface UserType {
    id:string
    email: string,
    imageUrl: string | null,
    fullName: string
}

interface UserListsPropsType{
    handleShowUsersList(): void,
    showUsersList:boolean,
    setShowUsersList:React.Dispatch<React.SetStateAction<boolean>>
}

export default function UsersList({handleShowUsersList, showUsersList, setShowUsersList}:UserListsPropsType){
    const [users, setUsers] = useState<UserType[] | []>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();

    function handleAddMember(id:string){
        dispatch(addMember(id));
    }

    async function getAllUsers(){
        const { data } = await api.get('/users');
        setUsers(data);
    }

    useEffect(()=>{
        getAllUsers();
    }, []);

    useEffect(()=>{
        if(!showUsersList) return;

        const handleClickOutside: (e: MouseEvent) => void = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setShowUsersList(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, [showUsersList])

    return(
        <div ref={containerRef} className="fixed w-9/10 h-[80svh] bg-primary-grey-300 top-8 z-200 text-primary-pure-white md:w-4/5 md:translate-x-8 lg:w-3/5 lg:-translate-x-2  xl:w-2/5 xl:translate-x-4">
            <div className="w-full h-full relative pt-8 px-2">
                <button className="absolute right-1 top-1 text-xl font-medium text-primary-grey-100" onClick={handleShowUsersList} type="button">Close</button>
            
                <div>
                    {
                        users.map(user=>{
                            return(
                                <UserList id={user.id} handleClick={handleAddMember} key={user.id} fullName={user.fullName} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}