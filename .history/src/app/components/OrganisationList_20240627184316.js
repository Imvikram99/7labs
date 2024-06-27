
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      <input {...register('shortName')} />
      <select {...register('testCategory')}>
        {testCategories.map(category => (
          <option key={category.id} value={category.name}>{category.name}</option>
        ))}
      </select>
      <select {...register('testSampleType')}>
        <option value="BLOOD">BLOOD</option>
        <option value="URINE">URINE</option>
        <option value="STOOL">STOOL</option>
        <option value="RADIO">RADIO</option>
      </select>
      <input {...register('testPanelCode')} />
      {fields.map((item, index) => (
        <div key={item.id}>
          <input {...register(`tests.${index}.id`)} />
          <input {...register(`tests.${index}.name`)} />
          <input {...register(`tests.${index}.code`)} />
          <select {...register(`tests.${index}.referenceValueType`)}>
            <option value="SINGLE_STRING">SINGLE_STRING</option>
            <option value="RANGE">RANGE</option>
            <option value="NONE">NONE</option>
          </select>
          <button type="button" onClick={() => remove(index)}>Remove Test</button>
        </div>
      ))}
      <button type="button" onClick={() => append({})}>Add Test</button>
      <input {...register('testResultType')} />
      <input {...register('inputType')} />
      <input {...register('method')} />
      <input {...register('instrument')} />
      <input {...register('interpretation')} />
      <input {...register('cost')} />
      <button type="submit">Add Test Panel</button>
    </form>
  );
};

export default AddTestPanel;
