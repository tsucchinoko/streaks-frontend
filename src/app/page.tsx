import { API_URL } from '@/service/constants';
import { fetcher } from '@/service/fetcher';
import { TaskContainer } from '@/tasks/components/TaskContainer';
import { TaskResponse } from '@/tasks/types';

export default async function Page() {
  const res = await fetcher<TaskResponse[]>(`${API_URL}/tasks`);

  if (!res) {
    return <div>Failed to fetch data</div>;
  }

  return <TaskContainer tasks={res} />;
}
