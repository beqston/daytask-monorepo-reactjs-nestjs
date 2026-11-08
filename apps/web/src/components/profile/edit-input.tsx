import { useEffect, useRef } from "react"

interface EditInputProps {
    name: string,
    pattern: string,
    type?: string,
    handleOnSubmit: () => void,
    setShowEdit: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function EditInput({ name, pattern, type, handleOnSubmit, setShowEdit }: EditInputProps) {
    const formList = useRef<HTMLFormElement>(null);

    useEffect(() => {
        function handleCloseForm(e: PointerEvent) {
            if (formList.current && !formList.current.contains(e.target as Node)) {
                setShowEdit(false);
            }
        }

        document.addEventListener("pointerdown", handleCloseForm);
        return () => {
            document.removeEventListener("pointerdown", handleCloseForm);
        };
    }, []);

    return (
        <form
            ref={formList}
            className="flex flex-col gap-2 p-8 fixed top-1/4 w-1/2 -translate-x-1/2 left-1/2 z-10 bg-primary-blue-100 text-primary-pure-white"
            onSubmit={handleOnSubmit}
        >
            <input className="bg-primary-black-100 p-4 outline-0" type={type} name={name} placeholder={name} pattern={pattern} />
            <button className="bg-light-blue-100 p-4">Edit</button>
            <button onClick={() => setShowEdit(false)} type="button" className="absolute right-1 top-0 text-primary-black-200">Close</button>
        </form>
    )
}