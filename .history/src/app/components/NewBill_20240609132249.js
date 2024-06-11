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
<main className="flex min-h-screen flex-col items-center justify-center bg-green-100 w-full ml-60">     
 <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg">
        <div className="mb-4">
          <label className="block text-green-700 text-sm font-bold mb-2" htmlFor="customerName">
            Customer Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="customerName"
            type="text"
            value={customerName}
            onChange={handleCustomerNameChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="invoiceDate">
            Invoice Date:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="invoiceDate"
            type="date"
            value={invoiceDate}
            onChange={handleInvoiceDateChange}
          />
        </div>
        {products.map((product, index) => (
          <div key={index} className="mb-4 flex items-center">
            <div className="grid grid-cols-4 gap-4 flex-grow">
              <div>
                <label className="block text-green-700 text-sm font-bold mb-2" htmlFor={`productName-${index}`}>
                  Product:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={`productName-${index}`}
                  type="text"
                  value={product.name}
                  onChange={(event) => handleProductChange(index, 'name', event.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`quantity-${index}`}>
                  Quantity:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={`quantity-${index}`}
                  type="number"
                  value={product.quantity}
                  onChange={(event) => handleProductChange(index, 'quantity', event.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`price-${index}`}>
                  Price:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={`price-${index}`}
                  type="number"
                  value={product.price}
                  onChange={(event) => handleProductChange(index, 'price', event.target.value)}
                />
              </div>
              <div>
                <label className="block text-red-700 text-sm font-bold mb-2" htmlFor={`taxRate-${index}`}>
                  Tax Rate:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={`taxRate-${index}`}
                  type="number"
                  value={product.taxRate}
                  onChange={(event) => handleProductChange(index, 'taxRate', event.target.value)}
                />
              </div>
            </div>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
              type="button"
              onClick={() => handleRemoveProduct(index)}
            >
              -
            </button>
          </div>
        ))}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleAddProduct}
        >
          +
        </button>
      </form>
      <div className="bg-blue-100 p-4">
  <InvoiceData customer={customer} invoice={invoice} />
</div>
<div className="bg-red-500 p-4 mt-4">
  <InvoicePDF customer={customer} invoice={invoice} />
</div>
    </main>
  );
}
