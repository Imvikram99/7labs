'use client';

import React, { useState } from 'react';
import InvoiceData from './components/InvoiceData';
import InvoicePDF from './components/InvoicePDF';

export default function Home() {
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
  const invoice = { id: 1, customer, date: invoiceDate, products };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form>
        {/* form fields and event handlers here */}
      </form>
      <InvoiceData invoice={invoice} />
      <InvoicePDF invoice={invoice} />
    </main>
  );
}
