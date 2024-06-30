import React from 'react';
import {Icon} from "@chakra-ui/react";
import {DeleteIcon} from "@chakra-ui/icons";
import {useFieldArray, useForm} from "react-hook-form";
import MatrixBody from "./MatrixBody";

const TestResultMatrixColumns = ({
    columnFields,
    removeColumn,
    control
}) => {
    const {register,watch} = useForm();
    return (
        <div className="my-3 flow-root px-4 sm:px-6 lg:px-8">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle px-1">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                        {columnFields.map((column, columnIndex) => (
                            <MatrixBody
                                column={column}
                                control={control}
                                columnIndex={columnIndex}
                                register={register}
                                removeColumn={removeColumn}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
        ;
};

export default TestResultMatrixColumns;