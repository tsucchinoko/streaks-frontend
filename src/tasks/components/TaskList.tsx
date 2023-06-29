import { PlusIcon } from '@/icons';
import {
  Grid,
  Col,
  Button,
  ActionIcon,
  Center,
  Text,
  Box,
  Loader
} from '@mantine/core';
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { AddTask, EditTask, Task, UpdateTask } from '../types';
import { maxTasks } from '../service/constants';
import { TaskCard } from './TaskCard';
import { useTasks } from '../hooks/use-task';
import { addTask, deleteTask, updateTask, completeTask } from '../api';
import {
  showErrorNotifications,
  showSuccessNotifications
} from '@/utils/notifications';
import { useRouter } from 'next/navigation';
import { isRegistered } from '../service/isRegistered';

const TaskList = ({ tasks }: { tasks: Task[] }) => {
  const [taskLists, setTasks] = useState<Task[] | UpdateTask[] | AddTask[]>(
    tasks
  );
  const [isLoading, setIsLoading] = useState(false);
  const originalTasks = useMemo(() => tasks, [tasks]);

  if (isLoading) return <Loader color="orange" variant="bars" />;

  const handleOnClickAdd = async () => {
    setTasks((prev) => [...prev, { title: '未登録', completedCount: 0 }]);
  };

  const handleOnChange = (
    targetIndex: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setTasks((prev) => {
      const newTitle = e.target.value;
      const tasks = prev.map((task, i) => {
        if (i === targetIndex) {
          return { ...task, title: newTitle };
        }
        return task;
      });
      return tasks;
    });
  };

  const handleOnClickUpdate = async (task: EditTask) => {
    try {
      // 登録済みの場合は更新
      if (isRegistered(task)) {
        await updateTask(task);
        return;
      }
      // 未登録の場合は新規登録
      await addTask(task);
    } catch (e) {
      showErrorNotifications('タスクの更新に失敗しました', `${e}`);
    }
  };

  const handleOnReset = (targetIndex: number) => {
    setTasks((prev) => {
      const tasks = prev.map((task, i) => {
        if (i === targetIndex) {
          return { ...originalTasks[targetIndex] };
        }
        return task;
      });
      return tasks;
    });
  };

  const handleOnClickDelete = async (task: EditTask, targetIndex: number) => {
    try {
      if (isRegistered(task)) {
        await deleteTask(task.id);
      }
      setTasks((prev) => {
        const tasks = prev.filter((_, i) => i !== targetIndex);
        return tasks;
      });
    } catch (e) {
      showErrorNotifications('タスクの削除に失敗しました', `${e}`);
    }
  };

  const handleOnComplete = async (task: EditTask, targetIndex: number) => {
    try {
      if (!isRegistered(task)) {
        showErrorNotifications('タスクを完了できません', '未登録のタスクです');
        return;
      }
      await completeTask(task.id);
      setTasks((prev) => {
        const target = prev[targetIndex] as UpdateTask;
        const tasks = prev.map((task, i) => {
          if (i === targetIndex) {
            return { ...target, completedCount: target.completedCount + 1 };
          }
          return task;
        });
        return tasks;
      });
    } catch (e) {
      showErrorNotifications('タスクの更新に失敗しました', `${e}`);
    }
  };

  return (
    <Grid
      style={{
        width: '100%'
      }}
    >
      {taskLists.length <= maxTasks &&
        taskLists.map((task, index) => (
          <TaskCard
            key={index}
            task={task}
            targetIndex={index}
            handleOnComplete={handleOnComplete}
            handleOnChange={handleOnChange}
            handleOnClickUpdate={handleOnClickUpdate}
            handleOnReset={handleOnReset}
            handleOnClickDelete={handleOnClickDelete}
          />
        ))}
      {taskLists.length < maxTasks && (
        <Col span={4}>
          <Box
            sx={(theme) => ({
              textAlign: 'center',
              padding: theme.spacing.xl,
              borderRadius: theme.radius.md,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            })}
          >
            <ActionIcon
              variant="filled"
              color="orange"
              size={80}
              radius={100}
              onClick={handleOnClickAdd}
            >
              <PlusIcon size={30} />
            </ActionIcon>
            <Text fw={700} size="xl" mt={8}>
              タスクを追加
            </Text>
          </Box>
        </Col>
      )}
    </Grid>
  );
};

export { TaskList };
