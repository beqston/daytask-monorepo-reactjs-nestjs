import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { deleteUser } from "../../store/slices/authSlice";
import { getErrorMessage } from "../../utils/get-error-message"; 

interface DeleteAccountProps {
    onError: (text: string) => void;
}

export default function DeleteAccount({ onError }: DeleteAccountProps) {
    // ref wraps both the button and the confirm dialog,
    // so clicking the button is not treated as an "outside" click
    const containerRef = useRef<HTMLDivElement>(null);
    const [showDelete, setShowDelete] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // remove user account
    async function handleDeleteUser() {
        setIsDeleting(true);
        try {
            await dispatch(deleteUser()).unwrap();
            // ideally this lives inside the deleteUser thunk / authSlice fulfilled case
            localStorage.removeItem("isLoggedIn");
            // PrivacyList unmounts after navigation, so pass the message via route state
            // and show it on the sign-in page: useLocation().state?.message
            navigate("/sign-in", { state: { message: "Account deleted!" } });
        } catch (err) {
            setShowDelete(false);
            onError(getErrorMessage(err));
        } finally {
            setIsDeleting(false);
        }
    }

    // close on outside click / Escape (only while the dialog is open)
    useEffect(() => {
        if (!showDelete) return;

        function handlePointerDown(e: PointerEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setShowDelete(false);
            }
        }

        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") setShowDelete(false);
        }

        window.addEventListener("pointerdown", handlePointerDown);
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("pointerdown", handlePointerDown);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [showDelete]);

    return (
        <div ref={containerRef}>
            <div className="flex justify-end mt-2">
                <button
                    onClick={() => setShowDelete(true)}
                    type="button"
                    className="bg-primary-blue-100 p-2 rounded-2xl text-red-300"
                >
                    Delete Account
                </button>
            </div>

            {showDelete && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="delete-title"
                    className="fixed top-[10vh] left-1/2 -translate-x-1/2 w-1/3 p-4 bg-primary-pure-black text-white opacity-90"
                >
                    <p id="delete-title" className="w-full text-center text-xl">
                        Are you sure you want to delete your account?
                    </p>
                    <div className="w-full grid grid-cols-2 gap-x-3 pt-4">
                        <button
                            onClick={() => setShowDelete(false)}
                            type="button"
                            disabled={isDeleting}
                            className="p-4 bg-red-300 text-xl font-bold rounded-2xl disabled:opacity-60"
                        >
                            No
                        </button>
                        <button
                            onClick={handleDeleteUser}
                            type="button"
                            disabled={isDeleting}
                            className="p-4 bg-green-300 text-xl font-bold rounded-2xl disabled:opacity-60"
                        >
                            Yes
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}