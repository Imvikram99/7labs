import React, { useState, useEffect } from 'react';
import { specificApis } from '../data/SpecificApis';
import AddLabCenterModal from './AddLabCenterModal';

export default function LabCenter() {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function fetchCenters() {
      try {
        const fetchedCenters = await specificApis.fetchCenters();
        setCenters(fetchedCenters);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch center information:', error);
        setLoading(false);
      }
    }

    fetchCenters();
  }, []);

  const handleAddCenter = async (centerDetails) => {
    try {
      await specificApis.addLabCenter(centerDetails);
      fetchCenters();  // Refresh list after adding
    } catch (error) {
      console.error('Error adding lab center:', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 w-full">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-4xl">
        <h1 className="text-xl font-bold text-gray-700 mb-4">Center Information</h1>
        <button onClick={() => setModalOpen(true)} className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Add Lab Center</button>
        <AddLabCenterModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSave={handleAddCenter} />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left text-gray-600">Center Name</th>
                <th className="px-4 py-2 text-left text-gray-600">Location</th>
                <th className="px-4 py-2 text-left text-gray-600">Contact</th>
              </tr>
            </thead>
            <tbody>
              {centers.map((center, index) => (
                <tr key={index} className="bg-gray-50 hover:bg-gray-100">
                  <td className="border px-4 py-2">{center.name}</td>
                  <td className="border px-4 py-2">{center.location}</td>
                  <td className="border px-4 py-2">{center.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
