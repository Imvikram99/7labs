'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Select,
  Flex,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

export default function RegisterCustomer() {
  const [formData, setFormData] = useState({
    patientId: '',
    designation: '',
    firstName: '',
    lastName: '',
    phone: '',
    gender: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    pincode: '',
    age: '',
    ageType: 'Years',
    sampleCollector: '',
    organisation: '',
    sampleCollectedAt: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add code to save customer data to database or state
    console.log(formData);
  };

  return (
    <main className="flex flex-col items-center justify-center w-full">
      <Box maxWidth="800px" w="full" p={4}>
        <Input placeholder="Search by Patient ID, Email, or Mobile No" mb={4} />

        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl isReadOnly>
              <FormLabel>Patient ID</FormLabel>
              <Input type="text" value={formData.patientId} />
            </FormControl>
            <FormControl>
              <FormLabel>Designation</FormLabel>
              <Input type="text" onChange={(e) => handleInputChange('designation', e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input type="text" onChange={(e) => handleInputChange('firstName', e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input type="text" onChange={(e) => handleInputChange('lastName', e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              <Input type="tel" onChange={(e) => handleInputChange('phone', e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Email ID</FormLabel>
              <Input type="email" onChange={(e) => handleInputChange('email', e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Address Line 1</FormLabel>
              <Input type="text" onChange={(e) => handleInputChange('addressLine1', e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Address Line 2</FormLabel>
              <Input type="text" onChange={(e) => handleInputChange('addressLine2', e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Address Line 3</FormLabel>
              <Input type="text" onChange={(e) => handleInputChange('addressLine3', e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Pincode</FormLabel>
              <Input type="text" onChange={(e) => handleInputChange('pincode', e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Age</FormLabel>
              <Flex>
                <Input type="number" onChange={(e) => handleInputChange('age', e.target.value)} width="70%" />
                <Select onChange={(e) => handleInputChange('ageType', e.target.value)} width="30%">
                  <option value="Years">Years</option>
                  <option value="Months">Months</option>
                </Select>
              </Flex>
            </FormControl>
            <FormControl>
              <FormLabel>Gender</FormLabel>
              <Select onChange={(e) => handleInputChange('gender', e.target.value)}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Sample Collector</FormLabel>
              <Flex>
                <Select onChange={(e) => handleInputChange('sampleCollector', e.target.value)} flex="1">
                  {/* Options should be dynamically generated from data */}
                </Select>
                <IconButton aria-label="Add new collector" icon={<AddIcon />} onClick={onOpen} ml={2} />
              </Flex>
            </FormControl>
            <FormControl>
              <FormLabel>Organisation</FormLabel>
              <Flex>
                <Select onChange={(e) => handleInputChange('organisation', e.target.value)} flex="1">
                  {/* Options should be dynamically generated from data */}
                </Select>
                <IconButton aria-label="Add new organisation" icon={<AddIcon />} onClick={onOpen} ml={2} />
              </Flex>
            </FormControl>
            <FormControl>
              <FormLabel>Sample Collected At</FormLabel>
              <Flex>
                <Select onChange={(e) => handleInputChange('sampleCollectedAt', e.target.value)} flex="1">
                  {/* Options should be dynamically generated from data */}
                </Select>
                <IconButton aria-label="Add new sample location" icon={<AddIcon />} onClick={onOpen} ml={2} />
              </Flex>
            </FormControl>
            <Button colorScheme="blue" type="submit">Go to Billing</Button>
          </Stack>
        </form>
      </Box>
    </main>
  );
}
