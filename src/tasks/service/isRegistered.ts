import { AddTask, EditTask, UpdateTask } from '../types';

export const isRegistered = (task: EditTask): task is UpdateTask => {
  return 'id' in task;
};
