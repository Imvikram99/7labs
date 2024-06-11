import React, { createContext, useContext, useState } from 'react';

// Creating the context
const FormDataContext = createContext();

// Custom hook to use the context
export const useFormData = () => useContext(FormDataContext);
export const FormDataProvider = ({ children }) => {
    const [formData, setFormData] = useState({
      // Initial form data structure
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
      sampleCollectedAt: '',
      referralType: '',
      doctorHospitalName: '',
      degree: '',
      complements: '',
      searchQuery: '',
    });
  
    const updateFormData = (newData) => {
      setFormData(prev => ({ ...prev, ...newData }));
    };
  
    return (
      <FormDataContext.Provider value={{ formData, updateFormData }}>
        {children}
      </FormDataContext.Provider>
    );
  };
  