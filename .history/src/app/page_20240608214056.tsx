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
} from '@chakra-ui/react';
import { useInset } from '@chakra-ui/layout';
import RegisterCustomer from './components/RegisterCustomer';
import NewBill from './components/NewBill';
import SidebarWithHeader from './components/SidebarWithHeader';

export default function Home() {
  const { isOpen: isRegisterCustomerOpen, onOpen: onRegisterCustomerOpen, onClose: onRegisterCustomerClose } = useDisclosure();
  const { isOpen: isNewBillOpen, onOpen: onNewBillOpen, onClose: onNewBillClose } = useDisclosure();
  const [inset] = useInset();

  return (
    <SidebarWithHeader onRegisterCustomerOpen={onRegisterCustomerOpen} onNewBillOpen={onNewBillOpen}>
      <Flex minH="100vh" bg="green.500" p={8}>
        {isRegisterCustomerOpen && (
          <Modal isOpen={isRegisterCustomerOpen} onClose={onRegisterCustomerClose} size="xl" isCentered>
            <ModalOverlay />
            <ModalContent position="absolute" top={inset.top} left={inset.left} right={inset.right} bottom={inset.bottom}>
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
            <ModalContent position="absolute" top={inset.top} left={inset.left} right={inset.right} bottom={inset.bottom}>
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
