import React, { useContext, useEffect, useState } from "react";
import {
  useDisclosure
} from "@chakra-ui/react";
import { specificApis } from "../data/SpecificApis";
import NewBill from "./NewBill";
import { ActiveComponent } from "./SidebarWithHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRestroom } from "@fortawesome/free-solid-svg-icons";
import { CustomModal } from "./CustomModal";
import { TestComponent } from "./AllBooking";

export default function RegisterCustomer() {
  const [formData, setFormData] = useState({
    patientId: "", // Assuming it's auto-generated and non-editable
    designation: "",
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    pinCode: "",
    ageInMonths:0,
    ageInDays:0,
    ageInYears:0,
    dob:""
  });

  const [patientList, setPatientList] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeModal, setActiveModal] = useState(null);
  const [activeScreen, setactiveScreen] = useState(1);
  const context = useContext(ActiveComponent);  

  const openModal = (modalType) => {
    setActiveModal(modalType);
    onOpen();
  };

  const closeModal = () => {
    setActiveModal(null);
    onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if(name == 'dob'){
    const age =  calculateAge(value)
    setFormData((prev) => ({ ...prev, [name]: value,ageInMonths:age.months,
      ageInDays:age.days,
      ageInYears:age.years }));
    return
    }

    if(name == 'designation'){
      setFormData((prev) => ({ ...prev, [name]: value,gender: value == 'Mr' ? 'MALE' : 'FEMALE' }));
      return
      }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSearch = (event) => {
    event.preventDefault(); // Prevent the form from causing a page reload
    console.log("Searching for:", formData.searchQuery);
    setFormData({
      patientId: "",
      designation: "",
      firstName: "",
      lastName: "",
      phone: "",
      gender: "",
      email: "",
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      pinCode: "",
      age: "",
      ageType: "Years", // Default to 'Years'
      sampleCollector: "",
      organisation: "",
      sampleCollectedAt: "",
      referralType: "",
      doctorHospitalName: "",
      degree: "",
      complements: "",
      ageInMonths:0,
      ageInDays:0,
      ageInYears:0,
      dob:"",
      searchQuery: formData.searchQuery, // Keep the search query for re-display or further use
    });
    specificApis
      .fetchPatientList(
        formData.searchQuery,
        determineSearchType(formData.searchQuery)
      )
      .then((response) => {
        console.log("search patient API response:", response);
        if (response.length > 0) {
          setPatientList(response); // Assuming response is the array of patients
          openModal("searchResults");
        } else {
          // Handle no results found
          handleNoResults();
        }
        console.log("Patient List:", response);
      })
      .catch((error) => {
        console.error("Error fetching patient list:", error);
      });
  };

  const determineSearchType = (query) => {
    if (query.includes("@")) {
      return "email";
    } else {
      return "phone";
    }
  };

  const handleNoResults = () => {
    // You can customize what to do here based on the search type
    let fallbackData = {};
    switch (determineSearchType(formData.searchQuery)) {
      case "email":
        fallbackData = { email: formData.searchQuery };
        break;
      case "phone":
        fallbackData = { phone: formData.searchQuery };
        break;
      default:
        fallbackData = {};
    }
    setFormData((prev) => ({ ...prev, ...fallbackData }));
    setPatientList([]);
  };
  const handlePatientSelect = (patient) => {
    setFormData({
      ...formData,
      patientId: patient.patientId, // Assuming patientId is also to be populated
      firstName: patient.firstName,
      lastName: patient.lastName,
      phone: patient.phone,
      gender: patient.gender,
      email: patient.email,
      addressLine1: patient.addressLine1,
      addressLine2: patient.addressLine2,
      addressLine3: patient.addressLine3,
      pinCode: patient.pinCode,
    });
    closeModal();
  };

  function calculateAge(birthdate) {
    const today = new Date();
    const birthDate = new Date(birthdate);

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += prevMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    return {
        years: years,
        months: months,
        days: days
    };
}

  const handleSubmit = (event) => {
    event.preventDefault();
    const {
      patientId,
      sampleCollector,
      organisation,
      sampleCollectedAt,
      referralType,
      doctorHospitalName,
      degree,
      complements,
      searchQuery,
      ...fieldsToSend
    } = formData;

    // Check if a patientId already exists
    if (patientId) {
      console.log("Patient is already registered.");
      setFormData((prev) => ({ ...prev,patientId }))
      setactiveScreen(2)
      openNewBill(patientId, formData);
    } else {
      console.log(fieldsToSend); // Show fields sent for registration in console
      specificApis
        .registerPatient(fieldsToSend)
        .then((response) => {
          console.log("Patient registered, ID:", response.patientId);
          setFormData((prev) => ({ ...prev,patientId:response.patientId }))
          setactiveScreen(2)
          openNewBill(response.patientId, {
            ...formData,
            patientId: response.patientId,
          });
        })
        .catch((error) => {
          console.error("Error registering patient:", error);
        });
    }
  };
  const openNewBill = (patientId, fullFormData) => {
    console.log("Opening New Bill with data:", fullFormData);
    // Set activeComponent to NewBill and pass the patientId and fullFormData as props
    // handleComponentChange('Create New Bill');
    <NewBill />;
  };

  return (
    <>
    {activeScreen == 1 ? (
    <main className="flex flex-col items-center justify-center w-full">
      <form onSubmit={handleSubmit} className="w-full max-w-4xl card mx-auto p-4 bg-white shadow-md rounded-lg mb-4">
        <div className="space-y-8">
          <h2 className="text-2xl font-bold mb-4">Register Customer</h2>
          <div className="flex flex-col sm:flex-row items-center">
            <input
              name="searchQuery"
              className="border border-gray-300 rounded p-2 w-full sm:w-2/3 text-gray-700"
              placeholder="Search by Patient ID, Email, or Mobile No"
              onChange={handleInputChange}
            />
            <button
              type="button"
              className="bg-blue-500 text-white p-2 rounded ml-0 sm:ml-2 mt-2 sm:mt-0"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          <div className="space-y-4">
            {/* <div className="flex flex-col sm:flex-row sm:space-x-4">
              <div className="w-full sm:w-1/3">
                <label className="block text-gray-700">Patient ID</label>
                <input
                  name="patientId"
                  className="border border-gray-300 rounded p-2 w-full text-gray-700"
                  value={formData.patientId}
                  readOnly
                />
              </div>
            </div> */}
            <div className="grid grid-cols-4 gap-2">
              <div className="w-full">
                <label className="block text-gray-700">Designation</label>
                <select
                  name="designation"
                  className="border border-gray-300 rounded p-2 w-full text-gray-700"
                  value={formData.designation}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select designation</option>
                  <option value="Mr">Mr.</option>
                  <option value="Mrs">Mrs.</option>
                  <option value="Ms">Ms.</option>
                </select>
              </div>
              <div className="w-full">
                <label className="block text-gray-700">First Name</label>
                <input
                  name="firstName"
                  required
                  className="border border-gray-300 rounded p-2 w-full text-gray-700"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full">
                <label className="block text-gray-700">Last Name</label>
                <input
                  name="lastName"
                  required
                  className="border border-gray-300 rounded p-2 w-full text-gray-700"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full">
                <label className="block text-gray-700">Phone Number</label>
                <input
                  name="phone"
                  required
                  type="tel"
                  className="border border-gray-300 rounded p-2 w-full text-gray-700"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="w-full col-span-2">
                <label className="block text-gray-700">Email ID</label>
                <input
                  name="email"
                  type="email"
                  required
                  className="border border-gray-300 rounded p-2 w-full text-gray-700"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
             
              <div className="w-full">
                <label className="block text-gray-700">Gender</label>
                <select
                  name="gender"
                  required
                  className="border border-gray-300 rounded p-2 w-full text-gray-700"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <div className="w-full">
                <label className="block text-gray-700">Pincode</label>
                <input
                  name="pinCode"
                  required
                  className="border border-gray-300 rounded p-2 w-full text-gray-700"
                  value={formData.pinCode}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="">
            <div className="grid grid-cols-4 gap-2">
                <div className="">
                <label className="block text-gray-700">Age</label>
                  <input
                    name="dob"
                    type="date"
                    required
                    className="border border-gray-300 rounded p-2 w-full text-gray-700"
                    value={formData.dob}
                    onChange={handleInputChange}
                  />
                  </div>
                  <div className="w-full">
                  <label className="block text-gray-700">age In Years</label>
                  <input
                    name="ageInYears"
                    type="number"
                    disabled
                    className="border border-gray-300 rounded p-2 w-full text-gray-700"
                    value={formData.ageInYears}
                    onChange={handleInputChange}
                  />
                  </div>
                  <div className="w-full">
                <label className="block text-gray-700">age In Months</label>
                  <input
                    name="ageInMonths"
                    type="number"
                    disabled
                    className="border border-gray-300 rounded p-2 w-full text-gray-700"
                    value={formData.ageInMonths}
                    onChange={handleInputChange}
                  />
                  </div>
                  <div className="w-full">
                <label className="block text-gray-700">age In Days</label>
                   <input
                    name="ageInDays"
                    type="number"
                    disabled
                    className="border border-gray-300 rounded p-2 w-full text-gray-700"
                    value={formData.ageInDays}
                    onChange={handleInputChange}
                  />
                  </div>
                </div>
              </div>  
            <div className="flex flex-col sm:flex-row sm:space-x-4 flex-wrap">
              <div className="w-full sm:w-1/4 mb-4">
                <label className="block text-gray-700">Address Line 1</label>
                <textarea
                  name="addressLine1"
                  className="border border-gray-300 rounded p-2 w-full text-gray-700"
                  required
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full sm:w-1/4 mb-4">
                <label className="block text-gray-700">Address Line 2</label>
                <textarea
                  name="addressLine2"
                  className="border border-gray-300 rounded p-2 w-full text-gray-700"
                  required
                  value={formData.addressLine2}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full sm:w-1/4 mb-4">
                <label className="block text-gray-700">Address Line 3</label>
                <textarea
                  name="addressLine3"
                  className="border border-gray-300 rounded p-2 w-full text-gray-700"
                  required
                  value={formData.addressLine3}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {/* <div className="flex flex-col sm:flex-row sm:space-x-4">
              <div className="w-full sm:w-1/3">
                <label className="block text-gray-700">Sample Collector</label>
                <div className="flex items-center">
                  <select
                    name="sampleCollector"
                    className="border border-gray-300 rounded p-2 w-full text-gray-700"
                    value={formData.sampleCollector}
                    onChange={handleInputChange}
                  >
                  
                  </select>
                  <button
                    type="button"
                    className="bg-green-500 text-white p-2 rounded ml-2"
                    onClick={() => openModal("collector")}
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="w-full sm:w-1/3">
                <label className="block text-gray-700">Organisation</label>
                <div className="flex items-center">
                  <select
                    name="organisation"
                    className="border border-gray-300 rounded p-2 w-full text-gray-700"
                    value={formData.organisation}
                    onChange={handleInputChange}
                  >
                    
                  </select>
                  <button
                    type="button"
                    className="bg-green-500 text-white p-2 rounded ml-2"
                    onClick={() => openModal("organisation")}
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="w-full sm:w-1/3">
                <label className="block text-gray-700">
                  Sample Collected At
                </label>
                <div className="flex items-center">
                  <select
                    name="sampleCollectedAt"
                    className="border border-gray-300 rounded p-2 w-full text-gray-700"
                    value={formData.sampleCollectedAt}
                    onChange={handleInputChange}
                  >
                   
                  </select>
                  <button
                    type="button"
                    className="bg-green-500 text-white p-2 rounded ml-2"
                    onClick={() => openModal("sample")}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div> */}
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded w-full mt-4"
            >
              Go to Billing
            </button>
          </div>
        </div>
      </form>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded p-4 max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Add New Details</h3>
              <button onClick={closeModal} className="text-gray-700">
                Close
              </button>
            </div>
            <div>
              {activeModal === "organisation" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700">
                      Referral Type (Doctor/Hospital)
                    </label>
                    <select
                      name="referralType"
                      className="border border-gray-300 rounded p-2 w-full text-gray-700"
                      onChange={handleInputChange}
                    >
                      <option value="">Select type</option>
                      <option value="Doctor">Doctor</option>
                      <option value="Hospital">Hospital</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700">Name</label>
                    <input
                      name="doctorHospitalName"
                      className="border border-gray-300 rounded p-2 w-full text-gray-700"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Degree</label>
                    <input
                      name="degree"
                      className="border border-gray-300 rounded p-2 w-full text-gray-700"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Complements</label>
                    <textarea
                      name="complements"
                      className="border border-gray-300 rounded p-2 w-full text-gray-700"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}
              {activeModal === "collector" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700">
                      Sample Collector Name
                    </label>
                    <input
                      name="sampleCollector"
                      className="border border-gray-300 rounded p-2 w-full text-gray-700"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}
              {activeModal === "sample" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700">
                      Sample Location
                    </label>
                    <input
                      name="sampleLocation"
                      className="border border-gray-300 rounded p-2 w-full text-gray-700"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}
              {activeModal === "searchResults" &&
                patientList.map((patient, index) => (
                  <div
                    key={index}
                    className="p-2 border-b border-gray-300 cursor-pointer"
                    onClick={() => handlePatientSelect(patient)}
                  >
                    {patient.firstName} {patient.lastName}
                  </div>
                ))}
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="bg-green-500 text-white p-2 rounded mr-2"
                onClick={() => {
                  console.log("Saving Organisation Details");
                  closeModal(); // Assuming you handle the save logic
                }}
              >
                Save
              </button>
              <button
                className="bg-gray-300 text-gray-700 p-2 rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
    ) : (
    <Booking patientData={formData} />
  )}
    </>
  );
}

