import { useState } from 'react';
import { getCurrentWeekDays } from '../../utils/get-current-week-days';

interface ScheduleProps{
  getMyTasks: (date?:string)=>Promise<void>
}

export default function Schedule({getMyTasks}:ScheduleProps) {
  const [days, _] = useState(getCurrentWeekDays());
  const [selectedDate, setSelectedDate] = useState(new Date().getDate()); 
  const currentMonthName = new Date().toLocaleString('en-US', { month: 'long' });

  return (
    <div className="py-4 text-white  rounded-xl">
      <h2 className="text-xl font-bold mb-4">{currentMonthName}</h2>
      
      {/* Horizontal Scroll / Grid Bar */}
      <div className="grid grid-cols-[repeat(7,1fr)] gap-2 md:gap-4 overflow-x-auto pb-2">
        {days.map((item) => {
          const isSelected = selectedDate === item.date;
          
          return (
            <button
              key={item.id}
              onClick={() =>{
                setSelectedDate(item.date);
                getMyTasks(item.fullDate)
              }}
              className={`flex flex-col items-center justify-center min-w-12 h-20 rounded-lg transition-all ${
                isSelected
                  ? 'bg-primary-yellow-100 text-black font-semibold' 
                  : 'bg-primary-blue-200 text-gray-300 hover:bg-[#323946]' 
              }`}
            >
              <span className="text-lg font-bold">{item.date}</span>
              <span className="text-xs ">{item.day}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}