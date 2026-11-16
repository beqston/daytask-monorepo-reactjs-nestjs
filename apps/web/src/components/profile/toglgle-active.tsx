import type { Dispatch, SetStateAction } from "react";
import type { UpdateSetting } from "../../types/privacy"; 


interface ToggleActiveProps {
    isActive: boolean;
    setIsActive: Dispatch<SetStateAction<boolean>>;
    updateSetting: UpdateSetting;
    disabled?: boolean;
}

export default function ToggleActive({
    isActive,
    setIsActive,
    updateSetting,
    disabled = false,
}: ToggleActiveProps) {
    // handle change active
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

    return (
        <div className="flex justify-between mt-4 items-center">
            <h3 id="active-label">Change active status:</h3>
            <div className="flex items-center gap-2">
                <span>Off</span>
                <button
                    type="button"
                    role="switch"
                    aria-checked={isActive}
                    aria-labelledby="active-label"
                    disabled={disabled}
                    onClick={() => handleActiveChange(!isActive)}
                    className="w-14 h-7 rounded-2xl bg-primary-blue-100 relative cursor-pointer border-0 outline-none focus:ring-2 focus:ring-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed"
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
    );
}