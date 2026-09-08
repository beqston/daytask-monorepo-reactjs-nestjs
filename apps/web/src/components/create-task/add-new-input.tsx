import { useState } from "react"

export default function AddNewInput(){
    const [addInput, setAddInput] = useState(false);
    const [isNewInput, setIsNewInput] = useState(false)
    function handleAddNew(){
        setAddInput((prev)=>!prev)
        setIsNewInput((prev)=>!prev)
    }

    return(
        <div className="mt-12 font-medium cursor-pointer flex flex-col items-center">
            <h4 className="text-2xl text-primary-pure-white">
                <button 
                    type="button"
                    onClick={handleAddNew}
                >{isNewInput?"Close Input":"Add New"}
                </button>
            </h4>

            {
                addInput && (
                    <div className="text-primary-pure-white flex flex-col gap-y-2 w-full">
                        <label htmlFor="subtask" className="text-xl font-medium">Sub Task</label>
                        <input 
                            className="bg-light-blue-100 outline-0 p-4 font-normal text-xl placeholder:text-primary-pure-white" 
                            type="text" 
                            id="subtask" 
                            name="subtask" 
                            placeholder="Sub Task" 
                        />
                    </div>
                )
            }
        </div>
    )
}