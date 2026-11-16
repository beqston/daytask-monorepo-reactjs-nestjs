import { useEffect, useState } from "react";
import api from "../../api/api";
import ErrorMessage from "../error/error";
import ProfileVisibility from "./profile-visibility";
import ToggleActive from "./toglgle-active"; 
import DeleteAccount from "./delete-account";
import { getErrorMessage } from "../../utils/get-error-message"; 
import type { Notice, UpdateSetting } from "../../types/privacy"; 

export default function PrivacyList() {
    const [isPublic, setIsPublic] = useState(false);
    const [isActive, setIsActive] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [notice, setNotice] = useState<Notice | null>(null);

    useEffect(() => {
        async function getPrivacy() {
            try {
                const { data } = await api.get("/users/check-privacy");
                setIsPublic(data.isPublic);
                setIsActive(data.isActive);
            } catch (error) {
                setLoadError(getErrorMessage(error));
            } finally {
                setIsLoading(false);
            }
        }

        getPrivacy();
    }, []);

    // notification auto-hide
    useEffect(() => {
        if (!notice) return;

        const timer = setTimeout(() => setNotice(null), 4000);
        return () => clearTimeout(timer);
    }, [notice]);

    // helper function for API call
    const updateSetting: UpdateSetting = async (
        url,
        payload,
        rollback,
        successMessage
    ) => {
        setNotice(null);
        setIsSaving(true);

        try {
            await api.post(url, payload);
            setNotice({ type: "success", text: successMessage });
        } catch (error) {
            rollback();
            setNotice({ type: "error", text: getErrorMessage(error) });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <p className="text-white">Loading...</p>;
    if (loadError) return <ErrorMessage text={loadError} />;

    return (
        <div className="text-white">
            <ProfileVisibility
                isPublic={isPublic}
                setIsPublic={setIsPublic}
                updateSetting={updateSetting}
                disabled={isSaving}
            />

            <ToggleActive
                isActive={isActive}
                setIsActive={setIsActive}
                updateSetting={updateSetting}
                disabled={isSaving}
            />

            <DeleteAccount onError={(text) => setNotice({ type: "error", text })} />

            {notice?.type === "error" && <ErrorMessage text={notice.text} />}
            {notice?.type === "success" && (
                <p className="fixed right-2 top-1 bg-primary-grey-300 p-2 text-green-300 rounded shadow-md">
                    {notice.text}
                </p>
            )}
        </div>
    );
}