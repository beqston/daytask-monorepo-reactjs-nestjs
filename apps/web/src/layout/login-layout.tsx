import { Navigate, Outlet } from "react-router-dom";

export default function LoginLayout(){
    const isLogin = true;
    if(isLogin){
       return <Navigate to={'/home'} replace />
    }
    return(
        <main>
            <Outlet />
        </main>
    )
}