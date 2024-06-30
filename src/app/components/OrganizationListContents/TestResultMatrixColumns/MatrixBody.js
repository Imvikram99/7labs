import React from 'react';
import {Icon} from "@chakra-ui/react";
import {DeleteIcon} from "@chakra-ui/icons";
import {Controller, useFieldArray} from "react-hook-form";

const MatrixBody = ({
    column,
    columnIndex,
    register,
    removeColumn,
    control
}) => {
    const [showStyles,setShowStyles] = React.useState(false);
    return (
        <div key={columnIndex}>
            <table className="min-w-full divide-y divide-gray-300">
                <tbody className="divide-y divide-gray-200 bg-white">
                <tr>
                    <h4 className="!text-black text-left">Column {columnIndex + 1}</h4>
                </tr>
                <tr key={column.id} className="">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                        colSpan={2}>
                        <span className="text-left text-sm font-semibold text-gray-900 flex w-full">
                            Column Key
                        </span>
                        <Controller
                            key={columnIndex}
                            name={`matrixTestReportTemplate.columns.${columnIndex}.inputKey`}
                            control={control}
                            render={(field) => (
                                <input
                                    required
                                    {...field}
                                    className="mt-1 border border-gray-300 rounded px-2 py-1 w-full text-gray-700"
                                />
                            )}
                        />
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        <span className="text-left text-sm font-semibold text-gray-900 flex w-full">
                            Column Value
                        </span>
                        <input
                            required="true"
                            {...register(`matrixTestReportTemplate.columns.${columnIndex}.inputComment`)}
                            className="mt-1 border border-gray-300 rounded px-2 py-1 w-full text-gray-700"
                        />
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        <span className="text-left text-sm font-semibold text-gray-900 flex w-full">
                            Column Name
                        </span>
                        <input
                            {...register(`matrixTestReportTemplate.columns.${columnIndex}.inputName`)}
                            required="true"
                            className="mt-1 border border-gray-300 rounded px-2 py-1 w-full text-gray-700"
                        />
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        <div className="flex gap-2 items-center">
                            <button
                                type="button"
                                onClick={()=> setShowStyles((prevState)=> !prevState)}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            > Add Style
                            </button>
                            <button
                                type="button"
                                onClick={() => removeColumn(columnIndex)}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            ><Icon as={DeleteIcon}/>
                            </button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
            {showStyles && (
                <table className="min-w-full divide-y divide-gray-300">
                    <tbody className="divide-y divide-gray-200 bg-white">
                    <tr>
                        <td colSpan={4}>
                            <div className="border border-gray-300 rounded p-2">
                                <h4 className="text-black text-left text-base">Add Column Styles</h4>
                                <table className="min-w-full divide-y divide-gray-300">
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                    <tr className="">
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        <span
                                            className="text-left text-sm font-semibold text-gray-900 flex w-full">
                                            Name
                                        </span>
                                            <input {...register(`matrixTestReportTemplate.columnStyles.${columnIndex}.name`)}
                                                   required="true"
                                                   className="mt-1 border border-gray-300 rounded px-2 py-1 w-full text-gray-700"/>
                                        </td>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        <span
                                            className="text-left text-sm font-semibold text-gray-900 flex w-full">
                                            width
                                        </span>
                                            <input {...register(`matrixTestReportTemplate.columnStyles.${columnIndex}.width`)}
                                                   type='number' required="true"
                                                   className="mt-1 border border-gray-300 rounded px-2 py-1 w-full text-gray-700"/>
                                        </td>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        <span
                                            className="text-left text-sm font-semibold text-gray-900 flex w-full">
                                            backgroundColor
                                        </span>
                                            <input {...register(`matrixTestReportTemplate.columnStyles.${columnIndex}.backgroundColor`)}
                                                   required="true"
                                                   className="mt-1 border border-gray-300 rounded px-2 py-1 w-full text-gray-700"/>
                                        </td>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        <span
                                            className="text-left text-sm font-semibold text-gray-900 flex w-full">
                                            textColor
                                        </span>
                                            <input {...register(`matrixTestReportTemplate.columnStyles.${columnIndex}.textColor`)}
                                                   required="true"
                                                   className="mt-1 border border-gray-300 rounded px-2 py-1 w-full text-gray-700"/>
                                        </td>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        <span
                                            className="text-left text-sm font-semibold text-gray-900 flex w-full">
                                            alignment
                                        </span>
                                            <input {...register(`matrixTestReportTemplate.columnStyles.${columnIndex}.alignment`)}
                                                   required="true"
                                                   className="mt-1 border border-gray-300 rounded px-2 py-1 w-full text-gray-700"/>
                                        </td>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                            <button
                                                type="button"
                                                onClick={()=> setShowStyles((prevState)=> !prevState)}
                                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                            ><Icon as={DeleteIcon}/>
                                            </button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MatrixBody;