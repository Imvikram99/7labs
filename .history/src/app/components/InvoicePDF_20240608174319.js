'use client';

import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const InvoicePDF = ({ customer, invoice }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add header
    doc.setFontSize(16);
    doc.text('Service Provider Name', 10, 10);
    doc.setFontSize(12);
    doc.text('Service Provider Address', 10, 20);
    doc.text('Service Provider Phone', 10, 30);
    doc.text('Service Provider Email', 10, 40);

    // Add customer details
    doc.setFontSize(16);
    doc.text('Customer Details', 10, 50);
    doc.setFontSize(12);
    doc.text(`Name: ${customer.name}`, 10, 60);
    doc.text(`Address: ${customer.address}`, 10, 70);
    doc.text(`Phone: ${customer.phone}`, 10, 80);
    doc.text(`Email: ${customer.email}`, 10, 90);

    // Add table
    const tableData = invoice.products.map(product => [
      product.name,
      product.quantity,
      product.price,
      product.taxRate,
      product.quantity * product.price,
      (product.quantity * product.price) * product.taxRate,
    ]);

    const tableHeaders = [['Product', 'Quantity', 'Price', 'Tax Rate', 'Total Price', 'Total Tax']];
    const tableBody = [...tableHeaders, ...tableData];

    doc.autoTable({
      head: tableHeaders,
      body: tableBody,
      startY: 100,
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
      foot: [['', '', '', '', 'Total:', invoice.products.reduce((total, product) => total + product.quantity * product.price, 0)]],
      footStyles: {
        fillColor: [200, 200, 200],
        textColor: [0, 0, 0],
        fontStyle: 'bold',
      },
    });

    // Add footer
    const footerText = 'Return policy: ...';
    const footerY = doc.internal.pageSize.height - 20;
    const footerX = doc.internal.pageSize.width / 2;
    doc.setFontSize(10);
    doc.text(footerText, footerX, footerY, { align: 'center' });

    doc.save(`invoice-${invoice.id}.pdf`);
  };

  return <button onClick={generatePDF}>Generate PDF</button>;
};

export default InvoicePDF;
