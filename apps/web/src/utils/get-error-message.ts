import { isAxiosError } from "axios";

export function getErrorMessage(
    error: unknown,
    fallback = "Something went wrong!"
): string {
    if (typeof error === "string") return error;
    if (isAxiosError(error)) return error.response?.data?.message || fallback;
    return fallback;
}