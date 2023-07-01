import { Grid, Col, ActionIcon, Text, Box } from '@mantine/core';
import React, { ChangeEvent, useMemo, useState } from 'react';

import { MotionBox } from '../../components/motions';
import { addTask, deleteTask, updateTask, completeTask } from '../api';
import { maxTasks } from '../service/constants';
import { isRegistered } from '../service/isRegistered';
import { AddTask, EditTask, Task, UpdateTask } from '../types';

import { TaskCard } from './TaskCard';

import { PlusIcon } from '@/components/icons';
import {
  showErrorNotifications,
  showSuccessNotifications
} from '@/utils/notifications';

const TaskList = ({ tasks }: { tasks: Task[] }) => {
  const [taskLists, setTasks] = useState<UpdateTask[] | AddTask[]>(tasks);
  const originalTasks = useMemo(() => tasks, [tasks]);

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
        showSuccessNotifications(
          'タスクを更新しました',
          `タスク名: ${task.title}`
        );
        return;
      }
      // 未登録の場合は新規登録
      await addTask(task);
      showSuccessNotifications(
        'タスクを追加しました',
        `タスク名: ${task.title}`
      );
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
        showSuccessNotifications(
          'タスクを削除しました',
          `タスク名: ${task.title}`
        );
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
            <MotionBox>
              <ActionIcon
                variant="filled"
                color="orange"
                size={80}
                radius={100}
                onClick={handleOnClickAdd}
              >
                <PlusIcon size={30} />
              </ActionIcon>
            </MotionBox>
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
