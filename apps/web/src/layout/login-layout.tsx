import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { Loading } from "../components/ui/loading";

export default function LoginLayout(){
    const {isAuth, loading} = useAppSelector(state=>state.auth);
    
    if(loading){
        return <Loading />
    }
    
    if(isAuth){
       return <Navigate to={'/home'} replace />
    }
    return(
        <main>
            <Outlet />
        </main>
    )
}