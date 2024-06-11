'use client';

import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const InvoicePDF = ({ invoice }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(`Invoice for ${invoice.customer.name}`, 10, 10);
    doc.text(`Invoice date: ${invoice.date}`, 10, 20);

    const tableData = invoice.products.map(product => [
      product.name,
      product.quantity,
      product.price,
      product.taxRate,
      product.quantity * product.price,
      (product.quantity * product.price) * product.taxRate,
    ]);

    doc.autoTable({
      head: ['Product', 'Quantity', 'Price', 'Tax Rate', 'Total Price', 'Total Tax'],
      body: tableData,
      startY: 30,
    });

    doc.save(`invoice-${invoice.id}.pdf`);
  };

  return <button onClick={generatePDF}>Generate PDF</button>;
};

export default InvoicePDF;
