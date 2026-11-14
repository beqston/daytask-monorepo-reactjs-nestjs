import { useEffect, useState } from "react";
import api from "../../api/api";
import { isAxiosError } from "axios";
import ErrorMessage from "../error/error";


export default function PrivacyList() {
    const [isPublic, setIsPublic] = useState(false);
    const [error, setError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isSuccessText, setIsSuccessText] = useState("");
    const [errorText, setErrorText] = useState("");
    const [isActive, setIsActive] = useState(true);

    async function getPrivacy() {
        try {
            const { data } = await api.get("/users/check-privacy");
            setIsPublic(data.isPublic);
            setIsActive(data.isActive);
        } catch (error) {
            setError(true);
            setErrorText(
                isAxiosError(error)
                    ? error.response?.data?.message || "Something went wrong!"
                    : "Something went wrong!"
            );
        }
    }

    // helper function for API call
    async function updateSetting(
        url: string,
        payload: Record<string, boolean>,
        rollback: () => void,
        successMessage: string
    ) {
        setError(false);
        setIsSuccess(false);

        try {
            await api.post(url, payload);
            setIsSuccess(true);
            setIsSuccessText(successMessage);
        } catch (error) {
            rollback();
            setError(true);
            setErrorText(
                isAxiosError(error)
                    ? error.response?.data?.message || "Something went wrong!"
                    : "Something went wrong!"
            );
        }
    }

    const handlePrivacyChange = (newValue: boolean) => {
        const previous = isPublic;
        setIsPublic(newValue); // Optimistic update
        updateSetting(
            "/users/change-privacy",
            { isPublic: newValue },
            () => setIsPublic(previous),
            "Privacy changed successfully"
        );
    };

    const handleActiveChange = (newValue: boolean) => {
        const previous = isActive;
        setIsActive(newValue); // Optimistic update
        updateSetting(
            "/users/change-active",
            { isActive: newValue },
            () => setIsActive(previous),
            "Active status changed successfully!"
        );
    };

    useEffect(() => {
        getPrivacy();
    }, []);

    useEffect(() => {
        if (!isSuccess && !error) return;

        const timer = setTimeout(() => {
            setIsSuccess(false);
            setError(false);
        }, 4000);

        return () => clearTimeout(timer);
    }, [isSuccess, error]);

    return (
        <div className="text-white">
            {/* Profile visibility container */}
            <div className="flex justify-between items-center">
                <h2>Profile Visibility: </h2>
                <form className="flex gap-4">
                    <div className="flex gap-2 items-center">
                        <label htmlFor="public">Public</label>
                        <input
                            type="radio"
                            id="public"
                            name="visibility"
                            checked={isPublic}
                            onChange={() => handlePrivacyChange(true)}
                            className="w-4 accent-emerald-400 cursor-pointer"
                        />
                    </div>

                    <div className="flex gap-2 items-center">
                        <label htmlFor="private">Private</label>
                        <input
                            type="radio"
                            id="private"
                            name="visibility"
                            checked={!isPublic}
                            onChange={() => handlePrivacyChange(false)}
                            className="w-4 accent-emerald-400 cursor-pointer"
                        />
                    </div>
                </form>
            </div>

            {/* Toggle active container */}
            <div className="flex justify-between mt-4 items-center">
                <h3>Change active status:</h3>
                <div className="flex items-center gap-2">
                    <span>Off</span>
                    <button
                        type="button"
                        role="switch"
                        aria-checked={isActive}
                        onClick={() => handleActiveChange(!isActive)}
                        className="w-14 h-7 rounded-2xl bg-primary-blue-100 relative cursor-pointer border-0 outline-none focus:ring-2 focus:ring-emerald-400"
                    >
                        <div
                            className={`absolute w-5 h-5 bg-emerald-700 rounded-full top-1 left-1 transition-transform duration-500 ease-in-out ${
                                isActive ? "translate-x-7" : "translate-x-0"
                            }`}
                        ></div>
                    </button>
                    <span>On</span>
                </div>
            </div>

            {error && <ErrorMessage text={errorText} />}
            {isSuccess && (
                <p className="fixed right-2 top-1 bg-primary-grey-300 p-2 text-green-300 rounded shadow-md">
                    {isSuccessText}
                </p>
            )}
        </div>
    );
}