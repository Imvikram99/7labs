'use client';

import React, { useState } from 'react';
import { Box, Button, Heading, Flex, useMediaQuery } from '@chakra-ui/react';
import RegisterCustomer from './components/RegisterCustomer';
import NewBill from './components/NewBill';
import SidebarWithHeader from './components/SidebarWithHeader';

export default function Home() {
  const [showRegisterCustomer, setShowRegisterCustomer] = useState(false);
  const [showNewBill, setShowNewBill] = useState(false);
  const [isLargerThanMd] = useMediaQuery('(min-width: 768px)');

  const handleRegisterCustomerOpen = () => {
    setShowRegisterCustomer(true);
    setShowNewBill(false);
  };

  const handleNewBillOpen = () => {
    setShowNewBill(true);
    setShowRegisterCustomer(false);
  };

  return (
    <SidebarWithHeader >
      <Flex minH="100vh" bg="green.500" p={1} ml={isLargerThanMd ? 60 : 0} flex={1}>
        {showRegisterCustomer && (
          <Flex flex={1} justifyContent="center" alignItems="center">
            <RegisterCustomer />
          </Flex>
        )}
        {showNewBill && (
          <Flex flex={1} justifyContent="center" alignItems="center">
            <NewBill />
          </Flex>
        )}
        {!showRegisterCustomer && !showNewBill && (
          <Heading as="h1" size="xl" mb={4}>
            Welcome to the Invoice Generator
          </Heading>
        )}
      </Flex>
    </SidebarWithHeader>
  );
}
