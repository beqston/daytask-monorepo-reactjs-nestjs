import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedLayout(){
    const isLogin = true;

    if(!isLogin){
        return <Navigate to={'/sign-in'} replace/>
    }

    return(
        <main>
            <Outlet />
        </main>
    )
}