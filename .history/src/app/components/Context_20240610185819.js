import React, { createContext, useContext, useState } from 'react';

// Creating the context
const FormDataContext = createContext();

// Custom hook to use the context
export const useFormData = () => useContext(FormDataContext);
