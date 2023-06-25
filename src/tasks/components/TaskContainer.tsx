'use client';
import { Container, MantineProvider } from '@mantine/core';
import React from 'react';
import { TaskList } from './TaskList';
import { Task } from '../types';

const TaskContainer = ({ tasks }: { tasks: Task[] }) => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'dark'
      }}
    >
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
