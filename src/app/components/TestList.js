import React, {useState, useEffect} from 'react';
import {specificApis} from '../data/SpecificApis';
import AddTestModal from './AddTestModal';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCancel, faCheck, faEdit, faL, faList} from "@fortawesome/free-solid-svg-icons";

export default function TestItem() {
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editTestId, setEditTestId] = useState(false);
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
        openAddModal()
    };

    const handleCancel = () => {
        setAddModalOpen(false)
        setEditTestId(false);
        setEditFormData({});
    };

    const handleSave = async (testDetails) => {
        try {
            await specificApis.updateTest({...testDetails,id:editTestId});
            handleCancel();
            fetchTests()
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
                    <AddTestModal onClose={() => handleCancel()} onSave={editTestId ? handleSave : handleAddTest} data={editFormData} isEdit={editTestId}/>
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
                                                <td>{test.name}</td>
                                                <td>{test.code}</td>
                                                <td>{test.department}</td>
                                                <td>{test.sampleType}</td>
                                                <td>{test.cost}</td>
                                                <td>
                                                    <FontAwesomeIcon className="f-aw-edit me-1" icon={faEdit}
                                                                     onClick={() => handleEditClick(test)}/>
                                                </td>
                                       
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
