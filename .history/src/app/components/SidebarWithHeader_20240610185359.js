import React, { useState ,useEffect} from 'react';
import {
  Box,
  Flex,
  IconButton,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiUserPlus,
  FiFilePlus,
} from 'react-icons/fi';

import PatientList from './PatientList';
import VerifyReports from './VerifyReports';
import FinancialAnalysis from './FinancialAnalysis';
import TestList from './TestList';
import OrganisationList from './OrganisationList';
import EmployeeList from './EmployeeList';
import LabCenter from './LabCenter';
import LabProfile from './LabProfile';
import NewBill from './NewBill';
import RegisterCustomer from './RegisterCustomer';

export default function SidebarWithHeader() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeComponent, setActiveComponent] = useState(null);

  useEffect(() => {
    setActiveComponent(components['Create New Bill'])
  }, []);

  const components = {
    'Patient List': <PatientList />,
    'Verify Reports': <VerifyReports />,
    'Financial Analysis': <FinancialAnalysis />,
    'Test List': <TestList />,
    'Organisation List': <OrganisationList />,
    'Employees': <EmployeeList />,
    'Center': <LabCenter />,
    'Lab Profile': <LabProfile />,
    'Register New Customer': <RegisterCustomer/> ,
    'Create New Bill': <NewBill /> ,
  };

  function handleComponentChange(componentName) {
    setActiveComponent(components[componentName]);
  }

  return (
    <Flex minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose()}
        display={{ base: 'none', md: 'block' }}
        w={{ base: 'full', md: 60 }}
        handleComponentChange={handleComponentChange}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} handleComponentChange={handleComponentChange} />
        </DrawerContent>
      </Drawer>
      <Flex flex="1" flexDirection="column">
        <MobileNav onOpen={onOpen} />
        <Box flex="1" p="4">
          {activeComponent}
        </Box>
      </Flex>
    </Flex>
  );
}

function SidebarContent({handleComponentChange }) {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('red', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      h="full"
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">Logo</Text>
      </Flex>
      <NavItem label="Patient List" onClick={() => handleComponentChange('Patient List')} />
      <NavItem label="Verify Reports" onClick={() => handleComponentChange('Verify Reports')} />
      <NavItem label="Financial Analysis" onClick={() => handleComponentChange('Financial Analysis')} />
      <NavItem label="Test List" onClick={() => handleComponentChange('Test List')} />
      <NavItem label="Organisation List" onClick={() => handleComponentChange('Organisation List')} />
      <NavItem label="Employees" onClick={() => handleComponentChange('Employees')} />
      <NavItem label="Center" onClick={() => handleComponentChange('Center')} />
      <NavItem label="Lab Profile" onClick={() => handleComponentChange('Lab Profile')} />
      <NavItem label="Register New Customer" onClick={() => handleComponentChange('Register New Customer')} />
      <NavItem label="Create New Bill" icon={FiFilePlus} onClick={() => handleComponentChange('Create New Bill')} />
    </Box>
  );
}

function NavItem({ label, onClick }) {
  return (
    <Flex
      align="center"
      p="4"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      _hover={{ bg: 'cyan.400', color: 'white' }}
      onClick={onClick}
    >
      <Text>{label}</Text>
    </Flex>
  );
}

function MobileNav({ onOpen }) {
  return (
    <Flex
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('green', 'gray.900')}
      justifyContent="space-between"
    >
      <Text ml={4} display={{ base: 'flex', md: 'none' }} fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
      <IconButton
        size="lg"
        variant="ghost"
        aria-label="open menu"
        icon={<FiBell />}
        onClick={onOpen}
      />
    </Flex>
  );
}
