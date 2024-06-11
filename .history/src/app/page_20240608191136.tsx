'use client';

import React, { useState } from 'react';
import RegisterCustomer from './components/RegisterCustomer';
import NewBill from './components/NewBill';

export default function Home() {
  const [showRegisterCustomer, setShowRegisterCustomer] = useState(false);
  const [showNewBill, setShowNewBill] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Invoice Generator</h1>
        <div className="mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            onClick={() => setShowRegisterCustomer(true)}
          >
            Register New Customer
          </button>
        </div>
        <div className="mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            onClick={() => setShowNewBill(true)}
          >
            Create New Bill
          </button>
        </div>
      </div>
      {showRegisterCustomer && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center overflow-y-auto">
          <div className="bg-white rounded px-8 pt-6 pb-8 w-full max-w-lg">
            <div className="mb-4">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setShowRegisterCustomer(false)}
              >
                Back
              </button>
            </div>
            <RegisterCustomer />
          </div>
        </div>
      )}
      {showNewBill && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center overflow-y-auto">
          <div className="bg-white rounded px-8 pt-6 pb-8 w-full max-w-lg">
            <div className="mb-4">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setShowNewBill(false)}
              >
                Back
              </button>
            </div>
            <NewBill />
          </div>
        </div>
      )}
    </main>
  );
}
