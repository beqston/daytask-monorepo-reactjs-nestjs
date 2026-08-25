interface InputType{
    type:string;
    htmlFor:string;
    placehoolder:string;
    text:string;
    leftImage:string;
    rightImage?:string;
}

export default function Input({type, htmlFor, placehoolder, text, leftImage, rightImage}:InputType){
    return(
        <div className="mt-2">
            <label htmlFor={htmlFor} className="text-primary-grey-100 flex flex-col text-primary-blue-100 relative">
                {text}
                <img src={leftImage} alt="icon" width={24} height={24} className="absolute top-8 left-2"/>
                <input className=" bg-light-blue-100 p-2 pl-10" type={type} placeholder={placehoolder} id={htmlFor} />
                {
                    rightImage && <img src={rightImage} alt="icon" width={24} height={24} className="absolute right-2 top-8"/>
                }
            </label>
        </div>
    )
}