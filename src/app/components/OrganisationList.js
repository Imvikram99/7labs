'use client';

import React, { useState, useEffect } from 'react';
import { specificApis } from '../data/SpecificApis'; // Import API handling class

export default function OrganisationList() {
  const [organisations, setOrganisations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrganisations() {
      try {
        const fetchedOrganisations = await specificApis.fetchOrganisationList();
        setOrganisations(fetchedOrganisations);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch organisations:', error);
        setLoading(false);
      }
    }

    fetchOrganisations();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 w-full">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-4xl">
        <h1 className="text-xl font-bold text-gray-700 mb-4">Organisation List</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left text-gray-600">Organisation Name</th>
                <th className="px-4 py-2 text-left text-gray-600">Contact</th>
                <th className="px-4 py-2 text-left text-gray-600">Address</th>
              </tr>
            </thead>
            <tbody>
              {organisations.map((org, index) => (
                <tr key={index} className="bg-gray-50 hover:bg-gray-100">
                  <td className="border px-4 py-2">{org.name}</td>
                  <td className="border px-4 py-2">{org.contact}</td>
                  <td className="border px-4 py-2">{org.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
