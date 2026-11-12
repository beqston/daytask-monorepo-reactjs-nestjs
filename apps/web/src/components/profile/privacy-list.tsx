import { useEffect, useState } from "react";
import api from "../../api/api";
import { isAxiosError } from "axios";
import ErrorMessage from "../error/error";

export default function PrivacyList(){
    const [isPublic, setIsPublic] = useState(false);
    const[error, setError] = useState(false);
    const[isSuccess, setIsSuccess] = useState(false);
    const[errorText, setErrorText] = useState("");

    async function getPrivacy(){
        try {
            const { data } = await api.get("/users/check-privacy");
            setIsPublic(data.isPublic);
        } catch (error) {
            setError(true);
            setErrorText(isAxiosError(error)?error.response?.data?.message || "Something went wrong!":"Something went wrong!")
        }
    }

    useEffect(()=>{
        getPrivacy()
    }, [])

    async function handleChange(newValue: boolean) {
        const previous = isPublic;
        setIsPublic(newValue); // optimistic update
        setError(false);

        try {
            await api.post('/users/change-privacy', { isPublic: newValue });
            setIsSuccess(true)
        } catch (error) {
            setIsPublic(previous); //if error get back
            setError(true);
            setErrorText(
                isAxiosError(error)
                    ? error.response?.data?.message || "Something went wrong!"
                    : "Something went wrong!"
            );
        }finally{
            setTimeout(() => {
               if(isSuccess){
                 setIsSuccess(false);
               }

               if(error){
                setError(false);
               }
            }, 4000);
        }
    }


    return(
        <div className="text-white">
            <div className="flex justify-between">
                <h2>Profile Visibility: </h2>
                <form className="flex gap-4">
                    <div className="flex gap-2">
                        <label htmlFor="public">Public</label>
                        <input
                            type="radio"
                            id="public"
                            name="visibility"
                            checked={isPublic}
                            onChange={() => handleChange(true)}
                            className="w-4 accent-emerald-400"
                        />
                    </div>

                    <div className="flex gap-2">
                        <label htmlFor="private">Private</label>
                        <input
                            type="radio"
                            id="private"
                            name="visibility"
                            checked={!isPublic}
                            onChange={() => handleChange(false)}
                            className="w-4 accent-emerald-400"
                        />
                    </div>
                </form>
            </div>

            {error && <ErrorMessage text={errorText} />}
            {isSuccess && <p className="fixed right-2 top-1 bg-primary-grey-300 p-2 text-green-300">Privacy changed successfully!</p>}
        </div>
    )
}