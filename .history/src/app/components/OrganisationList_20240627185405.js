import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';

const AddTestPanel = () => {
  const { register, control, watch, handleSubmit } = useForm();
  const { fields, append, remove } = useFieldArray({ control, name: 'tests' });
  const [testCategories, setTestCategories] = useState([]);
  const [testUnits, setTestUnits] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/lab/testpanel/category', {
      headers: {
        'X-API-KEY': 'test123',
        'X-PARTNER-ID': 'PYTHONMAN2'
      }
    })
    .then(response => setTestCategories(response.data))
    .catch(error => console.error(error));

    axios.get('http://localhost:8080/api/v1/lab/testpanel/testunit', {
      headers: {
        'X-API-KEY': 'test123',
        'X-PARTNER-ID': 'PYTHONMAN2'
      }
    })
    .then(response => setTestUnits(response.data))
    .catch(error => console.error(error));
  }, []);

  const onSubmit = data => {
    axios.post('http://localhost:8080/api/v1/lab/testpanel', data, {
      headers: {
        'X-API-KEY': 'test123',
        'X-PARTNER-ID': 'PYTHONMAN2',
        'Content-Type': 'application/json'
      }
    })
    .then(response => console.log(response))
    .catch(error => console.error(error));
  };

  const testResultType = watch('testResultType');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Other input fields here */}
      <div>
        <label htmlFor="testResultType" className="block text-sm font-medium text-gray-700">Test Result Type</label>
        <select {...register('testResultType')} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
          <option value="BLOOD_MULTIPLE_PARAMETER">BLOOD_MULTIPLE_PARAMETER</option>
          <option value="DOCUMENT">DOCUMENT</option>
          <option value="MATRIX">MATRIX</option>
        </select>
      </div>
      {fields.map((item, index) => (
        <div key={item.id} className="space-y-4">
          {/* Other test input fields here */}
          {testResultType === 'BLOOD_MULTIPLE_PARAMETER' && (
            <div>
              <label htmlFor={`tests.${index}.referenceValues`} className="block text-sm font-medium text-gray-700">Reference Values</label>
              {/* Add input fields for reference values here */}
            </div>
          )}
          {testResultType === 'DOCUMENT' && (
            <div>
              <label htmlFor={`tests.${index}.document`} className="block text-sm font-medium text-gray-700">Document</label>
              {/* Add input field for document here */}
            </div>
          )}
          {testResultType === 'MATRIX' && (
            <div>
              <label htmlFor={`tests.${index}.matrix`} className="block text-sm font-medium text-gray-700">Matrix</label>
              {/* Add input fields for matrix here */}
            </div>
          )}
          <button type="button" onClick={() => remove(index)} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Remove Test</button>
        </div>
      ))}
      {/* Other input fields and submit button here */}
    </form>
  );
};

export default AddTestPanel;
