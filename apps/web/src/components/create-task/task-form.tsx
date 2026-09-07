import TimeDateContainer from "./date-time";

export default function TaskForm(){
    return(
        <section className="mt-14">

            <form action="/" method="POST">

                {/*task title container */}
                <div className="flex flex-col text-primary-pure-white gap-y-3">
                    <label htmlFor="title" className="text-[16px] md:text-2xl font-medium">Task Title</label>
                    <input type="text" id="title" placeholder="Hi-Fi Wireframe" name="title" className="w-full pl-8 bg-light-blue-100 py-3 outline-0 text-[16px] md:text-xl md:py-4 placeholder:text-primary-pure-white" />
                </div>

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

                <TimeDateContainer />
                   
            </form>
            
        </section>
    )
}