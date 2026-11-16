import type { Dispatch, SetStateAction } from "react";
import type { UpdateSetting } from "../../types/privacy"; 
 

interface ProfileVisibilityProps {
    isPublic: boolean;
    setIsPublic: Dispatch<SetStateAction<boolean>>;
    updateSetting: UpdateSetting;
    disabled?: boolean;
}

export default function ProfileVisibility({
    isPublic,
    setIsPublic,
    updateSetting,
    disabled = false,
}: ProfileVisibilityProps) {
    // handle change profile privacy, if it is public or private
    const handlePrivacyChange = (newValue: boolean) => {
        if (newValue === isPublic) return;

        const previous = isPublic;
        setIsPublic(newValue); // Optimistic update
        updateSetting(
            "/users/change-privacy",
            { isPublic: newValue },
            () => setIsPublic(previous),
            "Privacy changed successfully"
        );
    };

    return (
        <div className="flex justify-between items-center">
            <h2 id="visibility-label">Profile Visibility:</h2>
            <div
                role="radiogroup"
                aria-labelledby="visibility-label"
                className="flex gap-4"
            >
                <div className="flex gap-2 items-center">
                    <label htmlFor="public">Public</label>
                    <input
                        type="radio"
                        id="public"
                        name="visibility"
                        checked={isPublic}
                        disabled={disabled}
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
                        disabled={disabled}
                        onChange={() => handlePrivacyChange(false)}
                        className="w-4 accent-emerald-400 cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );
}