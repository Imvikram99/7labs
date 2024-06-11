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
import PatientList from './PatientList';

const LinkItems = [
    { name: 'Patient List', icon: FiHome, component: <PatientList /> },
    { name: 'Reports Entry', icon: FiTrendingUp, component: <PatientList />},
    { name: 'Verify Reports', icon: FiCompass, component: <PatientList /> },
    { name: 'Financial Analysis', icon: FiStar, component: <PatientList /> },
    { name: 'Test List', icon: FiSettings, component: <PatientList /> },
    { name: 'Organisation List', icon: FiSettings, component: <PatientList /> },
    { name: 'Employees', icon: FiSettings, component: <PatientList /> },
    { name: 'Center', icon: FiSettings, component: <PatientList /> },
    { name: 'Lab Profile', icon: FiSettings, component: <PatientListLink /> },
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

