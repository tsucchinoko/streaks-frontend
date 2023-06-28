import { useState } from 'react';
import { TaskResponse } from '../types';

export const useTasks = () => {
  // 取得してきたタスク
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  console.log('task in hooks', tasks);

  return {
    tasks,
    setTasks
  };
};
