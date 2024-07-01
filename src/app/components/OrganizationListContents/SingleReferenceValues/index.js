import React, {useEffect, useState} from 'react';
import {specificApis} from "../../../data/SpecificApis";
import Select from "react-select";
import {Controller, useForm} from "react-hook-form";
import AddNewPossibleValueModal from "../AddNewPossibleValueModal";

const SingleReferenceValues = ({register, name, nested,control,testUnits}) => {
    const [possibleValues, setPossibleValues] = useState([]);
    const {setValue} = useForm();

    const [activeModal, setActiveModal] = useState(null);

    const openModal = () => {
        setActiveModal(true);
    };

    const closeModal = () => {
        setActiveModal(false);
    };

    const getReferenceValues = () => {
        specificApis.fetchAllPossibleReference()
            .then(response => {
                let lists = []
                response.forEach(({name}) => lists.push({label: name, value: name}));
                setPossibleValues(lists);
            })
            .catch(error => console.error(error));
    }

    useEffect(() => {
        getReferenceValues();
    }, [])

    return (
        <div className="space-y-4 ml-7">
            <div className="space-y-2 border p-4 relative">
                <div className="grid grid-cols-2 gap-4">
                    {!nested ? (
                        <div className='flex'>
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700">
                                    Possible Values
                                </label>
                                <div className="flex items-center">
                                    <Controller
                                        name={`${name}.singleReferenceValues.allPossibleValues`}
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                        <Select
                                            className="w-full"
                                            options={possibleValues}
                                      
                                            defaultValue={(value || []).map((e)=>{
                                                if(typeof e == 'string'){
                                                    return {value:e,label:e}
                                                }
                                                return e
                                            })}
                                            isMulti
                                            onChange={(selectedOptions) => {
                                                const values = selectedOptions.map((option) => option.value);
                                                onChange(values);
                                            }}
                                        />
                                    )}
                                    />
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
                    ) : (
                        <div>
                            <label htmlFor="testSampleType" className="block text-sm font-medium text-gray-700">
                                allPossibleValues
                            </label>
                            <select {...register(`${name}.singleReferenceValues.allPossibleValues`)} required="true"
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border">
                                <option value="">Select</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Code</label>
                        <input {...register(`${name}.singleReferenceValues.code`)} type='number' required="true"
                               className="mt-1 border border-gray-300 rounded px-2 py-1 w-full text-gray-700"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Reference Value</label>
                        <input {...register(`${name}.singleReferenceValues.referenceValue`)} required="true"
                               className="mt-1 border border-gray-300 rounded px-2 py-1 w-full text-gray-700"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Unit</label>
                               <select {...register(`${name}.singleReferenceValues.unit`)}>
                                 {(testUnits || []).map((e)=>{
                                    return <option value={e.name}>{e.name}</option>
                                 })}
                               </select>
                    </div>
                </div>
            </div>
            {activeModal && (
                <AddNewPossibleValueModal
                    closeModal={closeModal}
                    getReferenceValues={getReferenceValues}
                />
            )}
        </div>
    );
};

export default SingleReferenceValues;