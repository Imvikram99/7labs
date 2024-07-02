import React, {useState} from 'react';
import {specificApis} from "../../../data/SpecificApis";

const AddNewPossibleValueModal = ({closeModal,getReferenceValues,title,apiFunction}) => {
    const [name,setValue] = useState("");
    const [error,setError] = useState("");

    const crateNewPossibleValue = () => {
        if (name) {
            specificApis[apiFunction]({name}).then(()=> {
                getReferenceValues()
                closeModal()
            });
        } else {
            setError("Please enter a name");
        }
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded p-4 max-w-lg w-full">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Add New {title}</h3>
                    <button onClick={closeModal} className="text-gray-700">
                        Close
                    </button>
                </div>
                <div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700">
                               {title}
                            </label>
                            <input
                                name="sampleCollector"
                                className="border border-gray-300 rounded p-2 w-full text-gray-700"
                                onChange={(event)=>setValue(event.target.value)}
                            />
                            {error && <span className="text-red-600 mt-2">{error}</span>}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end mt-4">
                    <button
                        type="button"
                        className="bg-green-500 text-white p-2 rounded mr-2"
                        onClick={() => crateNewPossibleValue()}
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        className="bg-gray-300 text-gray-700 p-2 rounded"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddNewPossibleValueModal;