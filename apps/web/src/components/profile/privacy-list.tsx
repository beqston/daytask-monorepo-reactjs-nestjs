import { useState } from "react";

export default function PrivacyList(){
    const [visibility, setVisibility] = useState<"public" | "private">("public");


    async function handleChange(){
        try {
             
        } catch (error) {
            
        }
    }
    return(
        <div className="text-white">
            <div className="flex justify-between">
                <h2>Profile Visibility: </h2>
                <form>
                    <div className="flex gap-2">
                        <label htmlFor="public">Public</label>
                        <input
                            type="radio"
                            id="public"
                            name="visibility"
                            value="public"
                            checked={visibility === "public"}
                            onChange={() => setVisibility("public")}
                        />
                    </div>

                    <div className="flex gap-2">
                        <label htmlFor="private">Private</label>
                        <input
                            type="radio"
                            id="private"
                            name="visibility"
                            value="private"
                            checked={visibility === "private"}
                            onChange={() => setVisibility("private")}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}