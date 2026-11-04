interface EditInputProps{
    name:string,
    pattern:string,
    type?:string,
    handleOnSubmit:()=>void,
}   

export default function EditInput({name, pattern, type, handleOnSubmit}:EditInputProps){
    return(
        <form onSubmit={handleOnSubmit}>
            <input type={type} name={name} pattern={pattern} />
            <button>Edit</button>
        </form>
    )
}