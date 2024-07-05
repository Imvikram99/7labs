import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import SingleReferenceValues from './OrganizationListContents/SingleReferenceValues';
import AddReferenceValues from '@/app/components/AddReferenceValues'
import AddSubTests from '@/app/components/AddSubTests'
import { specificApis } from '../data/SpecificApis';
import AddNewPossibleValueModal from './OrganizationListContents/AddNewPossibleValueModal';

function AddTestModal({ onClose, onSave }) {
  const { register, control, watch, handleSubmit,reset } = useForm();
  const [testUnits, setTestUnits] = useState([]);

  useEffect(()=>{
    getTestUnits()
  },[])


  const [activeModal, setActiveModal] = useState(null);

  function getTestUnits() {
    specificApis.fetchTestUnits()
    .then(response => {
        setTestUnits(response);
    })
    .catch(error => console.error(error));
  }

  function setModalOpen(){
      setActiveModal(true);
  };

  const closeModal = () => {
      setActiveModal(false);
  };

  const onSubmit = (data) => {
    if(data.subTests.length > 0){
      delete  data.singleReferenceValues
      delete data.referenceValues
      delete data.referenceValueType
    }
    onSave(data).then(()=>reset());
  };

  return (
    <div className="bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg w-full">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Add New Test</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="block text-green-700 text-sm font-bold mb-2">Test Name:</label>
            <input
                type="text" name="name" placeholder="Test Name" {...register(`name`)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div>
            <label className="block text-green-700 text-sm font-bold mb-2">Test Code:</label>
            <input
                type="text" name="code" placeholder="Test Code" {...register(`code`)}
                className="shadow mb-3 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
         {(watch(`subTests`) || []).length == 0 && (
          <>
              <div className='mb-3 mt-2'>
            <label className="block text-green-700 text-sm font-bold mb-2">
              Reference Value Type
            </label>
            <select {...register(`referenceValueType`)} required={true}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border">
              <option value="">Select Value</option>
              <option value="SINGLE_STRING">SINGLE_STRING</option>
              <option value="RANGE">RANGE</option>
              <option value="NONE">NONE</option>
            </select>
          </div>
         <div className='mb-3'>
         {watch(`referenceValueType`) === 'SINGLE_STRING' && (
            <SingleReferenceValues control={control}  register={register} name={``} testUnits={testUnits} setModalOpen={setModalOpen}/>
          )}
          {watch(`referenceValueType`) === 'RANGE' && (
            <AddReferenceValues control={control} register={register} name={``} />
          )}
         </div>
          </>
         )}
          <AddSubTests control={control} register={register} watch={watch} name={``} testUnits={testUnits} setModalOpen={setModalOpen}/>
          <div className="flex justify-end items-center mt-4 gap-3">
            <button type="button" onClick={onClose} className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancel</button>
            <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Save Test</button>
          </div>
        </form>
      </div>
      {activeModal && (
          <AddNewPossibleValueModal
              closeModal={closeModal}
              title={'Test Unit'}
              getReferenceValues={()=>getTestUnits()}
              apiFunction={'addTestUnits'}
          />
      )}
    </div>
  );
}

export default AddTestModal;
