import { UpdateTask, Task, AddTask } from '../types';

import { API_URL } from '@/service/constants';

// タスクの取得
export const fetchTasks = async (): Promise<Task[]> => {
  const res = await fetch(`${API_URL}/tasks`);
  if (!res.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return res.json() as Promise<Task[]>;
};

// タスクの登録
export const addTask = async (task: AddTask): Promise<void> => {
  const res = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title: task.title })
  });
  if (!res.ok) {
    throw new Error('Failed to add task');
  }
  return;
};

// タスクの更新
export const updateTask = async (task: UpdateTask): Promise<void> => {
  const res = await fetch(`${API_URL}/tasks/${task.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title: task.title })
  });
  if (!res.ok) {
    throw new Error('Failed to update task');
  }
  return;
};

export const completeTask = async (id: string): Promise<void> => {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!res.ok) {
    throw new Error('Failed to complete task');
  }
  return;
};

// タスクの削除
export const deleteTask = async (id: string): Promise<void> => {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!res.ok) {
    throw new Error('Failed to delete task');
  }
  return;
};
