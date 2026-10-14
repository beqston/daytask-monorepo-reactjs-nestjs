import { useEffect, useState } from "react"
import api from "../../api/api";
interface UserType {
    id:string
    email: string,
    imageUrl: string | null,
    fullName: string
}
export default function UsersList(){
    const [users, setUsers] = useState<UserType[] | []>([]);

    async function getAllUsers(){
        const { data } = await api.get('/users');
        console.log(data)
        setUsers(data);
    }

    useEffect(()=>{
        getAllUsers();
    }, []);

    return(
        <div className="fixed w-9/10 h-[80svh] bg-primary-grey-300 top-8 z-200 text-primary-pure-white md:w-4/5 md:translate-x-8 lg:w-3/5 lg:-translate-x-2  xl:w-2/5 xl:translate-x-4">
            <button type="button">Close</button>
            
            <div>
                {
                    users.map(user=>{
                        return(
                            <div key={user.id}>
                                <p>{user.fullName}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}