import React from 'react';
import { Task } from '../types';
import { ActionIcon, Box, Center, Col, Flex, Text } from '@mantine/core';
import { DeleteIcon, EditIcon, TaskIcon } from '@/icons';

const TaskCard = ({ task }: { task: Task }) => {
  return (
    <Col
      span={4}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center'
      }}
    >
      <Box
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
          textAlign: 'center',
          padding: theme.spacing.xl,
          borderRadius: theme.radius.md
        })}
      >
        <ActionIcon variant="outline" color="orange" size={80} radius={100}>
          <Flex
            direction="column"
            justify="center"
            align="center"
            style={{ height: '100%' }}
          >
            <div
              style={{
                flex: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'end'
              }}
            >
              <TaskIcon size={30} />
            </div>
            <div style={{ flex: 1 }}>
              <Text size="sm">1</Text>
            </div>
          </Flex>
        </ActionIcon>
        <Text fw={700} size="xl" mt={8}>
          {task.title}
        </Text>

        <Flex justify="center" align="center" mt={8} gap={8}>
          <ActionIcon ml={4} variant="transparent" color="red">
            <DeleteIcon size={20} />
          </ActionIcon>
          <ActionIcon ml={4}>
            <EditIcon size={20} />
          </ActionIcon>
        </Flex>
      </Box>
    </Col>
  );
};

export { TaskCard };
