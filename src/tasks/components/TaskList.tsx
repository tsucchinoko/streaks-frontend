import { PlusIcon } from '@/icons';
import {
  Grid,
  Col,
  Button,
  ActionIcon,
  Center,
  Text,
  Box
} from '@mantine/core';
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Task, TaskResponse } from '../types';
import { maxTasks } from '../service/constants';
import { TaskCard } from './TaskCard';
import { useTasks } from '../hooks/use-task';
import { addTask } from '../api';
import {
  showErrorNotifications,
  showSuccessNotifications
} from '@/utils/notifications';
import { useRouter } from 'next/navigation';

const TaskList = ({ tasks }: { tasks: TaskResponse[] }) => {
  const [taskLists, setTasks] = useState<TaskResponse[]>(tasks);
  const [isEditing, setIsEditing] = useState(false);
  const originalTasks = useMemo(() => tasks, []);

  const router = useRouter();

  const handleOnClickAdd = async () => {
    try {
      await addTask('new task');
      router.push('/created');
    } catch (e) {
      showErrorNotifications('タスクの追加に失敗しました', `${e}`);
    }

    // setTasks((prev) => [
    //   ...prev,
    //   { id: '', title: 'new task', completedCount: 0 }
    // ]);
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

  const handleOnClickUpdate = (targetIndex: number) => {
    alert('未実装');
  };

  const handleOnReset = () => {
    setTasks(originalTasks);
  };

  const handleOnClickDelete = (targetIndex: number) => {
    setTasks((prev) => {
      const tasks = prev.filter((_, i) => i !== targetIndex);
      return tasks;
    });
  };

  return (
    <Grid
      style={{
        width: '100%'
      }}
    >
      {tasks.length <= maxTasks &&
        tasks.map((task, index) => (
          <TaskCard
            key={index}
            task={task}
            targetIndex={index}
            handleOnChange={handleOnChange}
            handleOnReset={handleOnReset}
            handleOnClickUpdate={handleOnClickUpdate}
            handleOnClickDelete={handleOnClickDelete}
          />
        ))}
      {tasks.length < maxTasks && (
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
