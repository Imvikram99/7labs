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
    <Flex minH="100vh" bg="gray.100">
      <Box bg="green" shadow="md" w="200px" p={4}>
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
        <Heading as="h1" size="xl" mb={4}>
          Welcome to the Invoice Generator
        </Heading>
      </Box>
      <Modal isOpen={isRegisterCustomerOpen} onClose={onRegisterCustomerClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Register New Customer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RegisterCustomer />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onRegisterCustomerClose}>
              Back
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isNewBillOpen} onClose={onNewBillClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Bill</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <NewBill />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onNewBillClose}>
              Back
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
