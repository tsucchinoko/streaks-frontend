import React, { ChangeEvent, useMemo, useState } from 'react';
import { AddTask, EditTask, Task, UpdateTask } from '../types';
import {
  ActionIcon,
  Box,
  Center,
  Col,
  Flex,
  Text,
  TextInput
} from '@mantine/core';
import {
  DeleteIcon,
  EditIcon,
  TaskIcon,
  CheckIcon,
  CancelIcon
} from '@/components/icons';
import { isRegistered } from '../service/isRegistered';
import { MotionBox } from '../../components/motions';

type Props = {
  task: Task | AddTask;
  targetIndex: number;
  handleOnChange: (
    targetIndex: number,
    e: ChangeEvent<HTMLInputElement>
  ) => void;
  handleOnComplete: (task: EditTask, targetIndex: number) => void;
  handleOnClickUpdate: (task: EditTask) => void;
  handleOnReset: (targetIndex: number) => void;
  handleOnClickDelete: (task: EditTask, targetIndex: number) => void;
};

const TaskCard = ({
  task,
  targetIndex,
  handleOnComplete,
  handleOnChange,
  handleOnClickUpdate,
  handleOnReset,
  handleOnClickDelete
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleOnClickEdit = () => {
    setIsEditing(true);
  };

  const handleOnClickCheck = () => {
    handleOnClickUpdate(task);
    setIsEditing(false);
  };

  const handleOnClickCancel = (targetIndex: number) => {
    handleOnReset(targetIndex);
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
        <MotionBox>
          <ActionIcon
            variant="outline"
            color="orange"
            size={80}
            radius={100}
            onClick={() => handleOnComplete(task, targetIndex)}
          >
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
                <Text size="sm">
                  {isRegistered(task) ? task.completedCount : 0}
                </Text>
              </div>
            </Flex>
          </ActionIcon>
        </MotionBox>
        {isEditing ? (
          <>
            <TextInput
              placeholder={'タスク名を入力してください'}
              size="md"
              mt={8}
              value={task.title}
              onChange={(e) => handleOnChange(targetIndex, e)}
            />
            <Flex justify="center" align="center" mt={8} gap={8}>
              <MotionBox>
                <ActionIcon
                  ml={4}
                  variant="light"
                  onClick={() => handleOnClickCancel(targetIndex)}
                >
                  <CancelIcon size={20} />
                </ActionIcon>
              </MotionBox>
              <MotionBox>
                <ActionIcon
                  ml={4}
                  variant="light"
                  color="green"
                  onClick={handleOnClickCheck}
                >
                  <CheckIcon size={20} />
                </ActionIcon>
              </MotionBox>
            </Flex>
          </>
        ) : (
          <>
            <Text fw={700} size="xl" mt={8}>
              {task.title}
            </Text>
            <Flex justify="center" align="center" mt={8} gap={8}>
              <MotionBox>
                <ActionIcon
                  ml={4}
                  variant="light"
                  color="red"
                  onClick={() => handleOnClickDelete(task, targetIndex)}
                >
                  <DeleteIcon size={20} />
                </ActionIcon>
              </MotionBox>
              <MotionBox>
                <ActionIcon ml={4} variant="light" onClick={handleOnClickEdit}>
                  <EditIcon size={20} />
                </ActionIcon>
              </MotionBox>
            </Flex>
          </>
        )}
      </Box>
    </Col>
  );
};

export { TaskCard };
