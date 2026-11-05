interface EditInputProps{
    name:string,
    pattern:string,
    type?:string,
    handleOnSubmit:()=>void,
}   

export default function EditInput({name, pattern, type, handleOnSubmit}:EditInputProps){
    return(
        <form className="fixed top-10 w-1/2 -translate-1/2 bg-primary-black-200 text-primary-pure-white h-20" onSubmit={handleOnSubmit}>
            <input type={type} name={name} pattern={pattern} />
            <button>Edit</button>
        </form>
    )
}