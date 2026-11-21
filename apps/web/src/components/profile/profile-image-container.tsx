import profile from "/images/profile-default.png"
import addsquare from "/images/addsquare.png"
import { useEffect, useState, type ChangeEvent } from "react"
import api from "../../api/api";
import { isAxiosError } from "axios";

export default function ProfileImageContainer(){
    const[preview, setPreview] = useState<string | null>(null);
    const[error, setError] = useState<string | null>(null);
    async function handleChange(e: ChangeEvent<HTMLInputElement>){
        setError(null);
        const file = e.target.files?.[0]
        if(!file) return;
       try {
            await api.post('/upload-profile-image');
            setPreview(URL.createObjectURL(file));
       } catch (error:unknown) {
            const somethingError = "Something went wrong!" 
            if(isAxiosError(error)){
                const message = error.response?.data?.message;
                const text = Array.isArray(message) ? message[0] : message;
                setError(typeof text == "string" && text?text:somethingError)
            }else{
                setError(somethingError)
            }
            
       }
    }

    // clear memory
    useEffect(()=>{
        return ()=>{
            if(preview) URL.revokeObjectURL(preview)
        }
    },[preview])

    
    
    return(
        <div className="grid place-items-center p-10">
            <div className="w-32 h-32 rounded-full relative p-1 border-primary-yellow-100 border-2">
                <img src={preview ?? profile} alt="profile-image" className="objec-fill w-full h-full rounded-full" />

                <div className="absolute right-1 bottom-2 bg-primary-grey-300 rounded-full w-8 h-8 flex justify-center items-center">
                    <label htmlFor="image" className="w-5 h-5 cursor-pointer">
                        <img src={addsquare} alt="addsquare" className="object-fill w-full h-full"/>
                        <input onChange={handleChange} type="file" name="image" id="image" accept="image/*" className="hidden" />
                    </label>
                </div>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    )
}