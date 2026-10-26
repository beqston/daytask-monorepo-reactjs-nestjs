import { useState } from "react";
import clock from "/images/create-task/clock.png";
import calendar from "/images/create-task/calendar.png";

interface TimeDateContainerProps {
    date: string;
    time: string;
    onDateChange: (value: string) => void;
    onTimeChange: (value: string) => void;
}

const MIN_OFFSET_MS = 2 * 60 * 60 * 1000;
const pad = (n: number) => String(n).padStart(2, "0");

export default function TimeDateContainer({
    date,
    time,
    onDateChange,
    onTimeChange,
}: TimeDateContainerProps) {
    const [error, setError] = useState("");

    const minMoment = new Date(Date.now() + MIN_OFFSET_MS);
    const minDate = minMoment.toLocaleDateString("en-CA");
    const minTime = `${pad(minMoment.getHours())}:${pad(minMoment.getMinutes())}`; 

    const isTooSoon = (d: string, t: string) =>
        d !== "" &&
        t !== "" &&
        (d < minDate || (d === minDate && t < minTime));

    const errorText = "Time must be at least 2 hours from now!";

    function handleTimeChange(value: string) {
        if (isTooSoon(date, value)) {
            setError(errorText);
            onTimeChange("");
            return;
        }
        setError("");
        onTimeChange(value);
    }

    function handleDateChange(value: string) {
        onDateChange(value);
        if (isTooSoon(value, time)) {
            setError(errorText);
            onTimeChange("");
        } else {
            setError("");
        }
    }

    function formatTime(time24: string) {
        if (!time24) return "";
        const [hoursStr, minutes] = time24.split(":");
        const hours = parseInt(hoursStr, 10);
        const period = hours >= 12 ? "PM" : "AM";
        const hours12 = hours % 12 || 12;
        return `${hours12}:${minutes} ${period}`;
    }

    function formatDate(date: string) {
        if (!date) return "";
        const [year, month, day] = date.split("-");
        return `${day}/${month}/${year}`;
    }

    return (
        <div className="flex flex-col text-primary-pure-white gap-y-3 mt-7">
            <p className="text-[16px] md:text-2xl font-medium">Time & Date</p>

            <div className="grid grid-cols-2 gap-x-4">
                {/* time */}
                <div className="flex">
                    <label
                        htmlFor="clock"
                        className="bg-primary-yellow-100 w-10 h-10 flex justify-center items-center relative"
                    >
                        <img src={clock} alt="clock" className="w-6 h-6 object-fill" />
                        <input
                            type="time"
                            id="clock"
                            name="time"
                            value={time}
                            onChange={(e) => handleTimeChange(e.target.value)}
                            className="w-full h-full absolute top-0 left-0 opacity-0 z-20 cursor-pointer"
                        />
                    </label>
                    <input
                        type="text"
                        value={formatTime(time)}
                        readOnly
                        className="w-full min-h-full bg-light-blue-100 flex items-center pl-2 outline-0"
                    />
                </div>

                {/* date */}
                <div className="flex">
                    <label
                        htmlFor="date"
                        className="bg-primary-yellow-100 w-10 h-10 flex justify-center items-center relative"
                    >
                        <img src={calendar} alt="calendar" className="w-6 h-6 object-fill" />
                        <input
                            type="date"
                            id="date"
                            name="date"
                            min={minDate}
                            value={date}
                            onChange={(e) => handleDateChange(e.target.value)}
                            className="w-full h-full absolute top-0 left-0 opacity-0 z-20 cursor-pointer"
                        />
                    </label>
                    <input
                        type="text"
                        value={formatDate(date)}
                        readOnly
                        className="w-full min-h-full bg-light-blue-100 flex items-center pl-2 outline-0"
                    />
                </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
}