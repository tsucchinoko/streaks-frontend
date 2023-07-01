'use client';
import { Container, Loader, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import React, { useState } from 'react';

import { Task } from '../types';

import { TaskList } from './TaskList';

const TaskContainer = ({ tasks }: { tasks: Task[] }) => {
  const [isLoading, setIsLoading] = useState(false);

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
        {isLoading ? (
          <Loader variant="bars" color="orange" />
        ) : (
          <TaskList tasks={tasks} setIsLoading={setIsLoading} />
        )}
      </Container>
    </MantineProvider>
  );
};

export { TaskContainer };
