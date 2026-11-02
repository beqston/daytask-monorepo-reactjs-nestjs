import { useState } from 'react';
import { getCurrentWeekDays } from '../../utils/get-current-week-days';

interface ScheduleProps {
  getMyTasks: (date?: string) => Promise<void>;
  selectedFullDate: string;
  setSelectedFullDate: (date: string) => void;
}

export default function Schedule({ getMyTasks, selectedFullDate, setSelectedFullDate }: ScheduleProps) {
  const [days, _] = useState(getCurrentWeekDays());
  const currentMonthName = new Date().toLocaleString('en-US', { month: 'long' });

  return (
    <div className="py-4 text-white rounded-xl">
      <h2 className="text-xl font-bold mb-4">{currentMonthName}</h2>
      
      <div className="grid grid-cols-[repeat(7,1fr)] gap-2 md:gap-4 overflow-x-auto pb-2">
        {days.map((item) => {
          const isSelected = selectedFullDate === item.fullDate;
          
          return (
            <button
              key={item.id}
              onClick={() => {
                setSelectedFullDate(item.fullDate); // ვცვლით მშობელში არჩეულ თარიღს
                getMyTasks(item.fullDate);         // ვტვირთავთ შესაბამის თასკებს
              }}
              className={`flex flex-col items-center justify-center min-w-12 h-20 rounded-lg transition-all ${
                isSelected
                  ? 'bg-primary-yellow-100 text-black font-semibold' 
                  : 'bg-primary-blue-200 text-gray-300 hover:bg-[#323946]' 
              }`}
            >
              <span className="text-lg font-bold">{item.date}</span>
              <span className="text-xs">{item.day}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}