'use client';

import React from 'react';
import Link from 'next/link';
import RegisterCustomer from './components/RegisterCustomer';
import NewBill from './components/NewBill'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Invoice Generator</h1>
        <ul className="list-disc pl-4">
          <li className="mb-2">
            <RegisterCustomer />
          </li>
          <li className="mb-2">
          {/* <Link href="/new-bill" className="text-blue-500 hover:text-blue-700">
  Create New Bill
</Link> */}
<NewBill/>

          </li>
        </ul>
      </div>
    </main>
  );
}
