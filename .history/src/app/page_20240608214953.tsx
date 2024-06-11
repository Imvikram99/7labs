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
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Flex,
  useMediaQuery,
} from '@chakra-ui/react';
import RegisterCustomer from './components/RegisterCustomer';
import NewBill from './components/NewBill';
import SidebarWithHeader from './components/SidebarWithHeader';

export default function Home() {
  const { isOpen: isRegisterCustomerOpen, onOpen: onRegisterCustomerOpen, onClose: onRegisterCustomerClose } = useDisclosure();
  const { isOpen: isNewBillOpen, onOpen: onNewBillOpen, onClose: onNewBillClose } = useDisclosure();
  const [isLargerThanMd] = useMediaQuery('(min-width: 768px)');

  return (
    <SidebarWithHeader onRegisterCustomerOpen={onRegisterCustomerOpen} onNewBillOpen={onNewBillOpen}>
      <Flex minH="100vh" bg="green.500" p={8} ml={isLargerThanMd ? 60 : 0}>
        {isRegisterCustomerOpen && (
          <Modal isOpen={isRegisterCustomerOpen} onClose={onRegisterCustomerClose} size="xl" isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Register New Customer</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <RegisterCustomer />
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
        {isNewBillOpen && (
          <Modal isOpen={isNewBillOpen} onClose={onNewBillClose} size="xl" isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create New Bill</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <NewBill />
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
        {!isRegisterCustomerOpen && !isNewBillOpen && (
          <Heading as="h1" size="xl" mb={4}>
            Welcome to the Invoice Generator
          </Heading>
        )}
      </Flex>
    </SidebarWithHeader>
  );
}
