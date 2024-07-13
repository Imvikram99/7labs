import { Icon } from "@chakra-ui/react";
import { useFieldArray } from "react-hook-form";
import AddReferenceValues from "./AddReferenceValues";
import SingleReferenceValues from "./OrganizationListContents/SingleReferenceValues";
import { DeleteIcon } from "@chakra-ui/icons";
import { useMemo } from "react";

const RenderSubTest = ({ control, index, deep, register,itemIndex, watch, name, testUnits, setModalOpen,subTestFields }) => {
    const { fields: NestedsubTest, append, remove: removeNestedSubTeste,update } = useFieldArray({
        control,
        name: name ? `${name}.subTests` : 'subTests'
    });
    const newname = `${name}.subTests` ?? 'subTests';

    const getDropDown = useMemo(() => {
        const data = []
        subTestFields.map((e) => {
            if (e.code !== undefined && e.code !== "") {
                data.push(e.code)
            }
        })
        return data
    }, [watch(name ?? 'subTests')]);

    const fieldProps = { watch, control, register };
    return (
        <div>

            <div className="grid grid-cols-3 gap-4">
                <div>
                    <label htmlFor={`${name}.code`}
                        className="block text-sm font-medium text-gray-700">
                        Test Code
                    </label>
                    <input {...register(`${name}.code`)} required={true}
                        className="mt-1 border border-gray-300 rounded px-2 py-1 w-full text-gray-700" />
                </div>
                <div>
                    <label htmlFor={`${name}.name`}
                        className="block text-sm font-medium text-gray-700">
                        Test Name
                    </label>
                    <input {...register(`${name}.name`)} required={true}
                        className="mt-1 border border-gray-300 rounded px-2 py-1 w-full text-gray-700" />
                </div>
                <div>
                    <label htmlFor={`${name}.${itemIndex}.referenceValueType`}
                        className="block text-sm font-medium text-gray-700">
                        Reference Value Type
                    </label>
                    <select {...register(`${name}.referenceValueType`)} required={true}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border">
                        <option value="">Select Value</option>
                        <option value="SINGLE_STRING">SINGLE_STRING</option>
                        <option value="RANGE">RANGE</option>
                        <option value="NONE">NONE</option>
                    </select>
                </div>
                {itemIndex >= 2 && (
                            <div>
                                <div className="flex items-center">
                                    <input type="checkbox"
                                        id={`isRatio_${itemIndex}`}
                                        className="w-fit"
                                        {...register(`${name}.isRatio`)}
                                    />
                                    <label htmlFor={`isRatio_${itemIndex}`} className="ml-2">Is Ratio</label>
                                </div>
                            </div>
                        )}
                        {watch(`${name}.isRatio`) && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Test Code Numerator</label>
                                    <select {...register(`${name}.testCodeNumerator`)} required={true}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border">
                                        <option value="">Select Value</option>
                                        {(getDropDown.slice(0, itemIndex) || []).map((e,i) => {
                                            return <option key={i} value={e}>{e}</option>
                                        })}
                                    </select>

                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Test Code Denominator</label>
                                    <select {...register(`${name}.testCodeDenominator`)} required={true}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border">
                                        <option value="">Select Value</option>
                                        {(getDropDown.slice(0, itemIndex) || []).map((e,i) => {
                                            return <option key={i} value={e}>{e}</option>
                                        })}
                                    </select>

                                </div>
                            </>
                        )}
            </div>
            {watch(`${name}.referenceValueType`) === 'SINGLE_STRING' && (
                        <SingleReferenceValues
                            {...fieldProps}
                            index={index}
                            name={`${name}`}
                            testUnits={testUnits}
                            setModalOpen={setModalOpen} />
                    )}
                    {watch(`${name}.referenceValueType`) === 'RANGE' && (
                        <AddReferenceValues
                            {...fieldProps}
                            index={index}
                            name={`${name}`}
                            testUnits={testUnits}
                            setModalOpen={setModalOpen}
                        />
                    )}
            {NestedsubTest.map((item, subIndex) => (
                <div key={name + subIndex} className="space-y-4 mt-2 border border-slate-500 rounded-2xl p-4 relative mb-2">
                    <span className="font-bold">Sub Test {subIndex + 1}</span>
                    <RenderSubTest control={control} deep={deep} itemIndex={subIndex} subTestFields={NestedsubTest} index={index+1} update={update} register={register} watch={watch} name={newname+'.'+subIndex} testUnits={testUnits} setModalOpen={setModalOpen} />
                    <button type="button" onClick={() => removeNestedSubTeste(itemIndex)}
                    className="inline-flex rounded-full -top-2 -right-4 absolute items-center px-2 py-2 border border-transparent text-sm font-medium shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    <Icon as={DeleteIcon} />
                </button>
                </div>
            ))}
           {index < deep && (
             <button type="button" onClick={() => append({})}
             className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Sub
             Test
         </button>
           )}
        </div>
    );
};


function SubTestValues({ control, index, register, watch, name, testUnits, setModalOpen, update }) {
    const { fields: subTestFields, append: appendSubTestValue, remove: removeSubTesteValue } = useFieldArray({
        control,
        name : `${name}.subTests` ?? 'subTests'
    });
    name = `${name}.subTests` ?? 'subTests';
    return (
        <div>
            {subTestFields.map((item, itemIndex) => (
                <div key={name + itemIndex} className="space-y-4 border border-slate-500 rounded-2xl p-4 relative mb-2">
                    <span className="font-bold">Sub Test {itemIndex + 1}</span>
                    <RenderSubTest control={control} deep={3} itemIndex={itemIndex} subTestFields={subTestFields} index={index+1} update={update} register={register} watch={watch} name={name+'.'+itemIndex} testUnits={testUnits} setModalOpen={setModalOpen} />
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
        </div>
    );
}

export default SubTestValues;