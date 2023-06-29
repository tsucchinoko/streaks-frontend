export type Task = {
  id: string;
  title: string;
  completedCount: number;
};

export type AddTask = Omit<Task, 'id' | 'completedCount'>;
export type UpdateTask = Task;
export type EditTask = AddTask | UpdateTask;
