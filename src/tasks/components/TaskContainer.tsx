'use client';
import { Container, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import React, { useEffect } from 'react';
import { TaskList } from './TaskList';
import { Task, TaskResponse } from '../types';
import { useTasks } from '../hooks/use-task';

const TaskContainer = ({ tasks }: { tasks: TaskResponse[] }) => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'dark'
      }}
    >
      <Notifications position="top-right" />
      <Container
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh'
        }}
      >
        <TaskList tasks={tasks} />
      </Container>
    </MantineProvider>
  );
};

export { TaskContainer };
