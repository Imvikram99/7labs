import jsPDF from 'jspdf';
import 'jspdf-autotable';

const generatePDF = (malariaAntigenTestData) => {
  const doc = new jsPDF();

  // Add header
  doc.setFontSize(20);
  doc.text('Malaria Antigen Test Report', 10, 10);

  // Add patient details
  doc.setFontSize(12);
  doc.text(`Patient Name: ${malariaAntigenTestData.patientName}`, 10, 30);
  doc.text(`Age: ${malariaAntigenTestData.age}`, 10, 40);
  doc.text(`Gender: ${malariaAntigenTestData.gender}`, 10, 50);

  // Add table
  const tableData = Object.entries(malariaAntigenTestData.results).map(([key, value]) => [key, value]);
  const tableHeaders = [['Test', 'Result']];
  const tableBody = [...tableHeaders, ...tableData];

  doc.autoTable({
    head: tableHeaders,
    body: tableBody,
    startY: 60,
    styles: {
      fontSize: 12,
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
      fillColor: [100, 400, 200],
      textColor: [0, 70, 0],
      fontStyle: 'bold',
    },
  });

  // Add footer
  const footerText = 'Generated by Your Clinic Name';
  const footerY = doc.internal.pageSize.height - 20;
  const footerX = doc.internal.pageSize.width / 2;
  doc.setFontSize(10);
  doc.text(footerText, footerX, footerY, { align: 'center' });

  doc.save(`malaria-antigen-test-${malariaAntigenTestData.patientName}.pdf`);
};

// Example usage
const malariaAntigenTestData = {
  patientName: 'Jane Doe',
  age: 40,
  gender: 'Female',
  results: {
    'Malaria Antigen': 'Negative',
  },
};

generatePDF(malariaAntigenTestData);
