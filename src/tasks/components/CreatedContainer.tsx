'use client';
import { CheckIcon, HomeIcon } from '@/icons';
import { Button, Container, Flex, MantineProvider, Text } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import React from 'react';

const CreatedContainer = () => {
  const router = useRouter();
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
        <Flex justify="center" gap={8} align="center" direction="column">
          <div>
            <CheckIcon size={100} color="lightGreen" />
          </div>
          <Text size={'lg'} style={{ fontWeight: 'bold' }}>
            タスクの追加に成功しました！
          </Text>
          <Button
            size="lg"
            radius={10}
            color="orange"
            variant="filled"
            leftIcon={<HomeIcon />}
            onClick={() => router.replace('/')}
          >
            一覧へ戻る
          </Button>
        </Flex>
      </Container>
    </MantineProvider>
  );
};

export { CreatedContainer };
