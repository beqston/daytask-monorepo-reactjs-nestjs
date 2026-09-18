export default function ErrorMessage({text}:{text:string}){
    return <p className="absolute right-1 top-1 p-2 text-red-400 bg-primary-grey-300">{text}</p>
}