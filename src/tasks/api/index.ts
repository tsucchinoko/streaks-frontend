import { API_URL } from '@/service/constants';
import { Task, TaskResponse } from '../types';

// タスクの取得
export const fetchTasks = async (): Promise<TaskResponse[]> => {
  const res = await fetch(`${API_URL}/tasks`);
  if (!res.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return res.json() as Promise<TaskResponse[]>;
};

// タスクの登録
export const addTask = async (title: string): Promise<void> => {
  console.log('title', title);
  const hoge = JSON.stringify({ title });
  console.log('hoge', hoge);

  const res = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title })
  });
  if (!res.ok) {
    throw new Error('Failed to add task');
  }
  return;
};
