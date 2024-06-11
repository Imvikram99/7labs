'use client';

import React, { useState, useEffect } from 'react';
import { specificApis } from '../data/SpecificApis'; // Import API handling class

export default function VerifyReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      try {
        const fetchedReports = await specificApis.verifyReports();
        setReports(fetchedReports);
        setLoading(false);
      } catch (error) {
        console.error('Failed to verify reports:', error);
        setLoading(false);
      }
    }

    fetchReports();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 w-full">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-4xl">
        <h1 className="text-xl font-bold text-gray-700 mb-4">Verify Reports</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left text-gray-600">Report ID</th>
                <th className="px-4 py-2 text-left text-gray-600">Status</th>
                <th className="px-4 py-2 text-left text-gray-600">Details</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr key={index} className="bg-gray-50 hover:bg-gray-100">
                  <td className="border px-4 py-2">{report.id}</td>
                  <td className="border px-4 py-2">{report.status}</td>
                  <td className="border px-4 py-2">{report.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
