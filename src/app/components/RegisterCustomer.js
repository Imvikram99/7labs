import React, { useState } from "react";
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
  Text,
  Divider,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Container,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { specificApis } from "../data/SpecificApis";
import NewBill from "./NewBill";

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
    pincode: "",
    age: "",
    ageType: "Years",
    sampleCollector: "",
    organisation: "",
    sampleCollectedAt: "",
    referralType: "",
    doctorHospitalName: "",
    degree: "",
    complements: "",
    searchQuery: "",
  });

  const [patientList, setPatientList] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeModal, setActiveModal] = useState(null);

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
      pincode: "",
      age: "",
      ageType: "Years", // Default to 'Years'
      sampleCollector: "",
      organisation: "",
      sampleCollectedAt: "",
      referralType: "",
      doctorHospitalName: "",
      degree: "",
      complements: "",
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
      pincode: patient.pincode,
      age: patient.age, // Make sure the age is in the correct format or converted if needed
      ageType: patient.ageType,
    });
    closeModal();
  };

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
      openNewBill(patientId, formData);
    } else {
      console.log(fieldsToSend); // Show fields sent for registration in console
      specificApis
        .registerPatient(fieldsToSend)
        .then((response) => {
          console.log("Patient registered, ID:", response.patientId);
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
    <main className="flex flex-col items-center justify-center shadow-lg w-full">
      <form onSubmit={handleSubmit} className="w-full max-w-4xl p-8">
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
          <hr />
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <div className="w-full sm:w-1/3">
                <label className="block text-gray-700">Patient ID</label>
                <input
                  name="patientId"
                  className="border border-gray-300 rounded p-2 w-full text-gray-700"
                  value={formData.patientId}
                  readOnly
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <div className="w-full sm:w-1/4">
                <label className="block text-gray-700">Designation</label>
                <select
                  name="designation"
                  className="border border-gray-300 rounded p-2 w-full text-gray-700"
                  value={formData.designation}
                  onChange={handleInputChange}
                >
                  <option value="">Select designation</option>
                  <option value="Mr">Mr.</option>
                  <option value="Mrs">Mrs.</option>
                  <option value="Ms">Ms.</option>
                </select>
              </div>
              <div className="w-full sm:w-1/4">
                <label className="block text-gray-700">First Name</label>
                <input
                  name="firstName"
                  className="border border-gray-300 rounded p-2 w-full text-gray-700"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full sm:w-1/4">
                <label className="block text-gray-700">Last Name</label>
                <input
                  name="lastName"
                  className="border border-gray-300 rounded p-2 w-full text-gray-700"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full sm:w-1/4">
                <label className="block text-gray-700">Phone Number</label>
                <input
                  name="phone"
                  type="tel"
                  className="border border-gray-300 rounded p-2 w-full text-gray-700"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <div className="w-full sm:w-1/3">
                <label className="block text-gray-700">Email ID</label>
                <input
                  name="email"
                  type="email"
                  className="border border-gray-300 rounded p-2 w-full text-gray-700"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full sm:w-1/4">
                <label className="block text-gray-700">Age</label>
                <div className="flex items-center">
                  <input
                    name="age"
                    type="number"
                    className="border border-gray-300 rounded p-2 w-full text-gray-700"
                    value={formData.age}
                    onChange={handleInputChange}
                  />
                  <select
                    name="ageType"
                    className="border border-gray-300 rounded p-2 w-full text-gray-700 ml-2"
                    value={formData.ageType}
                    onChange={handleInputChange}
                  >
                    <option value="Years">Years</option>
                    <option value="Months">Months</option>
                  </select>
                </div>
              </div>
              <div className="w-full sm:w-1/4">
                <label className="block text-gray-700">Gender</label>
                <select
                  name="gender"
                  className="border border-gray-300 rounded p-2 w-full text-gray-700"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:space-x-4 flex-wrap">
              <div className="w-full sm:w-1/4 mb-4">
                <label className="block text-gray-700">Address Line 1</label>
                <textarea
                  name="addressLine1"
                  className="border border-gray-300 rounded p-2 w-full text-gray-700"
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full sm:w-1/4 mb-4">
                <label className="block text-gray-700">Address Line 2</label>
                <textarea
                  name="addressLine2"
                  className="border border-gray-300 rounded p-2 w-full text-gray-700"
                  value={formData.addressLine2}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full sm:w-1/4 mb-4">
                <label className="block text-gray-700">Address Line 3</label>
                <textarea
                  name="addressLine3"
                  className="border border-gray-300 rounded p-2 w-full text-gray-700"
                  value={formData.addressLine3}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full sm:w-1/4 mb-4 margin-left-0">
                <label className="block text-gray-700">Pincode</label>
                <input
                  name="pincode"
                  className="border border-gray-300 rounded p-2 w-full text-gray-700"
                  value={formData.pincode}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <div className="w-full sm:w-1/3">
                <label className="block text-gray-700">Sample Collector</label>
                <div className="flex items-center">
                  <select
                    name="sampleCollector"
                    className="border border-gray-300 rounded p-2 w-full text-gray-700"
                    value={formData.sampleCollector}
                    onChange={handleInputChange}
                  >
                    {/* Add options dynamically here */}
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
                    {/* Add options dynamically here */}
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
                    {/* Add options dynamically here */}
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
            </div>
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
  );
}