const Booking = ({patientData}) => {
  const initialTest = {
      // id: "",
      name: "",
      barCode: "",
      cost: 0.0,
      code: "",
  };
  const [testPanel, setTestPanel] = useState([]);
  const [pdfData, setPdfData] = useState([]);
  const [updateProfile, setUpdateProfile] = useState(false);
  const [centers, setCenters] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [employees, setEmployees] = useState([]);
  const context = useContext(ActiveComponent);  

  useEffect(()=>{
      fetchCenters();
      fetchEmployees();
  },[])

  const fetchEmployees = async () => {
    try {
      const fetchedEmployees = await specificApis.fetchEmployeeList();
      if (Array.isArray(fetchedEmployees)) {
        setEmployees(fetchedEmployees);
      } else {
        setEmployees([]);
      }
    } catch (error) {
      console.error('Failed to fetch employees:', error);
    }
  };

  async function fetchCenters() {
      try {
          const fetchedCenters = await specificApis.fetchCenters();
          setCenters(fetchedCenters);
      } catch (error) {
          console.error('Failed to fetch center information:', error);
      }
  }

  const handleOpenModal = (booking) => {
      setSelectedBooking(booking)
      setShowModal(true);
  };

  const handleCloseModal = () => {
      setShowModal(false);
      setSelectedBooking(null);
      context.handleComponentChange('All Booking')
  };

  const [formData, setFormData] = useState({
      bookingSlip: {
          tests: [initialTest],
          patientId:patientData.patientId,
          referralSourceId: "",
          paymentMode: "Credit",
          net: 0.0,
          paid: 0.0,
          balance: 0.0,
          sampleBy: "",
          billedBy: "",
          date: "",
          time: "",
          centerCode: "",
      },
      patientDetails:patientData
  });

  useEffect(() => {
      const fetchTestPanel = async () => {
          try {
              const response = await fetch(
                  "http://ec2-13-233-207-62.ap-south-1.compute.amazonaws.com:8080/api/v1/lab/testpanel",
                  {
                      headers: {
                          "X-API-KEY": "test123",
                          "X-PARTNER-ID": "PYTHONMAN2",
                      },
                  }
              );
              const data = await response.json();
              setTestPanel(data);
          } catch (error) {
              console.error("Error fetching test panel data:", error);
          }
      };

      fetchTestPanel();
  }, []);

  console.log(testPanel, "data");

  function getTestTotal(){
      let sum = 0;
      (formData?.bookingSlip?.tests || []).map((e)=>{
          sum += Number(e.cost) ?? 0
      })
      return sum
  }

  const handleChange = (e, index) => {
      const {name, value} = e.target;
      setFormData((prevState) => {
          const updatedTests = [...prevState.bookingSlip.tests];
          if (name === "name") {
              const selectedTest = testPanel.find((test) => test.name === value);
              if (selectedTest) {
                  updatedTests[index] = {
                      // ...updatedTests[index],
                      name: selectedTest.name,
                      cost: parseFloat(selectedTest.cost), // Ensure cost is a number
                      code: selectedTest.testPanelCode, // Set code to testPanelCode
                  };
              }
          } else if (name === "barCode") {
              updatedTests[index] = {
                  ...updatedTests[index],
                  barCode: value,
              };
          } else {
              updatedTests[index] = {
                  ...updatedTests[index],
                  [name]: name === "cost" ? parseFloat(value) : value,
              };
          }
          return {
              ...prevState,
              bookingSlip: {
                  ...prevState.bookingSlip,
                  tests: updatedTests,
              },
          };
      });
  };

  const addTest = () => {
      setFormData((prevData) => ({
          ...prevData,
          bookingSlip: {
              ...prevData.bookingSlip,
              tests: [...prevData.bookingSlip.tests, initialTest],
          },
      }));
  };

  const removeTest = (index) => {
      const updatedTests = [...formData.bookingSlip.tests];
      updatedTests.splice(index, 1);
      setFormData((prevData) => ({
          ...prevData,
          bookingSlip: {
              ...prevData.bookingSlip,
              tests: updatedTests,
          },
      }));
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (updateProfile) {
          const response = await fetch(
              "http://ec2-13-233-207-62.ap-south-1.compute.amazonaws.com:8080/api/v1/lab/bookings?updateProfile=true",
              {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                      "X-API-KEY": "test123",
                      "X-PARTNER-ID": "PYTHONMAN2",
                  },
                  //   body: JSON.stringify(formData),
                  body: JSON.stringify({
                      ...formData,
                      patientId: searchResults.patientId, // Adding patientId to the formData
                  }),
              }
          );
          const result = await response.json();
          setPdfData(result);
          console.log(result);
      } else {
          const response = await fetch(
              "http://ec2-13-233-207-62.ap-south-1.compute.amazonaws.com:8080/api/v1/lab/bookings",
              {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                      "X-API-KEY": "test123",
                      "X-PARTNER-ID": "PYTHONMAN2",
                  },
                  body: JSON.stringify(formData),
              }
          );
          const result = await response.json();
         if(result.error == undefined){
          handleOpenModal({bookingSlip:result,patientDetails:patientData})
         }
          setPdfData(result);
          console.log(result);
      }
  };

  return (
      <div className="max-w-7xl mx-auto">
          <h6 className="uppercase font-extrabold text-xl text-white"><FontAwesomeIcon icon={faRestroom}/> | Create
              Bookings</h6>
          <hr/>
          <form
              onSubmit={handleSubmit}
              className="card mx-auto p-4 bg-white shadow-md rounded-lg mb-4"
          >
              <h2 className="text-2xl font-bold mb-4">Booking Form</h2>
              {/* Tests */}
              <div className="mb-4">
                  <h3 className="text-xl font-bolder mb-2">Tests</h3>
                  {formData.bookingSlip.tests.map((test, index) => (
                      <div
                          key={index}
                          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
                      >
                          <div>
                              <label
                                  className="block text-sm mb-2"
                                  htmlFor={`testName-${index}`}
                              >
                                  Test Name
                              </label>
                              <select
                                  name="name"
                                  required
                                  value={test.name}
                                  //   onChange={(e) => handleChange(e, index)}
                                  onChange={(e) => handleChange(e, index)}
                                  // onChange={(e)=>{

                                  // }}
                                  className="w-full"
                              >
                                  <option value="">Select a test</option>
                                  {testPanel?.map((testOption,i) => (
                                      <option key={i} value={testOption.name}>
                                          {testOption.name}
                                      </option>
                                  ))}
                              </select>
                          </div>

                          <div>
                              <label
                                  className="block text-sm mb-2"
                                  htmlFor={`testName-${index}`}
                              >
                                  Test Name
                              </label>
                              <input
                                  type="text"
                                  name={`name`}
                                  value={test.name}
                                  disabled
                                  onChange={(e) => handleChange(e, index)}
                                  className="w-full"
                              />
                          </div>
                          <div>
                              <label
                                  className="block text-sm mb-2"
                                  htmlFor={`barCode-${index}`}
                              >
                                  Bar Code
                              </label>
                              <input
                                  type="text"
                                  name={`barCode`}
                                  value={test.barCode}
                                  required
                                  onChange={(e) => handleChange(e, index)}
                                  className="w-full"
                              />
                          </div>
                          <div>
                              <label
                                  className="block text-sm mb-2"
                                  htmlFor={`cost-${index}`}
                              >
                                  Cost
                              </label>
                              <input
                                  type="number"
                                  name={`cost`}
                                  value={test.cost}
                                  required
                                  onChange={(e) => handleChange(e, index)}
                                  className="w-full"
                              />
                          </div>
                          <div>
                              <label
                                  className="block text-sm mb-2"
                                  htmlFor={`code-${index}`}
                              >
                                  Code
                              </label>
                              <input
                                  type="text"
                                  name={`code`}
                                  value={test.code}
                                  disabled
                                  onChange={(e) => handleChange(e, index)}
                                  className="w-full"
                              />
                          </div>
                          <div className="flex items-end">
                              {index === formData.bookingSlip.tests.length - 1 && (
                                  <button
                                      type="button"
                                      onClick={addTest}
                                      className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md bg-blue-500 hover:bg-blue-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                  >
                                      Add Test
                                  </button>
                              )}
                              {formData.bookingSlip.tests.length > 1 && (
                                  <button
                                      type="button"
                                      onClick={() => removeTest(index)}
                                      className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                  >
                                      Remove Test
                                  </button>
                              )}
                          </div>
                      </div>
                  ))}
              </div>

              {/* Additional Booking Slip Details */}
              <div className="mb-4">
                  <h3 className="text-xl font-bolder mb-2">Booking Slip Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                          <label
                              className="block text-sm mb-2"
                              htmlFor="referralDoctorId"
                          >
                              Referral Doctor ID
                          </label>
                          <input
                              type="text"
                              required
                              name="bookingSlip.referralDoctorId"
                              value={formData.bookingSlip.referralSourceId}
                              onChange={(e) =>
                                  setFormData((prevData) => ({
                                      ...prevData,
                                      bookingSlip: {
                                          ...prevData.bookingSlip,
                                          referralSourceId: e.target.value,
                                      },
                                  }))
                              }
                              className="w-full"
                          />
                      </div>
                      <div>
                          <label
                              className="block text-sm mb-2"
                              htmlFor="paymentMode"
                          >
                              Payment Mode
                          </label>
                          <input
                              type="text"
                              name="bookingSlip.paymentMode"
                              required
                              value={formData.bookingSlip.paymentMode}
                              onChange={(e) =>
                                  setFormData((prevData) => ({
                                      ...prevData,
                                      bookingSlip: {
                                          ...prevData.bookingSlip,
                                          paymentMode: e.target.value,
                                      },
                                  }))
                              }
                              className="w-full"
                          />
                      </div>
                      <div>
                          <label
                              className="block text-sm mb-2"
                              htmlFor="net"
                          >
                              Net Amount
                          </label>
                          <input
                              type="number"
                              name="bookingSlip.net"
                              disabled
                              value={getTestTotal()}
                              onChange={(e) =>
                                  setFormData((prevData) => ({
                                      ...prevData,
                                      bookingSlip: {
                                          ...prevData.bookingSlip,
                                          net: parseFloat(e.target.value),
                                      },
                                  }))
                              }
                              className="w-full"
                          />
                      </div>
                      <div>
                          <label
                              className="block text-sm mb-2"
                              htmlFor="paid"
                          >
                              Paid Amount
                          </label>
                          <input
                              type="number"
                              name="bookingSlip.paid"
                              value={formData.bookingSlip.paid}
                              onChange={(e) =>
                                  setFormData((prevData) => ({
                                      ...prevData,
                                      bookingSlip: {
                                          ...prevData.bookingSlip,
                                          paid: parseFloat(e.target.value),
                                      },
                                  }))
                              }
                              className="w-full"
                          />
                      </div>
                      <div>
                          <label
                              className="block text-sm mb-2"
                              htmlFor="balance"
                          >
                              Balance Amount
                          </label>
                          <input
                              type="number"
                              name="bookingSlip.balance"
                              disabled
                              value={getTestTotal() - formData.bookingSlip.paid}
                              onChange={(e) =>
                                  setFormData((prevData) => ({
                                      ...prevData,
                                      bookingSlip: {
                                          ...prevData.bookingSlip,
                                          balance: parseFloat(e.target.value),
                                      },
                                  }))
                              }
                              className="w-full"
                          />
                      </div>
                      <div>
                          <label
                              className="block text-sm mb-2"
                              htmlFor="sampleBy"
                          >
                              Sample By
                          </label>
                          <select  name="bookingSlip.sampleBy" required
                                value={formData.bookingSlip.sampleBy}   onChange={(e) =>
                                    setFormData((prevData) => ({
                                        ...prevData,
                                        bookingSlip: {
                                            ...prevData.bookingSlip,
                                            sampleBy: e.target.value,
                                        },
                                    }))
                                }>
                                <option>Select Option</option>
                                {(employees || []).map((e,i)=>{
                                    return <option value={e.empId} key={i}>{e.firstName} {e.lastName}</option>
                                })}
                            </select>
                      </div>
                      <div>
                          <label
                              className="block text-sm mb-2"
                              htmlFor="billedBy"
                          >
                              Billed By
                          </label>
                          <select  name="bookingSlip.billedBy" required
                                value={formData.bookingSlip.billedBy}   onChange={(e) =>
                                    setFormData((prevData) => ({
                                        ...prevData,
                                        bookingSlip: {
                                            ...prevData.bookingSlip,
                                            billedBy: e.target.value,
                                        },
                                    }))
                                }>
                                <option>Select Option</option>
                                {(employees || []).map((e,i)=>{
                                    return <option value={e.empId} key={i}>{e.firstName} {e.lastName}</option>
                                })}
                            </select>
                      </div>
                      <div>
                          <label
                              className="block text-sm mb-2"
                              htmlFor="date"
                          >
                              Date
                          </label>
                          <input
                              type="date"
                              name="bookingSlip.date"
                              value={formData.bookingSlip.date}
                              required
                              onChange={(e) =>
                                  setFormData((prevData) => ({
                                      ...prevData,
                                      bookingSlip: {
                                          ...prevData.bookingSlip,
                                          date: e.target.value,
                                      },
                                  }))
                              }
                              className="w-full"
                          />
                      </div>
                      <div>
                          <label
                              className="block text-sm mb-2"
                              htmlFor="time"
                          >
                              Time
                          </label>
                          <input
                              type="time"
                              name="bookingSlip.time"
                              value={formData.bookingSlip.time}
                              required
                              onChange={(e) =>
                                  setFormData((prevData) => ({
                                      ...prevData,
                                      bookingSlip: {
                                          ...prevData.bookingSlip,
                                          time: e.target.value,
                                      },
                                  }))
                              }
                              className="w-full"
                          />
                      </div>
                      <div>
                          <label
                              className="block text-sm mb-2"
                              htmlFor="centerCode"
                          >
                              Center Code
                          </label>
                          <select
                              name="bookingSlip.centerCode"
                              value={formData.bookingSlip.centerCode}
                              required
                              onChange={(e) =>
                                  setFormData((prevData) => ({
                                      ...prevData,
                                      bookingSlip: {
                                          ...prevData.bookingSlip,
                                          centerCode: e.target.value,
                                      },
                                  }))
                              }
                              className="w-full"
                          >
                              <option value={""}>Select Center</option>
                              {centers.map((e,i)=>{
                                  return <option key={e.id+i} value={e.id}>{e.name}</option>
                              })}
                          </select>
                      </div>
                  </div>
              </div>

              {/* Submit Button */}
              <div className="mt-4">
                  <button
                      type="submit"
                      className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-lg"
                  >
                      Submit
                  </button>
              </div>
          </form>
          <CustomModal showModal={showModal} handleClose={handleCloseModal}>
              {selectedBooking && <TestComponent data={selectedBooking}/>}
          </CustomModal>
      </div>
  );
};
