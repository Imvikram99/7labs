import React, {useEffect, useState} from 'react';
import {useForm, useFieldArray, Controller} from 'react-hook-form';
import axios from 'axios';
import {specificApis} from '../data/SpecificApis';
import {Box, Icon, Input} from "@chakra-ui/react";
import SingleReferenceValues from "@/app/components/OrganizationListContents/SingleReferenceValues";
import { DeleteIcon } from '@chakra-ui/icons';
import AddSubTests from "@/app/components/AddSubTests"
import AddReferenceValues from "@/app/components/AddReferenceValues"
import Select from "react-select";
import toast from 'react-hot-toast';
import AddNewPossibleValueModal from './OrganizationListContents/AddNewPossibleValueModal';

const AddTestPanel = () => {
    const {register, control, watch, handleSubmit,setValue} = useForm();
    const {fields: testFields, append: appendTest, remove: removeTest} = useFieldArray({control, name: 'tests'});

    const [testCategories, setTestCategories] = useState([]);
    const [testUnits, setTestUnits] = useState([]);
    const [test, setTest] = useState([]);
    const [open, setOpen] = useState({show:false,type:''});
    useEffect(() => {
        getTestCategories()
            getTestUnits()
            fetchTests();
    }, []);

   function getTestUnits(){
    specificApis.fetchTestUnits()
    .then(response => {
        setTestUnits(response);
    })
    .catch(error => console.error(error));
   }

   function getTestCategories(){
    specificApis.fetchTestCategories()
    .then(response => {
        setTestCategories(response);
    })
    .catch(error => console.error(error));
   }

   function setModalOpen(type){
     console.log(type);
     setOpen({show:true,type})
   }

    async function fetchTests() {
        try {
            const fetchedTests = await specificApis.fetchTestList();
            setTest(fetchedTests);
        } catch (error) {
            console.error('Failed to fetch tests:', error);
        }
    }

    const onSubmit = data => {
        const matrixColumns = data.matrixTestReportTemplate ? data.matrixTestReportTemplate.columns.reduce((acc, column) => {
            const inputKey = column.inputKey;
            const inputComment = column.inputComment;
            const inputName = column.inputName;
            if (!acc[inputName]) {
                acc[inputName] = {};
            }
            acc[inputName][inputKey] = inputComment;

            return acc;
        }, {}) : {};

        const columnStyles = data.matrixTestReportTemplate ? data.matrixTestReportTemplate.columns.reduce((acc, style) => {
            const styleName = style.inputName;
            acc[styleName] = {
                width: style.width,
                backgroundColor: style.backgroundColor,
                textColor: style.textColor,
                alignment: style.alignment
            };
            return acc;
        }, {}) : {};
        delete data?.testlist
        const code = []
        data.tests = data.tests.map((e)=>{
            code.push(e.code)
            if(e.referenceValueType == 'NONE'){
                e.subTests = []
                delete  e.singleReferenceValues
                delete e.referenceValues
                return e
            }
            if(e.referenceValueType === "RANGE"){
                delete e.matrixTestReportTemplate
            }
            if(e.referenceValueType === "SINGLE_STRING"){
                delete e.matrixTestReportTemplate
            }
            if(e.subTests.length > 0){
              delete  e.singleReferenceValues
              delete e.referenceValues
              delete e.referenceValueType
            }
            e.subTests = e.subTests?.map((a)=>{
                a.id = e.id
                if(a.referenceValueType == 'NONE'){
                    delete  a.singleReferenceValues
                    delete a.referenceValues
                    return a
                }
                if(e.referenceValueType === "RANGE"){
                    delete a.matrixTestReportTemplate
                }
                if(e.referenceValueType === "SINGLE_STRING"){
                    delete a.matrixTestReportTemplate
                }
                return a
            })
            return e
        })
        
        if(code.length !== [...new Set(code)].length){
            toast.error('Please Add Unique Test Code For Every TestPanel')
            return
        }

        if(data.testResultType === 'MATRIX'){
            data.matrixTestReportTemplate = {
                ...data.matrixTestReportTemplate,
                columns: matrixColumns,
                columnStyles: columnStyles,
            }
        }else{
            delete data.matrixTestReportTemplate
        }

        specificApis.addTestPanel({...data})
            .then(response => {
                toast.success('Successfully Added Organizer List')
            })
            .catch(error => {
                if (error.response.data.error === "DuplicateKeyException") {
                    toast.error('Test Panel Code should be unique.')
                } else {
                    toast.error('Failed To add Organizer List. Please Verify Data');
                }
            });
    };

    const testResultType = watch('testResultType');

    return (
        <main className="flex flex-col items-center bg-gray-100 w-full">
            <div className="bg-white shadow-md rounded px-8 py-8 my-4 w-full max-w-7xl">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input required={true}
                                   {...register('name')}
                                   className="mt-1 border border-gray-300 rounded px-2 py-1 w-full text-gray-700"
                            />
                        </div>
                        <div>
                            <label htmlFor="shortName" className="block text-sm font-medium text-gray-700">Short
                                Name
                            </label>
                            <input  required={true}
                                    {...register('shortName')}
                                    className="mt-1 border border-gray-300 rounded px-2 py-1 w-full text-gray-700"
                            />
                        </div>
                        <div>
                            <label htmlFor="testCategory" className="block text-sm font-medium text-gray-700">
                                Test Category
                            </label>
                            <div className='flex'>
                            <select
                                {...register('testCategory.name')}  required={true}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border">
                                 <option value={""}>Select Category</option>   
                                {testCategories.map((category,index) => (
                                    <option key={category.name+index} value={category.name}>{category.name}</option>
                                ))}
                            </select>
                            <button
                                        type="button"
                                        className="bg-green-500 text-white p-2 rounded ml-2"
                                        onClick={() => setModalOpen("testCategory")}
                                    >
                                        Add
                                    </button>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="testSampleType" className="block text-sm font-medium text-gray-700">
                                Test Sample Type
                            </label>
                            <select {...register('testSampleType')}  required={true}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border">
                                <option value="BLOOD">BLOOD</option>
                                <option value="URINE">URINE</option>
                                <option value="STOOL">STOOL</option>
                                <option value="RADIO">RADIO</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="testPanelCode" className="block text-sm font-medium text-gray-700">
                                Test Panel Code
                            </label>
                            <input
                                {...register('testPanelCode')}  required={true}
                                className="mt-1 border border-gray-300 rounded px-2 py-1 w-full text-gray-700"
                            />
                        </div>
                        <div>
                            <label htmlFor="testResultType" className="block text-sm font-medium text-gray-700">
                                Test Result Type
                            </label>
                            <select {...register('testResultType')}  required={true}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border">
                                <option value="BLOOD_MULTIPLE_PARAMETER">BLOOD_MULTIPLE_PARAMETER</option>
                                <option value="DOCUMENT">DOCUMENT</option>
                                <option value="MATRIX">MATRIX</option>
                            </select>
                        </div>

                    </div>
                    {testResultType === 'BLOOD_MULTIPLE_PARAMETER' && (
                        <>
                         <label className="block text-sm font-medium text-gray-700">
                                    Select Test
                                </label>
                        <div className="flex items-center">
                                    <Controller
                                    name={'testlist'}
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                        <Select
                                            className="w-full"
                                            options={(test.map((e)=>{return {value:e.id,label:e.name}}) ?? [])}
                                            isMulti
                                            value={value}
                                            onChange={(selectedOptions,selected) => {
                                                if(selected.action == 'remove-value'){
                                                    const index = testFields.findIndex((a)=>a.id == selected.removedValue?.value)
                                                    removeTest(index)
                                                }else{
                                                    const newTest = test.find((a)=>a.id == selected.option?.value)
                                                    if(newTest){
                                                      appendTest(newTest)
                                                    }
                                                }
                                                onChange(selectedOptions);
                                            }}
                                        />
                                    )}
                                    />
                                </div>
                            {testFields.map((item, index) => (
                                <div key={item.id+index} className="space-y-4 border border-slate-500 rounded-2xl p-4">
                                    <span className="font-bold">Test {index + 1}</span>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className='hidden'>
                                            <label htmlFor={`tests.${index}.id`}
                                                   className="block text-sm font-medium text-gray-700">Test ID</label>
                                            <input {...register(`tests.${index}.id`)} required={false}
                                                   className="mt-1 border border-gray-300 rounded px-2 py-1 w-full text-gray-700"/>
                                        </div>
                                        <div>
                                            <label htmlFor={`tests.${index}.code`}
                                                   className="block text-sm font-medium text-gray-700">
                                                Test Code
                                            </label>
                                            <input {...register(`tests.${index}.code`)}  required={true}
                                                   className="mt-1 border border-gray-300 rounded px-2 py-1 w-full text-gray-700"/>
                                        </div>
                                        <div>
                                            <label htmlFor={`tests.${index}.name`}
                                                   className="block text-sm font-medium text-gray-700">
                                                Test Name
                                            </label>
                                            <input {...register(`tests.${index}.name`)}  required={true}
                                                   className="mt-1 border border-gray-300 rounded px-2 py-1 w-full text-gray-700"/>
                                        </div>
                                        {(watch(`tests.${index}.subTests`) || []).length == 0 && (
                                        <div>
                                            <label htmlFor={`tests.${index}.referenceValueType`}
                                                   className="block text-sm font-medium text-gray-700">
                                                Reference Value Type
                                            </label>
                                            <select {...register(`tests.${index}.referenceValueType`)}  required={true}
                                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border">
                                                <option value="">Select Value</option>
                                                <option value="SINGLE_STRING">SINGLE_STRING</option>
                                                <option value="RANGE">RANGE</option>
                                                <option value="NONE">NONE</option>
                                            </select>
                                        </div>
                                        )}
                                    </div>
                                    {(watch(`tests.${index}.subTests`) || []).length == 0 && (
                                        <>
                                    {watch(`tests.${index}.referenceValueType`) === 'SINGLE_STRING' && (
                                        <SingleReferenceValues control={control} index={index} register={register} name={`tests.${index}`} testUnits={testUnits} setModalOpen={setModalOpen}/>
                                    )}
                                    {watch(`tests.${index}.referenceValueType`) === 'RANGE' && (
                                        <AddReferenceValues control={control} index={index} register={register} name={`tests.${index}`} testUnits={testUnits} setModalOpen={setModalOpen}/>
                                    )}
                                    </>
                                )}
                                    <AddSubTests control={control} index={index} register={register} watch={watch} name={`tests.${index}`} testUnits={testUnits} setModalOpen={setModalOpen}/>
                                    <div className="flex justify-end w-full">
                                        <button
                                            type="button" onClick={() => {
                                                const data = (watch('testlist') || []).filter((e)=>e.value !== watch(`tests.${index}.id`))
                                                setValue('testlist', data);
                                                removeTest(index)
                                            }}
                                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                        > <Icon as={DeleteIcon} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button type="button" onClick={() => appendTest({})}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add
                                Test
                            </button>
                        </>
                    )}
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="inputType" className="block text-sm font-medium text-gray-700">
                                Input Type
                            </label>
                            <input {...register('inputType')}  required={true}
                                   className="mt-1 border border-gray-300 rounded px-2 py-1 w-full text-gray-700"/>
                        </div>
                        <div>
                            <label htmlFor="method" className="block text-sm font-medium text-gray-700">Method</label>
                            <input {...register('method')}  required={true}
                                   className="mt-1 border border-gray-300 rounded px-2 py-1 w-full text-gray-700"/>
                        </div>
                        <div>
                            <label htmlFor="instrument"
                                   className="block text-sm font-medium text-gray-700">Instrument</label>
                            <input {...register('instrument')}  required={true}
                                   className="mt-1 border border-gray-300 rounded px-2 py-1 w-full text-gray-700"/>
                        </div>
                        <div>
                            <label htmlFor="cost" className="block text-sm font-medium text-gray-700">Cost</label>
                            <input {...register('cost')}  required={true} type='number'
                                   className="mt-1 border border-gray-300 rounded px-2 py-1 w-full text-gray-700"/>
                        </div>
                        <div>
                            <label htmlFor="interpretation"
                                   className="block text-sm font-medium text-gray-700">Interpretation</label>
                            <input {...register('interpretation')}  required={true}
                                   className="mt-1 border border-gray-300 rounded px-2 py-1 w-full text-gray-700"/>
                        </div>
                    </div>

                    {testResultType === 'MATRIX' && (
                        <MatrixTemplate register={register} control={control}/>
                    )}
                    <button type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add
                        Test Panel
                    </button>
                </form>
            </div>
            {open.show && (
                <AddNewPossibleValueModal
                    closeModal={()=>setOpen({show:false,type:''})}
                    getReferenceValues={()=>open.type == 'unit' ? getTestUnits() : getTestCategories()}
                    title={open.type == 'unit' ? 'Test Unit' : 'Test Category'}
                    apiFunction={open.type == 'unit' ? 'addTestUnits' : 'addTestCategories'}
                />
            )}
        </main>

    );
};

const MatrixTemplate = ({register, control}) => {
    const {setValue} = useForm();
    const {fields: columnFields, append: appendColumn, remove: removeColumn} = useFieldArray({
        control,
        name: 'matrixTestReportTemplate.columns'
    });
    const {fields: columnStyleFields, append: appendColumnStyle, remove: removeColumnStyle} = useFieldArray({
        control,
        name: 'matrixTestReportTemplate.columnStyles'
    });

    return (
        <div>
            <input type="hidden" {...register('matrixTestReportTemplate.report_type')}
                   value="MatrixTestReportTemplate"/>
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <label htmlFor="matrixTestReportTemplate.primarySampleType"
                           className="block text-sm font-medium text-gray-700">Primary Sample Type</label>
                    <input {...register('matrixTestReportTemplate.primarySampleType')}  required={true}
                           className="mt-1 border border-gray-300 rounded px-2 py-1 w-full text-gray-700"/>
                </div>
                <div>
                    <label htmlFor="matrixTestReportTemplate.description"
                           className="block text-sm font-medium text-gray-700">Description</label>
                    <input {...register('matrixTestReportTemplate.description')}  required={true}
                           className="mt-1 border border-gray-300 rounded px-2 py-1 w-full text-gray-700"/>
                </div>
                <div>
                    <label htmlFor="matrixTestReportTemplate.testReportDate"
                           className="block text-sm font-medium text-gray-700">Test Report Date</label>
                    <input {...register('matrixTestReportTemplate.testReportDate')} type='date'  required={true}
                           className="mt-1 border border-gray-300 rounded px-2 py-1 w-full text-gray-700"/>
                </div>
            </div>
            <div>
                <div className="mt-5">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-base font-semibold leading-6 text-gray-900">Columns</h1>
                        </div>
                        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                            <button type="button" onClick={() => {
                                appendColumn({})
                            }} className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add Column</button>
                        </div>
                    </div>
                    <div className="my-3 flow-root px-4 sm:px-6 lg:px-8">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle px-1">
                                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">columnKey</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">columnValue</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">columnName</th>
                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">width</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">backgroundColor</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">textColor</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">alignment</th>
                                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6"/>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                        {columnFields.map((column, columnIndex) => (
                                            <tr key={columnIndex} className="">
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                    <input {...register(`matrixTestReportTemplate.columns.${columnIndex}.inputKey`)}  required={true}
                                                           className="mt-1 border border-gray-300 rounded px-2 py-1 w-full text-gray-700"/>
                                                </td>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                    <input {...register(`matrixTestReportTemplate.columns.${columnIndex}.inputComment`)}  required={true}
                                                           className="mt-1 border border-gray-300 rounded px-2 py-1 w-full text-gray-700"/>
                                                </td>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                    <input
                                                        {...register(`matrixTestReportTemplate.columns.${columnIndex}.inputName`)}
                                                        required={true}
                                                        className="mt-1 border border-gray-300 rounded px-2 py-1 w-full text-gray-700"
                                                    />
                                                </td>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                    <input {...register(`matrixTestReportTemplate.columns.${columnIndex}.width`)} type='number'  required={true}
                                                           className="mt-1 border border-gray-300 rounded px-2 py-1 w-full text-gray-700"/>
                                                </td>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                    <input {...register(`matrixTestReportTemplate.columns.${columnIndex}.backgroundColor`)}  required={true}
                                                           className="mt-1 border border-gray-300 rounded px-2 py-1 w-full text-gray-700"/>
                                                </td>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                    <input {...register(`matrixTestReportTemplate.columns.${columnIndex}.textColor`)}  required={true}
                                                           className="mt-1 border border-gray-300 rounded px-2 py-1 w-full text-gray-700"/>
                                                </td>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                    <input {...register(`matrixTestReportTemplate.columns.${columnIndex}.alignment`)}  required={true}
                                                           className="mt-1 border border-gray-300 rounded px-2 py-1 w-full text-gray-700"/>
                                                </td>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                    <button type="button" onClick={() => removeColumn(columnIndex)}
                                                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                                        <Icon as={DeleteIcon} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTestPanel;