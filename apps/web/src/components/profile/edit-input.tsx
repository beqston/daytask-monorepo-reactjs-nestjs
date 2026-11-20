import { useEffect, useRef, useState } from "react";
import axios from "axios";
import api from "../../api/api";
import { useAppDispatch } from "../../store/hooks";
import { setUser } from "../../store/slices/authSlice";

interface EditInputProps {
    name: "email" | "fullName" | "password";
    pattern?: string;
    type?: string;
    setShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditInput({ name, pattern, type, setShowEdit }: EditInputProps) {
    const formList = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        function handleCloseForm(e: PointerEvent) {
            if (formList.current && !formList.current.contains(e.target as Node)) {
                setShowEdit(false);
            }
        }

        document.addEventListener("pointerdown", handleCloseForm);
        return () => document.removeEventListener("pointerdown", handleCloseForm);
    }, [setShowEdit]);

    async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (loading) return;

        try {
            setError("");
            setLoading(true);
            const { data } = await api.patch(`/users/update-user`, { [name]: value });
            dispatch(setUser(data))
            setShowEdit(false);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const message = err.response?.data?.message;
                setError(Array.isArray(message) ? message[0] : message ?? "User not updated!");
            } else {
                setError("User not updated!");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div ref={formList} className="flex gap-2 p-8 fixed top-1/4 w-1/2 -translate-x-1/2 left-1/2 z-10 bg-primary-blue-100 text-primary-pure-white">
            <form className="w-full flex flex-col" onSubmit={handleOnSubmit}>
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="bg-primary-black-100 p-4 outline-0"
                    type={type}
                    name={name}
                    placeholder={name}
                    pattern={pattern}
                    required
                />
                <button type="submit" disabled={loading} className="bg-light-blue-100 p-4 disabled:opacity-50">
                    {loading ? "Saving..." : "Edit"}
                </button>
            </form>

            <button
                type="button"
                className="absolute right-1 top-0 text-primary-black-200 p-1 bg-amber-200"
                onClick={() => setShowEdit(false)}
            >
                Close
            </button>

            {error && <p className="text-red-300 absolute bottom-0 left-2">{error}</p>}
        </div>
    );
}