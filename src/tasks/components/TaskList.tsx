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
import React, { useState } from 'react';
import { Task } from '../types';
import { maxTasks } from '../service/constants';
import { TaskCard } from './TaskCard';

const TaskList = ({ tasks }: { tasks: Task[] }) => {
  const [taskList, setTaskList] = useState<Task[]>(tasks);

  const handleOnClickAdd = () => {
    console.log('handleOnClickAdd is called');
    setTaskList((prev) => [
      ...prev,
      { id: '', title: 'new task', createdAt: '', isDeleted: false }
    ]);
  };
  return (
    <Grid
      style={{
        width: '100%'
      }}
    >
      {taskList.length <= maxTasks &&
        taskList.map((task, index) => <TaskCard task={task} key={task.id} />)}
      {taskList.length < maxTasks && (
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
