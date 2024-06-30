
import React from 'react';

const SingleReferenceValues = ({ register,name,nested}) => {

    return (
        <div className="space-y-4 ml-7">
            <div  className="space-y-2 border p-4 relative">
                <div className="grid grid-cols-2 gap-4">
                    {!nested ? (
                         <div className='flex'>
                         <div className='flex items-center mr-4'>
                         <label className="block text-sm font-medium text-gray-700  mr-1">Low</label>
                         <input {...register(`${name}.singleReferenceValues.allPossibleValues`)} value={'Low'} type='checkbox'
                                className=" border border-gray-300 rounded px-2 py-1  text-gray-700"/>
                         </div>
                         <div className='flex items-center mr-4'>
                         <label className="block text-sm font-medium text-gray-700  mr-1">Normal</label>
                         <input {...register(`${name}.singleReferenceValues.allPossibleValues`)} value={'Normal'} type='checkbox'
                                className=" border border-gray-300 rounded px-2 py-1  text-gray-700"/>
                         </div>
                         <div className='flex items-center'>
                         <label className="block text-sm font-medium text-gray-700 mr-1">High</label>
                         <input {...register(`${name}.singleReferenceValues.allPossibleValues`)} value={'High'} type='checkbox'
                                className=" border border-gray-300 rounded px-2 py-1 text-gray-700"/>
                         </div>
                     </div>
                    ):(
                        <div>
                        <label htmlFor="testSampleType" className="block text-sm font-medium text-gray-700">
                        allPossibleValues
                        </label>
                        <select {...register(`${name}.singleReferenceValues.allPossibleValues`)}  required="true"
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border">
                            <option value="">Select</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Code</label>
                        <input {...register(`${name}.singleReferenceValues.code`)} type='number'  required="true"
                               className="mt-1 border border-gray-300 rounded px-2 py-1 w-full text-gray-700"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Reference Value</label>
                        <input {...register(`${name}.singleReferenceValues.referenceValue`)}  required="true"
                               className="mt-1 border border-gray-300 rounded px-2 py-1 w-full text-gray-700"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Unit</label>
                        <input {...register(`${name}.singleReferenceValues.unit`)} type='number'  required="true"
                               className="mt-1 border border-gray-300 rounded px-2 py-1 w-full text-gray-700"/>
                    </div>
                </div>
            </div>
    </div>
    );
};

export default SingleReferenceValues;