import { DeleteIcon } from "@chakra-ui/icons";
import { Icon } from "@chakra-ui/react";
import { useFieldArray } from "react-hook-form";

const ReferenceValues = (props) => {
    const {control,watch,register,name,testUnits,setModalOpen} = props;
    const {fields: referenceValueFields, append: appendReferenceValue, remove: removeReferenceValue} = useFieldArray({
        control,
        name: `${name}.referenceValues`
    });
    if(referenceValueFields.length == 0){
        appendReferenceValue()
    }

    return (
        <div className="space-y-4 ml-7">
            {referenceValueFields.map((refItem, refIndex) => (
                <div key={refItem.id + refIndex} className="space-y-2 border p-4 relative">
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Min Age</label>
                            <input {...register(`${name}.referenceValues.${refIndex}.minAge`)} type="number"
                                   required={true}
                                   className="mt-1 border border-gray-300 rounded px-2 py-1 w-full text-gray-700"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Max Age</label>
                            <input {...register(`${name}.referenceValues.${refIndex}.maxAge`)} required={true}
                                   type="number"
                                   className="mt-1 border border-gray-300 rounded px-2 py-1 w-full text-gray-700"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Gender</label>
                            <select
                                {...register(`${name}.referenceValues.${refIndex}.gender`)} required={true}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border">\
                                <option value={"OTHER"}>Other</option>
                                <option value={"ANY"}>Any</option>
                                <option value={"MALE"}>Male</option>
                                <option value={"FEMALE"}>Female</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Min Reference Value</label>
                            <input {...register(`${name}.referenceValues.${refIndex}.minReferenceValue`)}
                                   required={true}
                                   type="number"
                                   className="mt-1 border border-gray-300 rounded px-2 py-1 w-full text-gray-700"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Max Reference Value</label>
                            <input {...register(`${name}.referenceValues.${refIndex}.maxReferenceValue`)}
                                   required={true}
                                   type="number"
                                   className="mt-1 border border-gray-300 rounded px-2 py-1 w-full text-gray-700"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Test Result Unit</label>
                            <div className='flex'>
                                <select {...register(`${name}.referenceValues.${refIndex}.testResultUnit.name`)}>
                                    {(testUnits || []).map((e, index) => <option value={e.name}
                                                                                 key={index}>{e.name}</option>)}
                                </select>
                                <button
                                    type="button"
                                    className="bg-green-500 text-white p-2 rounded ml-2"
                                    onClick={() => setModalOpen("unit")}
                                > Add
                                </button>
                            </div>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => removeReferenceValue(refIndex)}
                        className="inline-flex rounded-full -top-4 -right-4 absolute items-center px-2 py-2 border border-transparent text-sm font-medium shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        <Icon as={DeleteIcon}/>
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={() => appendReferenceValue({})}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add
                Reference Value
            </button>
        </div>
    );
};

export default ReferenceValues