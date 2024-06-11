'use client';

import React, { useState } from 'react';
import InvoiceData from './InvoiceData';
import InvoicePDF from './InvoicePDF';

export default function NewBill() {
  const [customerName, setCustomerName] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [products, setProducts] = useState([
    { name: '', quantity: 0, price: 0, taxRate: 0 },
  ]);

  const handleCustomerNameChange = (event) => {
    setCustomerName(event.target.value);
  };

  const handleInvoiceDateChange = (event) => {
    setInvoiceDate(event.target.value);
  };

  const handleProductChange = (index, field, value) => {
    const newProducts = [...products];
    newProducts[index][field] = value;
    setProducts(newProducts);
  };

  const handleAddProduct = () => {
    setProducts([...products, { name: '', quantity: 0, price: 0, taxRate: 0 }]);
  };

  const handleRemoveProduct = (index) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
  };

  const customer = { name: customerName };
  const invoice = { date: invoiceDate, products };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-green-100 w-full">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-4xl">
        // Form content here
      </form>
      <div className="bg-blue-100 p-4 w-full">
        <InvoiceData customer={customer} invoice={invoice} />
      </div>
      <div className="bg-red-500 p-4 w-full mt-4">
        <InvoicePDF customer={customer} invoice={invoice} />
      </div>
    </main>
  );
}
