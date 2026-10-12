import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { getAuthMe } from "../store/slices/authSlice";

export default function Layout(){
    const dispatch = useAppDispatch();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if(isLoggedIn){
            dispatch(getAuthMe());
        }
    }, [dispatch]);
    
    return <Outlet />
}