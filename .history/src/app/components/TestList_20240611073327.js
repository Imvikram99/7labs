'use client';

import React, { useState, useEffect } from 'react';
import { specificApis } from '../data/SpecificApis'; // Import API handling class

export default function TestList() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 w-full">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-4xl">
        <h1 className="text-xl font-bold text-gray-700 mb-4">Test List</h1>
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
              </tr>
            </thead>
            <tbody>
              {tests.map((test, index) => (
                <tr key={index} className="bg-gray-50 hover:bg-gray-100">
                  <td className="border px-4 py-2">{test.name}</td>
                  <td className="border px-4 py-2">{test.code}</td>
                  <td className="border px-4 py-2">{test.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
