'use client';

import React, { useState, useEffect } from 'react';
import { specificApis } from '../data/SpecificApis'; // Import API handling class

export default function LabProfile() {
  const [labProfile, setLabProfile] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLabProfile() {
      try {
        const fetchedLabProfile = await specificApis.fetchLabProfile();
        setLabProfile(fetchedLabProfile);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch lab profile:', error);
        setLoading(false);
      }
    }

    fetchLabProfile();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 w-full">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-4xl">
        <h1 className="text-xl font-bold text-gray-700 mb-4">Lab Profile</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left text-gray-600">Lab Name</th>
                <th className="px-4 py-2 text-left text-gray-600">Accreditation</th>
                <th className="px-4 py-2 text-left text-gray-600">Director</th>
              </tr>
            </thead>
            <tbody>
              {labProfile.map((lab, index) => (
                <tr key={index} className="bg-gray-50 hover:bg-gray-100">
                  <td className="border px-4 py-2">{lab.name}</td>
                  <td className="border px-4 py-2">{lab.accreditation}</td>
                  <td className="border px-4 py-2">{lab.director}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
