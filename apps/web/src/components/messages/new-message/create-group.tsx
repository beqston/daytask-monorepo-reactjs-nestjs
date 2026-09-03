import group from "/images/task-details/group.png"

export default function CreateGroup(){
    return(
        <div className="flex mt-14 gap-4 pb-4">
            {/* logo and bg-color container */}
            <div className="bg-primary-yellow-100 p-4 rounded-full">
                <img src={group} alt="group" />
            </div>

            {/* create group */}
            <input type="button" value="Create a group" className="text-primary-pure-white cursor-pointer" />
        </div>
    )
}