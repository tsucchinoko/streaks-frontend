import React, { ChangeEvent, useMemo, useState } from 'react';
import { Task } from '../types';
import {
  ActionIcon,
  Box,
  Center,
  Col,
  Flex,
  Text,
  TextInput
} from '@mantine/core';
import { DeleteIcon, EditIcon, TaskIcon, CheckIcon, CancelIcon } from '@/icons';

type Props = {
  task: Task;
  targetIndex: number;
  handleOnClickUpdate: (targetIndex: number, title: string) => void;
  handleOnClickDelete: (targetIndex: number) => void;
};

const TaskCard = ({
  task,
  targetIndex,
  handleOnClickUpdate,
  handleOnClickDelete
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const originalTitle = useMemo(() => task.title, [task.title]);

  const handleOnClickEdit = () => {
    setIsEditing(true);
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setTitle(newValue);
  };

  const handleOnClickCheck = () => {
    handleOnClickUpdate(targetIndex, title);
    setIsEditing(false);
  };

  const handleOnClickCancel = () => {
    setTitle(originalTitle);
    setIsEditing(false);
  };

  return (
    <Col span={4}>
      <Box
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
          textAlign: 'center',
          padding: theme.spacing.xl,
          borderRadius: theme.radius.md,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          alignItems: 'center'
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
        {isEditing ? (
          <>
            <TextInput
              placeholder={task.title}
              size="md"
              mt={8}
              value={title}
              onChange={handleOnChange}
            />
            <Flex justify="center" align="center" mt={8} gap={8}>
              <ActionIcon ml={4} variant="light" onClick={handleOnClickCancel}>
                <CancelIcon size={20} />
              </ActionIcon>
              <ActionIcon
                ml={4}
                variant="light"
                color="green"
                onClick={handleOnClickCheck}
              >
                <CheckIcon size={20} />
              </ActionIcon>
            </Flex>
          </>
        ) : (
          <>
            <Text fw={700} size="xl" mt={8}>
              {task.title}
            </Text>
            <Flex justify="center" align="center" mt={8} gap={8}>
              <ActionIcon
                ml={4}
                variant="light"
                color="red"
                onClick={() => handleOnClickDelete(targetIndex)}
              >
                <DeleteIcon size={20} />
              </ActionIcon>
              <ActionIcon ml={4} variant="light" onClick={handleOnClickEdit}>
                <EditIcon size={20} />
              </ActionIcon>
            </Flex>
          </>
        )}
      </Box>
    </Col>
  );
};

export { TaskCard };
