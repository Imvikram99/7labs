import React, {useState, useEffect, createContext} from "react";
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
import {RxHamburgerMenu} from "react-icons/rx";
import {useFormData} from "./context";

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
import Booking from "./Booking";
import AllBooking from "./AllBooking";
import RegisterCustomer from "./RegisterCustomer";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faArrowLeft,
    faHome,
    faCircle,
    faList,
    faRestroom,
    faMoneyCheckDollar,
    faUserTie,
    faClipboardList, faBars
} from '@fortawesome/free-solid-svg-icons';

export const ActiveComponent = createContext(null);

export default function SidebarWithHeader({children}) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [activeComponent, setActiveComponent] = useState(null);
    const {formData, updateFormData} = useFormData();

    useEffect(() => {
        setActiveComponent(components["Create New Bill"]);
    }, []);

    const components = {
        "Patient List": <PatientList/>,
        "Verify Reports": <VerifyReports/>,
        "Financial Analysis": <FinancialAnalysis/>,
        "Test List": <TestList/>,
        "Test Panel": <OrganisationList/>,
        Employees: <EmployeeList/>,
        Center: <LabCenter/>,
        "Lab Profile": <LabProfile/>,
        "Register New Customer": <RegisterCustomer/>,
        "Create New Bill": <NewBill/>,
        "Create Report": <Report/>,
        "Create Booking": <Booking/>,
        "All Booking": <AllBooking/>,
    };

    function handleComponentChange(componentName) {
        setActiveComponent(components[componentName]);
    }

    const openSidebar = () => {
        document.getElementById("right-sidebar-container").style.marginLeft = "250px";
        document.getElementById("left-sidebar-container").style.display = "block";
        document.getElementById("topbar").style.left = "250px";
        document.getElementById("mobile-toggle-menu").style.display = "none";
    }

    return (
        <Flex className="main-container" minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
            <SidebarContent
                onClose={() => onClose()}
                display={{base: "none", md: "block"}}
                w={{base: "full", md: 60}}
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


            <header>
                <div id="topbar" className="topbar d-flex align-items-center">
                    <nav className="navbar navbar-expand gap-3">
                        <div style={{display: 'none'}} id="mobile-toggle-menu" className="mobile-toggle-menu" onClick={openSidebar}>
                            <FontAwesomeIcon icon={faBars}/>
                        </div>
                        <div className="user-box dropdown px-3">
                            <a className="d-flex align-items-center nav-link dropdown-toggle gap-3 dropdown-toggle-nocaret"
                               href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {/*<img src="assets/images/avatars/avatar-2.png" className="user-img" alt="user avatar">*/}
                                <div className="user-info">
                                    <p className="user-name mb-0">Vikram Panwar</p>
                                    <p className="designattion mb-0">Web Designer</p>
                                </div>
                            </a>
                        </div>
                    </nav>
                </div>
            </header>


            <Flex className="right-sidebar-container" id="right-sidebar-container">
                {/*<MobileNav onOpen={onOpen} className="hello"/>*/}
                {/*<hr/>*/}
                <ActiveComponent.Provider value={{handleComponentChange}}>
                <Box flex="1" p="4" className="body-content-main">
                    {activeComponent}
                </Box>
                </ActiveComponent.Provider>
            </Flex>
        </Flex>
    );
}

function SidebarContent({handleComponentChange}) {
    const [expandedIndex, setExpandedIndex] = useState(null);

    useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 600px)');
    const handleWindowResize = () => {
        if (mediaQuery.matches) {
            closeSidebar();
        }
    }

    // Call the function initially
    handleWindowResize();

    // Add the listener
    mediaQuery.addListener(handleWindowResize);

    // Cleanup function
    return () => {
        mediaQuery.removeListener(handleWindowResize);
    }
}, []);

    const toggleThisMenu = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const closeSidebar = () => {
        document.getElementById("right-sidebar-container").style.marginLeft = "0%";
        document.getElementById("left-sidebar-container").style.display = "none";
        document.getElementById("topbar").style.left = "0";
        document.getElementById("mobile-toggle-menu").style.display = "inline-block";
    }

    const navItems = [
        {
            label: "Patient List",
            icon: faList,
            subItems: null
        },
        {
            label: "Booking",
            icon: faRestroom,
            subItems: [
                {
                    label: "Register New Customer",
                    icon: faUserTie,
                    subItems: null
                },
                {
                    label: "Create Booking",
                    icon: faHome,
                    subItems: null
                },
                {
                    label: "All Booking",
                    icon: faHome,
                    subItems: null
                }
            ]
        },
        {
            label: "Financial Analysis",
            icon: faMoneyCheckDollar,
            subItems: null
        },
        {
            label: "Test",
            icon: faList,
            subItems: [
                {
                    label: "Test List",
                    icon: faList,
                    subItems: null
                },
                {
                    label: "Test Panel",
                    icon: faList,
                    subItems: null
                },
            ]
        },
        {
            label: "Employees",
            icon: faUserTie,
            subItems: null
        },
        {
            label: "Center",
            icon: faHome,
            subItems: null
        },
        {
            label: "Lab Profile",
            icon: faUserTie,
            subItems: null
        },
        {
            label: "Create New Bill",
            icon: faMoneyCheckDollar,
            subItems: null
        },
        {
            label: "Report",
            icon: faClipboardList,
            subItems: [
                {
                    label: "Create Report",
                    icon: faHome,
                    subItems: null
                },
                {
                    label: "Verify Reports",
                    icon: faHome,
                    subItems: null
                },
            ]
        }
    ];

    return (
        <Box
            transition="3s ease"
            className="left-sidebar-container"
            id="left-sidebar-container"
        >
            <div className="sidebar-header">
                <div>
                    <h4 className="logo-text">7 Labs</h4>
                </div>
                <div className="toggle-icon ms-auto" onClick={closeSidebar}><FontAwesomeIcon icon={faArrowLeft}/></div>
            </div>
            <Box className="left-sidebar-menu-main">
                <ul className="metismenu mm-show" id="menu">
                    {navItems.map((item, index) => (
                        <React.Fragment key={index}>
                            <li onClick={() => item.subItems ? toggleThisMenu(index) : handleComponentChange(item.label)}
                                className={expandedIndex === index ? 'mm-active' : ''}>
                                <a href={void 0}
                                   className={`${item.subItems !== null && item.subItems.length > 0 ? 'has-arrow' : ''}`}>
                                    <div className="parent-icon"><i><FontAwesomeIcon icon={item.icon}/></i>
                                    </div>
                                    <div className="menu-title">{item.label}</div>
                                </a>
                            </li>
                            {
                                item.subItems !== null && item.subItems.length > 0 && (
                                    <ul className={expandedIndex === index ? 'mm-collapse mm-show' : 'mm-collapse'}>
                                        {item.subItems.map((subItem, subIndex) => (
                                            <li key={subIndex} onClick={() => handleComponentChange(subItem.label)}>
                                                <a href={void 0}>
                                                    <div className="parent-icon"><i><FontAwesomeIcon icon={faCircle}/></i>
                                                    </div>
                                                    <div className="menu-title">{subItem.label}</div>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                )
                            }
                        </React.Fragment>
                    ))}
                </ul>
            </Box>
        </Box>
    );
}

function MobileNav({onOpen}) {
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
                display={{base: "flex", md: "none"}}
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
                icon={<RxHamburgerMenu/>}
                onClick={onOpen}
            />
        </Flex>
    );
}
