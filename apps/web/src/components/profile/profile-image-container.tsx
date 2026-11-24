import profile from "/images/profile-default.png";
import addsquare from "/images/addsquare.png";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import api from "../../api/api";
import { isAxiosError } from "axios";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setUserImage } from "../../store/slices/authSlice";

const MAX_SIZE = 4 * 1024 * 1024;

export default function ProfileImageContainer() {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const errorTimeoutRef = useRef<number | null>(null);

  function catchErrorFn(error: unknown) {
    const somethingError = "Something went wrong!";
    if (isAxiosError(error)) {
      const message = error.response?.data?.message;
      const text = Array.isArray(message) ? message[0] : message;
      setError(typeof text === "string" && text ? text : somethingError);
    } else {
      setError(somethingError);
    }

    if (errorTimeoutRef.current) {
      window.clearTimeout(errorTimeoutRef.current);
    }
    errorTimeoutRef.current = window.setTimeout(() => {
      setError(null);
    }, 8000);
  }

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError("Only JPEG, PNG, and WebP images are allowed");
      e.target.value = "";
      return;
    }

    if (file.size > MAX_SIZE) {
      setError("File size must not exceed 4MB");
      e.target.value = "";
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    const formdata = new FormData();
    formdata.append("image", file);

    try {
      const { data } = await api.patch("/users/me/avatar", formdata);
      dispatch(setUserImage(data.imageUrl));
      setPreview(null);
    } catch (error: unknown) {
      setPreview(null);
      catchErrorFn(error);
    } finally {
      if(e.target){
        e.target.value = "";
      }
    }
  }

  async function handleRemoveImage() {
    try {
      await api.delete("/users/remove/avatar");
      dispatch(setUserImage(null));
      setPreview(null);
    } catch (error: unknown) {
      catchErrorFn(error);
    }
  }

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  useEffect(() => {
    return () => {
      if (errorTimeoutRef.current) {
        window.clearTimeout(errorTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="grid place-items-center p-10">
      <div className="w-32 h-32 rounded-full relative p-1 border-primary-yellow-100 border-2 group">
        <img
          src={preview || user?.imageUrl || profile}
          alt="profile-image"
          className="object-cover w-full h-full rounded-full"
        />

        {user?.imageUrl && (
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-3/4 bg-red-400 text-purple-100 p-1 rounded-xl text-[12px] whitespace-nowrap pointer-events-auto md:opacity-0 md:pointer-events-none transition-opacity md:group-hover:opacity-100 md:group-hover:pointer-events-auto focus-visible:opacity-100 focus-visible:pointer-events-auto"
          >
            Remove image
          </button>
        )}

        <div className="absolute right-1 bottom-2 bg-primary-grey-300 rounded-full w-8 h-8 flex justify-center items-center">
          <label htmlFor="image" className="w-5 h-5 cursor-pointer">
            <img src={addsquare} alt="addsquare" className="object-fill w-full h-full" />
            <input
              onChange={handleChange}
              type="file"
              name="image"
              id="image"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
            />
          </label>
        </div>
      </div>

      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  );
}