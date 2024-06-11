import React, { ReactNode } from 'react';
import {
  IconButton,
  Box,
  Flex,
  HStack,
  Icon,
  useColorModeValue,
  Link,
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
import { specificApis } from '../data/SpecificApis';

const LinkItems = [
    { name: 'Patient List', icon: FiHome, onClick: fetchPatientList },
    { name: 'Reports Entry', icon: FiTrendingUp, onClick: enterReports },
    { name: 'Verify Reports', icon: FiCompass, onClick: verifyReports },
    { name: 'Financial Analysis', icon: FiStar, onClick: analyzeFinances },
    { name: 'Test List', icon: FiSettings, onClick: fetchTestList },
    { name: 'Organisation List', icon: FiSettings, onClick: fetchOrganisationList },
    { name: 'Employees', icon: FiSettings, onClick: fetchEmployeeList },
    { name: 'Center', icon: FiSettings, onClick: fetchCenterInfo },
    { name: 'Lab Profile', icon: FiSettings, onClick: fetchLabProfile },
  ];

export default function SidebarWithHeader({ children, onRegisterCustomerOpen, onNewBillOpen }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
        w={{ base: 'full', md: 60 }}
        onRegisterCustomerOpen={onRegisterCustomerOpen}
        onNewBillOpen={onNewBillOpen}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Flex flex="1" flexDirection="column">
        <MobileNav onOpen={onOpen} />
        <Box flex="1" p="4">
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}

function SidebarContent({ onClose, onRegisterCustomerOpen, onNewBillOpen, ...rest }) {
  const customLinkItems = [
    ...LinkItems,
    { name: 'Register New Customer', icon: FiUserPlus, onClick: onRegisterCustomerOpen },
    { name: 'Create New Bill', icon: FiFilePlus, onClick: onNewBillOpen },
  ];

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('red', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
      </Flex>
      {customLinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} onClick={link.onClick}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
}

function NavItem({ icon, children, onClick, ...rest }) {
  return (
    <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }} onClick={onClick}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
}

function MobileNav({ onOpen, ...rest }) {
  return (
    <Flex
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('green', 'gray.900')}
      justifyContent="space-between"
      {...rest}>
      <Text
        ml={4}
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        Logo
      </Text>
      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={'center'}></Flex>
      </HStack>
    </Flex>
  );
}


// Function to load patient list
async function loadPatientList() {
  try {
    const patients = await specificApis.fetchPatientList();
    console.log(patients); // Use the fetched data in your component
  } catch (error) {
    console.error('Failed to load patients:', error);
  }
}

// Function to enter reports
async function enterReports(reportData) {
  try {
    const report = await specificApis.enterReports(reportData);
    console.log(report); // Use the returned report data in your component
  } catch (error) {
    console.error('Failed to enter reports:', error);
  }
}

// Function to verify reports
async function verifyReports() {
  try {
    const verificationResults = await specificApis.verifyReports();
    console.log(verificationResults); // Use the verification results in your component
  } catch (error) {
    console.error('Failed to verify reports:', error);
  }
}

// Function to analyze finances
async function analyzeFinances() {
  try {
    const financialAnalysis = await specificApis.analyzeFinances();
    console.log(financialAnalysis); // Display or process financial data
  } catch (error) {
    console.error('Failed to analyze finances:', error);
  }
}

// Function to fetch test list
async function fetchTestList() {
  try {
    const tests = await specificApis.fetchTestList();
    console.log(tests); // Use the fetched test list in your component
  } catch (error) {
    console.error('Failed to fetch test list:', error);
  }
}

// Function to fetch organisation list
async function fetchOrganisationList() {
  try {
    const organisations = await specificApis.fetchOrganisationList();
    console.log(organisations); // Use the fetched organisation list in your component
  } catch (error) {
    console.error('Failed to fetch organisation list:', error);
  }
}

// Function to fetch employee list
async function fetchEmployeeList() {
  try {
    const employees = await specificApis.fetchEmployeeList();
    console.log(employees); // Use the fetched employee list in your component
  } catch (error) {
    console.error('Failed to fetch employees:', error);
  }
}

// Function to fetch center information
async function fetchCenterInfo() {
  try {
    const centerInfo = await specificApis.fetchCenterInfo();
    console.log(centerInfo); // Use the fetched center information in your component
  } catch (error) {
    console.error('Failed to fetch center information:', error);
  }
}

// Function to fetch lab profile details
async function fetchLabProfile() {
  try {
    const labProfile = await specificApis.fetchLabProfile();
    console.log(labProfile); // Use the fetched lab profile in your component
  } catch (error) {
    console.error('Failed to fetch lab profile:', error);
  }
}

// These functions can now be imported and used in any component that requires them.

