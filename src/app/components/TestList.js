import React, {useState, useEffect} from 'react';
import {specificApis} from '../data/SpecificApis';
import AddTestModal from './AddTestModal';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCancel, faCheck, faEdit, faList} from "@fortawesome/free-solid-svg-icons";

export default function TestItem() {
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editTestId, setEditTestId] = useState(null);
    const [editFormData, setEditFormData] = useState({});

    useEffect(() => {
        fetchTests();
    }, []);

    async function fetchTests() {
        try {
            const fetchedTests = await specificApis.fetchTestList();
            setTests(fetchedTests);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch tests:', error);
            setLoading(false);
        }
    }

    const openAddModal = () => {
        setAddModalOpen(true);
    };

    const handleEditClick = (test) => {
        setEditTestId(test.id);
        setEditFormData(test);
    };

    const handleCancel = () => {
        setEditTestId(null);
    };

    const handleChange = (e, field) => {
        setEditFormData({...editFormData, [field]: e.target.value});
    };

    const handleSave = async (id) => {
        try {
            await specificApis.updateTest(editFormData);
            const newTests = tests.map(test => (test.id === id ? {...test, ...editFormData} : test));
            setTests(newTests);
            setEditTestId(null);
        } catch (error) {
            console.error('Error updating test:', error);
        }
    };
    const handleAddTest = async (testDetails) => {
        return new Promise((resolve, reject)=> {
            specificApis.addTest(testDetails).then((response)=>{
                resolve(response)
                fetchTests();
                setAddModalOpen(false);
            }).catch((err)=> {
                reject(err)
            })
        })
    };

    return (
        <div className="max-w-7xl mx-auto">
            <h6 className="uppercase font-extrabold text-xl text-white"><FontAwesomeIcon icon={faList}/> | Test List
            </h6>
            <hr/>
            <div className="card">
                {addModalOpen ? (
                    <AddTestModal onClose={() => setAddModalOpen(false)} onSave={handleAddTest}/>
                ) : (
                    <div className="card-body">
                        <button onClick={openAddModal}
                                className="mb-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded float-end">Add
                            Test
                        </button>
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <table className="table-auto w-full">
                                <thead>
                                <tr>
                                    <th>Test Name</th>
                                    <th>Test Code</th>
                                    <th>Department</th>
                                    <th>Sample Type</th>
                                    <th>Cost</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {tests.map((test) => (
                                    <tr key={test.id}>
                                        {editTestId === test.id ? (
                                            <>
                                                <td><input className="border-white" type="text" name="name"
                                                           placeholder="Name"
                                                           value={editFormData.name}
                                                           onChange={(e) => handleChange(e, 'name')}/>
                                                </td>
                                                <td><input className="border-white" type="text" name="code"
                                                           value={editFormData.code}
                                                           onChange={(e) => handleChange(e, 'code')}/>
                                                </td>
                                                <td><input className="border-white" type="text" name="department"
                                                           value={editFormData.department}
                                                           onChange={(e) => handleChange(e, 'department')}/>
                                                </td>
                                                <td><input className="border-white" type="text" name="sampleType"
                                                           value={editFormData.sampleType}
                                                           onChange={(e) => handleChange(e, 'sampleType')}/>
                                                </td>
                                                <td><input className="border-white" type="text" name="cost"
                                                           value={editFormData.cost}
                                                           onChange={(e) => handleChange(e, 'cost')}/>
                                                </td>
                                                <td>
                                                    <FontAwesomeIcon className="f-aw-save me-1" icon={faCheck}
                                                                     onClick={() => handleSave(test.id)}/>
                                                    <FontAwesomeIcon className="f-aw-cancel" icon={faCancel}
                                                                     onClick={handleCancel}/>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td>{test.name}</td>
                                                <td>{test.code}</td>
                                                <td>{test.department}</td>
                                                <td>{test.sampleType}</td>
                                                <td>{test.cost}</td>
                                                <td>
                                                    <FontAwesomeIcon className="f-aw-edit me-1" icon={faEdit}
                                                                     onClick={() => handleEditClick(test)}/>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
