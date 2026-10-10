import { useNavigate } from "react-router-dom";
import InputsWrapper from "../components/profile/inputs-wrapper";
import ProfileHead from "../components/profile/profile-head";
import ProfileImageContainer from "../components/profile/profile-image-container";
import PagesWrapper from "../components/ui/pages-wrapper";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useState } from "react";
import ErrorMessage from "../components/error/error";
import { Loading } from "../components/ui/loading";
import { logoutUser } from "../store/slices/authSlice";


export default function Profile(){
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {error, loading} = useAppSelector(state=>state.auth);
    const[errorText, setErrorText] = useState("");

    async function handleLogout(){
        try {
            await dispatch(logoutUser()).unwrap();
            navigate("/sign-in", { replace:true })
        } catch (err:any) {
            setErrorText(err);
        }
    }
    return(
        <PagesWrapper>
            <ProfileHead />
            <ProfileImageContainer />
            <InputsWrapper handleLogout={handleLogout} />
            
            {
                loading && <Loading />
            }

            {
                error && <ErrorMessage text={errorText} />
            }
        </PagesWrapper>
    )
}