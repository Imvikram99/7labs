import React, {useState} from 'react';

function AddTestModal({isOpen, onClose, onSave}) {
    const [testDetails, setTestDetails] = useState({
        name: '',
        code: '',
        department: '',
        sampleType: '',
        cost: ''
    });

    const handleChange = (e) => {
        setTestDetails({...testDetails, [e.target.name]: e.target.value});
    };

    const handleSubmit = () => {
        onSave(testDetails); // Corrected variable name here
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold text-gray-700 mb-4">Add New Test</h2>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}>
                    <label className="block text-sm mb-2 text-gray-700">Test Name:</label>
                    <input type="text" name="name" placeholder="Test Name"
                           className="w-full mb-2"
                           onChange={handleChange} value={testDetails.name}/>

                    <label className="block text-sm mb-2 text-gray-700">Test Code:</label>
                    <input type="text" name="code" placeholder="Test Code"
                           className="w-full mb-2"
                           onChange={handleChange} value={testDetails.code}/>

                    <label className="block text-sm mb-2 text-gray-700">Department:</label>
                    <input type="text" name="department" placeholder="Department"
                           className="w-full mb-2"
                           onChange={handleChange} value={testDetails.department}/>

                    <label className="block text-sm mb-2 text-gray-700">Sample Type:</label>
                    <input type="text" name="sampleType" placeholder="Sample Type"
                           className="w-full mb-2"
                           onChange={handleChange} value={testDetails.sampleType}/>

                    <label className="block text-sm mb-2 text-gray-700">Cost:</label>
                    <input type="text" name="cost" placeholder="Cost"
                           className="w-full mb-2"
                           onChange={handleChange} value={testDetails.cost}/>

                    <div className="flex justify-between items-center mt-4">
                        <button type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">Save
                            Test
                        </button>
                        <button type="button" onClick={onClose}
                                className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddTestModal;
