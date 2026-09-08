export default function TaskDetailsContainer(){
    return(
        <>
            {/* task details container */}
            <div className="flex flex-col text-primary-pure-white gap-y-4 mt-7">
                <label htmlFor="details" className="text-[16px] md:text-2xl font-medium ">Task Details</label>
                <textarea 
                    name="details" 
                    id="details" 
                    className="w-full pl-8 bg-light-blue-100 py-3 outline-0 text-[16px] md:text-xl placeholder:text-primary-pure-white resize-none
                                [scrollbar-width:scrollbar] 
                                [scrollbar-color:#3b82f6_transparent] 
                                [&::-webkit-scrollbar]:w-2 
                                [&::-webkit-scrollbar-thumb]:bg-blue-500 
                                [&::-webkit-scrollbar-thumb]:rounded-full 
                                [&::-webkit-scrollbar-track]:bg-transparent" 
                    placeholder="Task Details"
                ></textarea>
            </div>
        </>
    )
}