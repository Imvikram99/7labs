import React, { useState, useEffect } from 'react';
import { specificApis } from '../data/SpecificApis';
import AddTestModal from './AddTestModal';

export default function TestItem() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editTestId, setEditTestId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
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
    fetchTests();
  }, []);
  const openAddModal = () => {
    console.log("Opening modal");  // Check if this is being logged
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
    setEditFormData({ ...editFormData, [field]: e.target.value });
  };

  const handleSave = async (id) => {
    try {
      await specificApis.updateTest(editFormData);
      const newTests = tests.map(test => (test.id === id ? { ...test, ...editFormData } : test));
      setTests(newTests);
      setEditTestId(null);
    } catch (error) {
      console.error('Error updating test:', error);
    }
  };
  const handleAddTest = async (testDetails) => {
    try {
      // Call the API to add the new test
      await specificApis.addTest(testDetails);
      // If the add is successful, fetch the latest list of tests
      fetchTests();
      // Close the modal upon successful addition
      setAddModalOpen(false);
    } catch (error) {
      // Log the error to the console
      console.error('Error adding test:', error);
      // Optionally, you can handle UI feedback here, such as displaying an error message to the user
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 w-full">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-4xl">
        <h1 className="text-xl font-bold text-gray-700 mb-4">Test List</h1>
        <button onClick={} className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Test</button>
        <AddTestModal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} onSave={handleAddTest} />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left text-gray-600">Test Name</th>
                <th className="px-4 py-2 text-left text-gray-600">Test Code</th>
                <th className="px-4 py-2 text-left text-gray-600">Department</th>
                <th className="px-4 py-2 text-left text-gray-600">Sample Type</th>
                <th className="px-4 py-2 text-left text-gray-600">Cost</th>
                <th className="px-4 py-2 text-left text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test) => (
                <tr key={test.id} className="bg-gray-50 hover:bg-gray-100">
                  {editTestId === test.id ? (
                    <>
                      <td className="border px-4 py-2"><input type="text" name="name" value={editFormData.name} onChange={(e) => handleChange(e, 'name')} /></td>
                      <td className="border px-4 py-2"><input type="text" name="code" value={editFormData.code} onChange={(e) => handleChange(e, 'code')} /></td>
                      <td className="border px-4 py-2"><input type="text" name="department" value={editFormData.department} onChange={(e) => handleChange(e, 'department')} /></td>
                      <td className="border px-4 py-2"><input type="text" name="sampleType" value={editFormData.sampleType} onChange={(e) => handleChange(e, 'sampleType')} /></td>
                      <td className="border px-4 py-2"><input type="text" name="cost" value={editFormData.cost} onChange={(e) => handleChange(e, 'cost')} /></td>
                      <td className="border px-4 py-2">
                        <button onClick={() => handleSave(test.id)}>Save</button>
                        <button onClick={handleCancel}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border px-4 py-2">{test.name}</td>
                      <td className="border px-4 py-2">{test.code}</td>
                      <td className="border px-4 py-2">{test.department}</td>
                      <td className="border px-4 py-2">{test.sampleType}</td>
                      <td className="border px-4 py-2">{test.cost}</td>
                      <td className="border px-4 py-2">
                        <button onClick={() => handleEditClick(test)}>Edit</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
