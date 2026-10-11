import { useEffect, useState } from "react"
import api from "../../api/api";

export default function GetUser(){
    const [users, setUsers] = useState();

    async function getAllUsers(){
        const { data } = await api.get('/users');
        console.log(data);
    }

    useEffect(()=>{
        getAllUsers();
    }, []);

    return(
        <div className="absolute">
            
        </div>
    )
}