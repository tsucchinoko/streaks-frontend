'use client';
import { Container, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import React from 'react';

import { Task } from '../types';

import { TaskList } from './TaskList';

const TaskContainer = ({ tasks }: { tasks: Task[] }) => {
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
