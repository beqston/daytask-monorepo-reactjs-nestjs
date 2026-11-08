import { useCallback, useEffect, useState } from "react"
import api from "../../api/api";
import type { Task } from "../../types/task";
import { isAxiosError } from "axios";

export default function MyTasksList(){
    const [tasks, setTasks] = useState<Task[]>([]);
    const[quantity, setQuantity] = useState(3);
    const[error, setError]= useState(false);
    const[errorText, setErrorText]= useState(false);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const MORE_POSTS_QNT=4;

    // get starts tasks
   const fetchTasks = useCallback(async(q:number):Promise<Task[] | null>=>{
        setLoading(true);
        setError(false);
        try {
            const { data } = await api.get(`/tasks/for-profile?quantity=${q}`);
            return data;
        } catch (err) {
            setError(true);
            setErrorText(
                isAxiosError(err)
                    ? err.response?.data?.message || "Something went wrong!"
                    : "Something went wrong!"
            );
            return null;
        }finally{
            setLoading(false);
            setTimeout(()=>{
                setError(false)
            }, 10000)
        }
   }, [])

    //get starts tasks
   useEffect(()=>{
    (async()=>{
        const data = await fetchTasks(quantity);
        if(data) setTasks(data);
    })()
   }, []);


    //add new tasks
   const seeMoreTasks = useCallback(async()=>{
        if (loading || !hasMore) return;
        const nextQuantity = quantity + MORE_POSTS_QNT;
        const data = await fetchTasks(nextQuantity);
        if (!data) return;
        if(data.length < nextQuantity) setHasMore(false);
        setTasks(data);
        setQuantity(nextQuantity);
   }, [quantity, loading, hasMore, fetchTasks])

    return(
        <div className="border-2 border-primary-grey-300">
            {
                tasks?.map(t=>{
                    return(
                        <div key={t.id} className="bg-primary-black-100 text-primary-blue-100 border-2 border-primary-blue-200">
                            <h2>{t.title}</h2>
                        </div>
                    )
                })
            }

            {error && <p className="text-red-700">{errorText}</p>}
            
            {
                hasMore && 
                <button 
                    disabled={loading}
                    onClick={seeMoreTasks} type="button" className="p-4 text-primary-grey-100 text-center w-full"
                >
                    {loading ? "Loading..." : "See More"}
                </button>
            }
        </div>
    )
}