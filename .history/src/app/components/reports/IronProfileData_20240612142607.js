import jsPDF from 'jspdf';
import 'jspdf-autotable';

const generatePDF = (ironProfileData) => {
  const doc = new jsPDF();

  // Add header
  doc.setFontSize(20);
  doc.text('Iron Profile Report', 10, 10);

  // Add patient details
  doc.setFontSize(12);
  doc.text(`Patient Name: ${ironProfileData.patientName}`, 10, 30);
  doc.text(`Age: ${ironProfileData.age}`, 10, 40);
  doc.text(`Gender: ${ironProfileData.gender}`, 10, 50);

  // Add table
  const tableData = Object.entries(ironProfileData.results).map(([key, value]) => [key, value]);
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

  doc.save(`iron-profile-${ironProfileData.patientName}.pdf`);
};

// Example usage
const ironProfileData = {
  patientName: 'Jane Doe',
  age: 35,
  gender: 'Female',
  results: {
    'Serum Iron': '80 µg/dL',
    'Total Iron Binding Capacity (TIBC)': '300 µg/dL',
    'Serum Ferritin': '100 ng/mL',
    'Transferrin Saturation (TSAT)': '30%',
    'Serum Transferrin': '200 mg/dL',
    'Serum Transferrin Receptor (TfR)': '10 mg/L',
  },
};

generatePDF(ironProfileData);
