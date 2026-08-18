interface ButtonType{
    bgColor:string, 
    color:string,
    text:string,
}
export default function Button({bgColor, color, text}:ButtonType){
    return <button className={`w-full h-full bg-${bgColor} text-${color}`}>{text}</button>
}