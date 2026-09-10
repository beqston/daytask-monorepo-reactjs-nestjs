import profile from "/images/profile-img.png"
import addsquare from "/images/addsquare.png"

export default function ProfileImageContainer(){
    return(
        <div className="grid place-items-center p-10">
            <div className="w-32 h-32 rounded-full relative p-1 border-primary-yellow-100 border-2">
                <img src={profile} alt="profile-image" className="objec-fill w-full h-full" />

                <div className="absolute right-1 bottom-2 bg-primary-grey-300 rounded-full w-8 h-8 flex justify-center items-center">
                    <div className="w-5 h-5 cursor-pointer">
                        <img src={addsquare} alt="addsquare" className="object-fill w-full h-full"/>
                    </div>
                </div>
            </div>
        </div>
    )
}