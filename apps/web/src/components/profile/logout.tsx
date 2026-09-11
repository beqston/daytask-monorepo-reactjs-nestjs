import logout from "/images/profile/logout.png"

export default function Logout(){
    return(
        <button className="text-primary-grey-300 py-4 flex bg-primary-yellow-100 justify-center items-center gap-x-2 mt-8 md:mt-10">
            <div className="w-6 h-6">
                <img src={logout} alt="logout" className="object-fill w-full h-full"/>
            </div>
            <span>Logout</span>
        </button>
    )
}
