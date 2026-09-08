import clock from "/images/create-task/clock.png"
import calendar from "/images/create-task/calendar.png"
import { useState } from "react";

export default function TimeDateContainer(){

    const [time, setTime] = useState("10:30")
    const [date, setDate] = useState("15/11/2022")

    function formatTime(time24: string) {
        if (!time24) return "";
        const [hoursStr, minutes] = time24.split(":");
        const hours = parseInt(hoursStr, 10);
        const period = hours >= 12 ? "PM" : "AM";
        const hours12 = hours % 12 || 12; // 0 → 12
        return `${hours12}:${minutes} ${period}`;
    }
    return(
        <>
            {/*time & date container */}
            <div className="flex flex-col text-primary-pure-white gap-y-3 mt-7">
                <p className="text-[16px] md:text-2xl font-medium">Time & Date</p>

                <div className="grid grid-cols-2 gap-x-4">
                    <div className="flex">
                        <label htmlFor="clock" className="bg-primary-yellow-100 w-10 h-10 flex justify-center items-center  relative">
                            <div className="w-6 h-6 ">
                                <img src={clock}  alt="clock" className="object-fill w-full h-full top-0 left-0 z-10"/>
                            </div>
                            <input 
                                type="time" 
                                name="clock" 
                                id="clock" 
                                className="w-full h-full absolute top-0 left-0 opacity-0 z-20 cursor-pointer" 
                                onChange={(e)=>setTime(e.target.value)}
                            />
                        </label>
                        <input 
                            className="w-full min-h-full bg-light-blue-100 flex items-center pl-2 outline-0" 
                            type="text" 
                            pattern="^((0?[1-9]|1[0-2]):[0-5][0-9]\s?(?:[Aa][Mm]|[Pp][Mm])|([01]?[0-9]|2[0-3]):[0-5][0-9])$" 
                            value={time} 
                            onChange={(e)=>setTime(e.target.value)} 
                        />
                    </div>


                    <div className="flex">
                        <label htmlFor="date" className="bg-primary-yellow-100 w-10 h-10 flex justify-center items-center relative">
                            <div className="w-6 h-6 ">
                                <img src={calendar}  alt="calendar" className="object-fill w-full h-full top-0 left-0 z-10"/>
                            </div>
                            <input type="date" name="date" id="date" className="w-full h-full absolute top-0 left-0 opacity-0 z-20 cursor-pointer" onChange={(e)=>setDate(e.target.value)}/>
                        </label>
                        <input 
                            type="text" 
                            value={date} 
                            onChange={(e)=>setDate(e.target.value)} 
                            className="w-full min-h-full bg-light-blue-100 flex items-center pl-2 outline-0"
                            pattern="^(\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])|(0[1-9]|[12][0-9]|3[01])[\/.-](0[1-9]|1[0-2])[\/.-]\d{4})$"
                        />
                    </div>
                </div>

            </div>
        </>
    )
}