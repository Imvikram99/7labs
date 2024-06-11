'use client';

import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const InvoicePDF = ({ customer, invoice }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(`Invoice for ${customer.name}`, 10, 10);
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
      head: [['Product', 'Quantity', 'Price', 'Tax Rate', 'Total Price', 'Total Tax']],
      body: tableData,
      startY: 30,
      styles: {
        fontSize: 8,
        cellPadding: 2,
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        lineColor: [0, 0, 0],
        lineWidth: 0.1,
        overflow: 'linebreak',
        halign: 'left',
        valign: 'middle',
        fontStyle: 'normal',
      },
      headStyles: {
        fillColor: [200, 200, 200],
        textColor: [0, 0, 0],
        fontStyle: 'bold',
      },
    });

    doc.save(`invoice-${invoice.id}.pdf`);
  };

  return <button onClick={generatePDF}>Generate PDF</button>;
};

export default InvoicePDF;
