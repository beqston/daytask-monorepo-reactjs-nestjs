import addsquare from "/images/create-task/addsquare.png"

export default function AddMembers(){

    return(
        <div>

            {/* members add button */}
            <div className="w-10 h-10 bg-primary-yellow-100 flex justify-center items-center cursor-pointer">
                <div className="w-6 h-6 ">
                    <img className="object-fill w-full h-full" src={addsquare} alt="addsquare" />
                </div>
            </div>
        </div>
    )
}