interface InputType{
    type:string,
    htmlFor:string,
    placeholder:string,
    leftImage:string,
    text?:string,
    rightImage:string,
    pattern?:string,
    value?:string,
    title?:string,
    onChange?:(e: React.ChangeEvent<HTMLInputElement>) => void,
    onClick?: (e:React.MouseEvent<HTMLImageElement, MouseEvent>)=>void,
}

export default function Input({type, htmlFor, placeholder, text, leftImage, rightImage, onChange, value, pattern, title, onClick}:InputType){
    return(
        <div className="mt-2">
            <label htmlFor={htmlFor} className="text-primary-grey-100 flex flex-col relative">
                {text}
                <img src={leftImage} alt="icon" width={24} height={24} className={`absolute ${text?"top-8 left-2":"top-2 left-2"}`}/>
                <input title={title} onChange={onChange} value={value} readOnly className="outline-0 bg-light-blue-100 p-2 pl-10" type={type} name={htmlFor} placeholder={placeholder} id={htmlFor} pattern={pattern} />
                
                <img onClick={onClick} src={rightImage} alt="icon" width={24} height={24} className={`absolute ${text?"right-2 top-8":"right-2 top-2"} cursor-pointer`}/>
            </label>
        </div>
    )
}