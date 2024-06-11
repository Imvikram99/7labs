import React from 'react';

const InvoiceData = ({ invoice }) => {
  return (
    <div>
      <h2>{invoice.customer.name}</h2>
      <p>Invoice date: {invoice.date}</p>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Tax Rate</th>
            <th>Total Price</th>
            <th>Total Tax</th>
          </tr>
        </thead>
        <tbody>
          {invoice.products.map(product => (
            <tr key={product.name}>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
              <td>{product.taxRate}</td>
              <td>{product.quantity * product.price}</td>
              <td>{(product.quantity * product.price) * product.taxRate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceData;
