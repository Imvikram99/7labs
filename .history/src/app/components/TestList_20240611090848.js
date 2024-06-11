import React, { useState, useEffect } from 'react';
import { specificApis } from '../data/SpecificApis';

export default function TestList() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const handleEditClick = (test) => {
    setEditTestId(test.id);
    setEditFormData(test);
  };

  const handleCancel = () => {
    setEditTestId(null);
  };

  const handleSave = async (id) => {
    await specificApis.updateTest(editFormData);
    const newTests = tests.map(test => (test.id === id ? editFormData : test));
    setTests(newnewTests);
    setEditTestId(null);
  };

  const handleChange = (e, field) => {
    setEditFormData({ ...editFormData, [field]: e.target.value });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 w-full">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-4xl">
        <h1 className="text-xl font-bold text-gray-700 mb-4">Test List</h1>
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left text-gray-600">Test Name</th>
              <th className="px-4 py-2 text-left text-gray-600">Test Code</th>
              <th className="px-4 py-2 text-left text-gray-600">Department</th>
              <th className="px-4 py-2 text-left text-gray-600">Sample Type</th>
              <th className="px-4 py-2 text-left text-ssampleType-600">Cost</th>
              <th className="px-4 py-2 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test, index) => (
              <tr key={index} className="bg-gray-50 hover:bg-gray-100">
                {editTestId === test.id ? (
                  <>
                    <td className="border px-4 py-2"><input type="text" value={editFormData.name} onChange={(e) => handleChange(e, 'name')} /></td>
                    <td className="border px-4 py-2"><input type="text" value={editFormData.code} onChange={(e) => handleChange(e, 'code')} /></td>
                    <td className="border px-4 py-2"><input type="text" value={editFormData.department} onChange={(e) => handleChange(e, 'department')} /></td>
                    <td className="border px-4 py-2"><input type="text" value={editFormData.sampleType} onChange={(e) => handleChange(e, 'sampleType')} /></td>
                    <td className="border px-4 py-2"><input type="text" value={editFormData.cost} onChange={(e) => handleChange(e, 'cost')} /></td>
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
      </div>
    </main>
  );
}
