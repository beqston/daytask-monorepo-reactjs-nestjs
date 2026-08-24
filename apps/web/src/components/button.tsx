interface ButtonType{
    bgColor:string, 
    color:string,
    text:string,
    paddingY?:number;
}
export default function Button({bgColor, color, text, paddingY}:ButtonType){
    return <button className={`py-[${paddingY}px] bg-${bgColor} text-${color}`}>{text}</button>
}