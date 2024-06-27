import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';

const AddTestPanel = () => {
  const { register, control, handleSubmit } = useForm();
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input {...register('name')} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
      </div>
      <div>
        <label htmlFor="shortName" className="block text-sm font-medium text-gray-700">Short Name</label>
        <input {...register('shortName')} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
      </div>
      <div>
        <label htmlFor="testCategory" className="block text-sm font-medium text-gray-700">Test Category</label>
        <select {...register('testCategory')} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
          {testCategories.map(category => (
            <option key={category.id} value={category.name}>{category.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="testSampleType" className="block text-sm font-medium text-gray-700">Test Sample Type</label>
        <select {...register('testSampleType')} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
          <option value="BLOOD">BLOOD</option>
          <option value="URINE">URINE</option>
          <option value="STOOL">STOOL</option>
          <option value="RADIO">RADIO</option>
        </select>
      </div>
      <div>
        <label htmlFor="testPanelCode" className="block text-sm font-medium text-gray-700">Test Panel Code</label>
        <input {...register('testPanelCode')} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
      </div>
      {fields.map((item, index) => (
        <div key={item.id} className="space-y-4">
          <div>
            <label htmlFor={`tests.${index}.id`} className="block text-sm font-medium text-gray-700">Test ID</label>
            <input {...register(`tests.${index}.id`)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
          <div>
            <label htmlFor={`tests.${index}.name`} className="block text-sm font-medium text-gray-700">Test Name</label>
            <input {...register(`tests.${index}.name`)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
          <div>
            <label htmlFor={`tests.${index}.code`} className="block text-sm font-medium text-gray-700">Test Code</label>
            <input {...register(`tests.${index}.code`)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
          <div>
            <label htmlFor={`tests.${index}.referenceValueType`} className="block text-sm font-medium text-gray-700">Reference Value Type</label>
            <select {...register(`tests.${index}.referenceValueType`)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option value="SINGLE_STRING">SINGLE_STRING</option>
              <option value="RANGE">RANGE</option>
              <option value="NONE">NONE</option>
            </select>
          </div>
          <button type="button" onClick={() => remove(index)} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Remove Test</button>
        </div>
      ))}
      <button type="button" onClick={() => append({})} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Test</button>
      <div>
        <label htmlFor="testResultType" className="block text-sm font-medium text-gray-700">Test Result Type</label>
        <input {...register('testResultType')} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
      </div>
      <div>
        <label htmlFor="inputType" className="block text-sm font-medium text-gray-700">Input Type</label>
        <input {...register('inputType')} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
      </div>
      <div>
        <label htmlFor="method" className="block text-sm font-medium text-gray-700">Method</label>
        <input {...register('method')} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
      </div>
      <div>
        <label htmlFor="instrument" className="block text-sm font-medium text-gray-700">Instrument</label>
        <input {...register('instrument')} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
      </div>
      <div>
        <label htmlFor="interpretation" className="block text-sm font-medium text-gray-700">Interpretation</label>
        <input {...register('interpretation')} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
      </div>
      <div>
        <label htmlFor="cost" className="block text-sm font-medium text-gray-700">Cost</label>
        <input {...register('cost')} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
      </div>
      <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Test Panel</button>
    </form>
  );
};

export default AddTestPanel;
