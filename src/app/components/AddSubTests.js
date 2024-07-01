import { Icon } from "@chakra-ui/react";
import { useFieldArray } from "react-hook-form";
import AddReferenceValues from "./AddReferenceValues";
import SingleReferenceValues from "./OrganizationListContents/SingleReferenceValues";
import { DeleteIcon } from "@chakra-ui/icons";

const SubTestValues = ({control, index, register,watch,name}) => {
    const {fields: subTestFields, append: appendSubTestValue, remove: removeSubTesteValue} = useFieldArray({
        control,
        name: name ? `${name}.subTests` : 'subTests'
    });
    name =  `${name}.subTests` ?? 'subTests'
    console.log(subTestFields);
    return (
        <>
            {subTestFields.map((item, itemIndex) => (
                <div key={item.id} className="space-y-4 border border-slate-500 rounded-2xl p-4 relative mb-2">
                    <span className="font-bold">Sub Test {itemIndex + 1}</span>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor={ `${name}.${itemIndex}.name`}
                                   className="block text-sm font-medium text-gray-700">
                                Test Name
                            </label>
                            <input {...register( `${name}.${itemIndex}.name`)}  required={true}
                                   className="mt-1 border border-gray-300 rounded px-2 py-1 w-full text-gray-700"/>
                        </div>
                        <div>
                            <label htmlFor={ `${name}.${itemIndex}.referenceValueType`}
                                   className="block text-sm font-medium text-gray-700">
                                Reference Value Type
                            </label>
                            <select {...register( `${name}.${itemIndex}.referenceValueType`)}  required={true}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border">
                                <option value="">Select Value</option>
                                <option value="SINGLE_STRING">SINGLE_STRING</option>
                                <option value="RANGE">RANGE</option>
                                <option value="NONE">NONE</option>
                            </select>
                        </div>
                    </div>
                    {watch( `${name}.${itemIndex}.referenceValueType`) === 'SINGLE_STRING' && (
                        <SingleReferenceValues control={control} index={index} register={register} name={`${name}.${itemIndex}`}/>
                    )}
                    {watch( `${name}.${itemIndex}.referenceValueType`) === 'RANGE' && (
                        <AddReferenceValues control={control} index={index} register={register} name={`${name}.${itemIndex}`}/>
                    )}
                    <div className="flex justify-start w-full">
                        <button type="button" onClick={() => removeSubTesteValue(itemIndex)}
                                className="inline-flex rounded-full -top-2 -right-4 absolute items-center px-2 py-2 border border-transparent text-sm font-medium shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                            <Icon as={DeleteIcon} />
                        </button>
                    </div>
                </div>
            ))}
            <button type="button" onClick={() => appendSubTestValue({})}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Sub
                Test
            </button>
        </>
    );
};


export default SubTestValues;