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
  const invoice = { date: invoiceDate, products };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form>
        <label>
          Customer Name:
          <input type="text" value={customerName} onChange={handleCustomerNameChange} />
        </label>
        <label>
          Invoice Date:
          <input type="date" value={invoiceDate} onChange={handleInvoiceDateChange} />
        </label>
        {products.map((product, index) => (
          <div key={index}>
            <label>
              Product Name:
              <input
                type="text"
                value={product.name}
                onChange={(event) => handleProductChange(index, 'name', event.target.value)}
              />
            </label>
            <label>
              Quantity:
              <input
                type="number"
                value={product.quantity}
                onChange={(event) => handleProductChange(index, 'quantity', event.target.value)}
              />
            </label>
            <label>
              Price:
              <input
                type="number"
                value={product.price}
                onChange={(event) => handleProductChange(index, 'price', event.target.value)}
              />
            </label>
            <label>
              Tax Rate:
              <input
                type="number"
                value={product.taxRate}
                onChange={(event) => handleProductChange(index, 'taxRate', event.target.value)}
              />
            </label>
            <button type="button" onClick={() => handleRemoveProduct(index)}>
              Remove Product
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddProduct}>
          Add Product
        </button>
      </form>
      <InvoiceData customer={customer} invoice={invoice} />
      {/* <InvoicePDF customer={customer} invoice={invoice} /> */}
    </main>
  );
}
