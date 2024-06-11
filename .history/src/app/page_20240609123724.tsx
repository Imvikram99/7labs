'use client';

import React from 'react';
import { Flex, Heading, useMediaQuery } from '@chakra-ui/react';
import SidebarWithHeader from './components/SidebarWithHeader';

export default function Home() {
  const [isLargerThanMd] = useMediaQuery('(min-width: 768px)');

  return (
    <SidebarWithHeader>
      <Flex minH="100vh" bg="green.500" p={1} ml={isLargerThanMd ? 60 : 0} flex={1} justifyContent="center" alignItems="center">
        <Heading as="h1" size="xl" mb={4}>
          Welcome to the Dashboard
        </Heading>
      </Flex>
    </SidebarWithHeader>
  );
}
