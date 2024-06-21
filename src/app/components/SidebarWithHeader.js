import React, { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
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
} from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { useFormData } from "./context";

import PatientList from "./PatientList";
import VerifyReports from "./VerifyReports";
import FinancialAnalysis from "./FinancialAnalysis";
import TestList from "./TestList";
import OrganisationList from "./OrganisationList";
import EmployeeList from "./EmployeeList";
import LabCenter from "./LabCenter";
import LabProfile from "./LabProfile";
import NewBill from "./NewBill";
import Report from "./Report";
import RegisterCustomer from "./RegisterCustomer";

export default function SidebarWithHeader({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeComponent, setActiveComponent] = useState(null);
  const { formData, updateFormData } = useFormData();

  useEffect(() => {
    setActiveComponent(components["Create New Bill"]);
  }, []);

  const components = {
    "Patient List": <PatientList />,
    "Verify Reports": <VerifyReports />,
    "Financial Analysis": <FinancialAnalysis />,
    "Test List": <TestList />,
    "Organisation List": <OrganisationList />,
    Employees: <EmployeeList />,
    Center: <LabCenter />,
    "Lab Profile": <LabProfile />,
    "Register New Customer": <RegisterCustomer />,
    "Create New Bill": <NewBill />,
    "Create Report": <Report />,
  };

  function handleComponentChange(componentName) {
    setActiveComponent(components[componentName]);
  }

  return (
    <Flex minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose()}
        display={{ base: "none", md: "block" }}
        w={{ base: "full", md: 60 }}
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
          <SidebarContent
            onClose={onClose}
            handleComponentChange={handleComponentChange}
          />
        </DrawerContent>
      </Drawer>
      <Flex flex="1" flexDirection="column">
        <MobileNav onOpen={onOpen} className="hello" />
        <hr />
        <Box flex="1" p="4">
          {activeComponent}
        </Box>
      </Flex>
    </Flex>
  );
}

function SidebarContent({ handleComponentChange }) {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("#F7D4BC", "gray.900")}
      borderRight="1px"
      p="10px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      h="full"
    >
      <Flex h="40" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="40px" fontFamily="monospace" fontWeight="bold">
          7Labs
        </Text>
      </Flex>
      <NavItem
        label="Patient List"
        // fontSize="16px"
        pt="10px"
        fontWeight="bolder"
        onClick={() => handleComponentChange("Patient List")}
      />
      <hr />
      <NavItem
        label="Verify Reports"
        onClick={() => handleComponentChange("Verify Reports")}
      />
      <hr />

      <NavItem
        label="Financial Analysis"
        onClick={() => handleComponentChange("Financial Analysis")}
      />
      <hr />

      <NavItem
        label="Test List"
        onClick={() => handleComponentChange("Test List")}
      />
      <hr />

      <NavItem
        label="Organisation List"
        onClick={() => handleComponentChange("Organisation List")}
      />
      <hr />

      <NavItem
        label="Employees"
        onClick={() => handleComponentChange("Employees")}
      />
      <hr />

      <NavItem label="Center" onClick={() => handleComponentChange("Center")} />
      <hr />

      <NavItem
        label="Lab Profile"
        onClick={() => handleComponentChange("Lab Profile")}
      />
      <hr />

      <NavItem
        label="Register New Customer"
        onClick={() => handleComponentChange("Register New Customer")}
      />
      <hr />

      <NavItem
        label="Create New Bill"
        icon={FiFilePlus}
        onClick={() => handleComponentChange("Create New Bill")}
      />
      <hr />
      <NavItem
        label="Create Report"
        // icon={FiFilePlus}
        onClick={() => handleComponentChange("Create Report")}
      />
      <hr />
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
      _hover={{ bg: "cyan.400", color: "white" }}
      onClick={onClick}
    >
      <Text>{label}</Text>
    </Flex>
  );
}

function MobileNav({ onOpen }) {
  return (
    <Flex
      // px={{ base: 4, md: 4 }}
      height="40"
      alignItems="center"
      bg={useColorModeValue("#F7D4BC", "gray.900")}
      justifyContent="space-between"
      px="10px"
    >
      <Text
        ml={4}
        display={{ base: "flex", md: "none" }}
        fontSize="30px"
        p="10px"
        fontFamily="monospace"
        fontWeight="bold"
      >
        7Labs
      </Text>
      <IconButton
        size="lg"
        variant="ghost"
        aria-label="open menu"
        icon={<RxHamburgerMenu />}
        onClick={onOpen}
      />
    </Flex>
  );
}
