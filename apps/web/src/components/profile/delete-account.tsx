import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { deleteUser } from "../../store/slices/authSlice";
import { getErrorMessage } from "../../utils/get-error-message"; 

interface DeleteAccountProps {
    onError: (text: string) => void;
}

export default function DeleteAccount({ onError }: DeleteAccountProps) {
    
    const containerRef = useRef<HTMLDivElement>(null);
    const [showDelete, setShowDelete] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    // We control buttons
    const triggerRef = useRef<HTMLButtonElement>(null);
    const cancelRef = useRef<HTMLButtonElement>(null);
    const dialogRef = useRef<HTMLDivElement>(null);

    // remove user account
    async function handleDeleteUser() {
        setIsDeleting(true);
        try {
            await dispatch(deleteUser()).unwrap();
            localStorage.removeItem("isLoggedIn");
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
        cancelRef.current?.focus();
        function handlePointerDown(e: PointerEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setShowDelete(false);
            }
        }

        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") {
                setShowDelete(false);
                return;
            }
            if (e.key !== "Tab") return;

            const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
                "button:not([disabled])"
            );
            if (!focusable?.length) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }

        window.addEventListener("pointerdown", handlePointerDown);
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("pointerdown", handlePointerDown);
            window.removeEventListener("keydown", handleKeyDown);
            triggerRef.current?.focus();
        };
    }, [showDelete]);

    return (
        <div ref={containerRef}>
            <div className="flex justify-end mt-2">
                <button
                    ref={triggerRef}
                    onClick={() => setShowDelete(true)}
                    type="button"
                    className="bg-primary-blue-100 p-2 rounded-2xl text-red-300"
                >
                    Delete Account
                </button>
            </div>

            {showDelete && (
                <div
                    ref={dialogRef}
                    role="alertdialog"
                    aria-modal="true"
                    aria-labelledby="delete-title"
                    aria-describedby="delete-desc"
                    className="fixed top-[10vh] left-1/2 -translate-x-1/2 w-1/3 p-4 bg-primary-pure-black text-white opacity-90"
                >
                    <p id="delete-title" className="w-full text-center text-xl">
                        Are you sure you want to delete your account?
                    </p>
                    <div className="w-full grid grid-cols-2 gap-x-3 pt-4">
                        <button
                            ref={cancelRef}
                            onClick={() => setShowDelete(false)}
                            type="button"
                            disabled={isDeleting}
                            className="bg-red-300 text-xl font-bold rounded-2xl disabled:opacity-70"
                        >
                            No
                        </button>
                        <button
                            onClick={handleDeleteUser}
                            type="button"
                            disabled={isDeleting}
                            className="p-4 bg-green-300 text-xl font-bold rounded-2xl disabled:opacity-70"
                            aria-busy={isDeleting}
                        >
                            {isDeleting?"Deleting...":"Yes"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}