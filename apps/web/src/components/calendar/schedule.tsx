import { useEffect, useState } from 'react';
import api from '../../api/api';

const days = [
  { id: 1, date: 1, day: 'Mon' },
  { id: 2, date: 2, day: 'Tue' },
  { id: 3, date: 3, day: 'Wed' },
  { id: 4, date: 4, day: 'Thu' },
  { id: 5, date: 5, day: 'Fri' },
  { id: 6, date: 6, day: 'Sat' },
  { id: 7, date: 7, day: 'Sun' },
];

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState(4); 

  async function getMyTasks(){
    try {
      const res = await api.get('/tasks/my-tasks');
console.log(res.data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getMyTasks()
  }, [])

  return (
    <div className="py-4 text-white  rounded-xl">
      <h2 className="text-xl font-bold mb-4">November</h2>
      
      {/* Horizontal Scroll / Grid Bar */}
      <div className="grid grid-cols-[repeat(7,1fr)] gap-2 md:gap-4 overflow-x-auto pb-2">
        {days.map((item) => {
          const isSelected = selectedDate === item.date;
          
          return (
            <button
              key={item.id}
              onClick={() => setSelectedDate(item.date)}
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