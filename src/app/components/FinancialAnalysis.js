'use client';

import React, { useState, useEffect } from 'react';
import { specificApis } from '../data/SpecificApis'; // Import API handling class

export default function FinancialAnalysis() {
  const [financialData, setFinancialData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFinancialData() {
      try {
        const fetchedData = await specificApis.analyzeFinances();
        setFinancialData(fetchedData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to analyze finances:', error);
        setLoading(false);
      }
    }

    fetchFinancialData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 w-full">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-4xl">
        <h1 className="text-xl font-bold text-gray-700 mb-4">Financial Analysis</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left text-gray-600">Month</th>
                <th className="px-4 py-2 text-left text-gray-600">Revenue</th>
                <th className="px-4 py-2 text-left text-gray-600">Expenses</th>
                <th className="px-4 py-2 text-left text-gray-600">Profit</th>
              </tr>
            </thead>
            <tbody>
              {financialData.map((item, index) => (
                <tr key={index} className="bg-gray-50 hover:bg-gray-100">
                  <td className="border px-4 py-2">{item.month}</td>
                  <td className="border px-4 py-2">{item.revenue}</td>
                  <td className="border px-4 py-2">{item.expenses}</td>
                  <td className="border px-4 py-2">{item.profit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
