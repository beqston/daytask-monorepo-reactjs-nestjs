import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

export default function LoginLayout(){
    const {isAuth} = useAppSelector(state=>state.auth);
    
    
    if(isAuth){
       return <Navigate to={'/home'} replace />
    }
    return(
        <main>
            <Outlet />
        </main>
    )
}