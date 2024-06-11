import React from 'react';

const InvoiceData = ({ customer, invoice }) => {
  // Calculate the total price and total tax
  const totalPrice = invoice.products.reduce((acc, product) => acc + (product.quantity * product.price), 0);
  const totalTax = invoice.products.reduce((acc, product) => acc + ((product.quantity * product.price) * product.taxRate / 100), 0);

  return (
    <div className="text-gray-700 font-sans">
      <h2 className="text-blue-500">{customer.name}</h2>
      <p className="text-gray-600">Invoice date: {invoice.date}</p>
      <table className="table-auto w-full mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Product</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Tax Rate</th>
            <th className="px-4 py-2">Total Price</th>
            <th className="px-4 py-2">Total Tax</th>
            <th className="px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.products.map((product, index) => (
            <tr key={product.name} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">{product.quantity}</td>
              <td className="border px-4 py-2">{product.price}</td>
              <td className="border px-4 py-2">{product.taxRate}%</td>
              <td className="border px-4 py-2">{product.quantity * product.price}</td>
              <td className="border px-4 py-2">{(product.quantity * product.price) * product.taxRate / 100}</td>
              <td className="border px-4 py-2">{(product.quantity * product.price) + ((product.quantity * product.price) * product.taxRate / 100)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-200">
            <td className="px-4 py-2" colSpan="4">Total</td>
            <td className="border px-4 py-2">{totalPrice}</td>
            <td className="border px-4 py-2">{totalTax}</td>
            <td className="border px-4 py-2">{totalPrice + totalTax}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default InvoiceData;
