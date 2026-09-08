export default function TaskTitleContainer(){
    return(
        <>
            {/*task title container */}
            <div className="flex flex-col text-primary-pure-white gap-y-3">
                <label htmlFor="title" className="text-[16px] md:text-2xl font-medium">Task Title</label>
                <input type="text" id="title" placeholder="Hi-Fi Wireframe" name="title" className="w-full pl-8 bg-light-blue-100 py-3 outline-0 text-[16px] md:text-xl md:py-4 placeholder:text-primary-pure-white" />
            </div>
        </>
    )
}