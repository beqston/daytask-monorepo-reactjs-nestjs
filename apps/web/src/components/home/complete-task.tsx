import { useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import api from '../../api/api';
import TaskMembers from './task-members';
import ErrorMessage from '../error/error';
import { Loading } from '../ui/loading';
import type { Task } from '../../types/task';

export default function CompleteTask() {
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');

  async function getCompletedTasks() {
    try {
      setLoading(true);
      setError(false);
      const { data } = await api.get('/tasks/completed/from-start');
      setCompletedTasks(data);
    } catch (err) {
      setError(true);
      setErrorText(
        isAxiosError(err)
          ? err.response?.data?.message ?? 'Something went wrong!'
          : 'Something went wrong!'
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCompletedTasks();
  }, []);

  if (loading) {
    return (
      <div className="translate-y-4">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage text={errorText} />;
  }

  if (completedTasks.length === 0) {
    return (
      <p className="text-2xl font-medium text-primary-grey-100 mt-2">
        Completed tasks list is empty
      </p>
    );
  }

  return (
    <div
      className="flex gap-2 mt-4 overflow-x-auto
                 [&::-webkit-scrollbar]:hidden
                 [-ms-overflow-style:none]
                 [scrollbar-width:none]"
    >
      {completedTasks.map((item, index) => {
        const isHighlighted = index === 0;

        return (
          <div
            key={item.id}
            className={`
              shrink-0
              w-[85%] sm:w-[70%] md:w-[55%] lg:w-[45%] xl:w-[40%]
              overflow-hidden border-2 border-white p-2
              ${isHighlighted ? 'bg-[#FED36A] text-black' : 'bg-[#455A64] text-white'}
            `}
          >
            <div className="grid grid-rows-2">
              {/* Task title */}
              <h3 className="text-3xl font-bold break-words">{item.title}</h3>

              {/* Task details */}
              <div className="mt-4">
                {/* Team members */}
                <div className="flex gap-4 flex-wrap items-center">
                  <p
                    className={
                      isHighlighted
                        ? 'text-primary-black-200'
                        : 'text-primary-white-400'
                    }
                  >
                    Team members
                  </p>
                  <TaskMembers members={item.members} />
                </div>

                {/* Progress bar (cross-browser, div-based) */}
                <div className="w-full">
                  <div
                    className={`
                      flex justify-between mb-1 text-sm font-medium mt-4
                      ${isHighlighted ? 'text-primary-black-200' : 'text-primary-white-400'}
                    `}
                  >
                    <span>Completed</span>
                    <span>100%</span>
                  </div>

                  {/* Track */}
                  <div
                    className={`
                      w-full h-2.5 rounded-full overflow-hidden
                      ${isHighlighted ? 'bg-primary-black-200' : 'bg-primary-pure-white'}
                    `}
                  >
                    {/* Fill */}
                    <div
                      className={`
                        h-full rounded-full transition-all duration-500
                        ${isHighlighted ? 'bg-white' : 'bg-[#212832]'}
                      `}
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}