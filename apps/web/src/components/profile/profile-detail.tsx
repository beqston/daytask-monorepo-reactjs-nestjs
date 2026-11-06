interface ProfileDetailProps{
    leftImage:string,
    rightImage:string,
    value?:string,
    onClick?: (e:React.MouseEvent<HTMLImageElement, MouseEvent>)=>void,
}

export default function ProfileDetail({ leftImage, rightImage, value, onClick}:ProfileDetailProps){
    return(
        <div className="mt-2">
            <div className="text-primary-grey-100 flex flex-col relative">
                <img src={leftImage} alt="icon" width={24} height={24} className={`absolute top-2 left-2`}/>
                <div className="outline-0 bg-light-blue-100 p-2 pl-10">
                    {value}
                </div>
                <img onClick={onClick} src={rightImage} alt="icon" width={24} height={24} className={`absolute right-2 top-2 cursor-pointer`}/>
            </div>
        </div>
    )
}