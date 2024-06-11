'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  Flex,
} from '@chakra-ui/react';
import RegisterCustomer from './components/RegisterCustomer';
import NewBill from './components/NewBill';

export default function Home() {
  const { isOpen: isRegisterCustomerOpen, onOpen: onRegisterCustomerOpen, onClose: onRegisterCustomerClose } = useDisclosure();
  const { isOpen: isNewBillOpen, onOpen: onNewBillOpen, onClose: onNewBillClose } = useDisclosure();

  return (
    <Flex minH="100vh" bg="green.500">
      <Box bg="white" shadow="md" w="200px" p={4}>
        <VStack spacing={4} align="stretch">
          <Button colorScheme="red" onClick={onRegisterCustomerOpen}>
            Register New Customer
          </Button>
          <Button colorScheme="blue" onClick={onNewBillOpen}>
            Create New Bill
          </Button>
        </VStack>
      </Box>
      <Box flex="1" p={8}>
        {isRegisterCustomerOpen && (
          <Box bg="white" shadow="md" rounded="md" p={8} w="full" h="full">
            <ModalHeader>Register New Customer</ModalHeader>
            <ModalCloseButton onClick={onRegisterCustomerClose} />
            <ModalBody>
              <RegisterCustomer />
            </ModalBody>
          </Box>
        )}
        {isNewBillOpen && (
          <Box bg="white" shadow="md" rounded="md" p={8} w="full" h="full">
            <ModalHeader>Create New Bill</ModalHeader>
            <ModalCloseButton onClick={onNewBillClose} />
            <ModalBody>
              <NewBill />
            </ModalBody>
          </Box>
        )}
        {!isRegisterCustomerOpen && !isNewBillOpen && (
          <Heading as="h1" size="xl" mb={4}>
            Welcome to the Invoice Generator
          </Heading>
        )}
      </Box>
    </Flex>
  );
}
