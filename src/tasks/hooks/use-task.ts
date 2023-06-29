import { useState } from 'react';
import { Task } from '../types';

export const useTasks = () => {
  // 取得してきたタスク
  const [tasks, setTasks] = useState<Task[]>([]);

  return {
    tasks,
    setTasks
  };
};
