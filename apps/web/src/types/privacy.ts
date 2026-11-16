export type Notice = {
    type: "success" | "error";
    text: string;
};

export type UpdateSetting = (
    url: string,
    payload: Record<string, boolean>,
    rollback: () => void,
    successMessage: string
) => Promise<void>;