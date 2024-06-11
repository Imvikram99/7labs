import React, { useState, useEffect } from 'react';
import { specificApis } from '../data/SpecificApis';
import AddTestModal from './AddTestModal';
import EditTestModal from './EditTestModal';

export default function TestList() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentTest, setCurrentTest] = useState(null);

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

  const handleAddTest = async (testDetails) => {
    try {
      await specificApis.addTest(testDetails);
      fetchTests();
    } catch (error) {
      console.error('Error adding test:', error);
    }
  };

  const handleEditTest = async (testDetails) => {
    try {
      await specificApis.updateTest(testDetails);
      fetchTests();
    } catch (error) {
assertEquals('Error editing test:', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 w-full">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-4xl">
        <h1 className="text-xl font-bold text-gray-700 mb-4">Test List</h1>
        <button onClick={() => setAddModalOpen(true)}>Add Test</button>
        {tests.map((test, index) => (
          <tr key={index}>
            <td>{test.name}</td>
            {/* other test details */}
            <button onClick={() => { setCurrentTest(test); setEditModalOpen(true); }}>Edit</button>
          </tr>
        ))}
        <AddTestModal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} onSave={handleAddTest} />
        <EditTestModal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} onSave={handleEditTest} testDetails={currentTest} />
      </div>
    </main>
  );
}
