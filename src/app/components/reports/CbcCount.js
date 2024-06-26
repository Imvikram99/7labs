import jsPDF from 'jspdf';
import 'jspdf-autotable';

const generatePDF = (cbcCountData) => {
  const doc = new jsPDF();

  // Add header
  doc.setFontSize(20);
  doc.text('CBC Count Report', 10, 10);

  // Add patient details
  doc.setFontSize(12);
  doc.text(`Patient Name: ${cbcCountData.patientName}`, 10, 30);
  doc.text(`Age: ${cbcCountData.age}`, 10, 40);
  doc.text(`Gender: ${cbcCountData.gender}`, 10, 50);

  // Add table
  const tableData = Object.entries(cbcCountData.counts).map(([key, value]) => [key, value]);
  const tableHeaders = [['Parameter', 'Count']];
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

  doc.save(`cbc-count-${cbcCountData.patientName}.pdf`);
};

// Example usage
const cbcCountData = {
  patientName: 'John Doe',
  age: 30,
  gender: 'Male',
  counts: {
    'White Blood Cells (WBC)': '8.5 x 10^9/L',
    'Red Blood Cells (RBC)': '4.5 x 10^12/L',
    'Hemoglobin (Hb)': '13.5 g/dL',
    'Hematocrit (Hct)': '0.42',
    'Mean Corpuscular Volume (MCV)': '86.0 fL',
    'Mean Corpuscular Hemoglobin (MCH)': '28.0 pg',
    'Mean Corpuscular Hemoglobin Concentration (MCHC)': '33.0 g/dL',
    'Red Blood Cell Distribution Width (RDW)': '12.5%',
    'Platelets (PLT)': '250 x 10^9/L',
    'Neutrophils (NEU)': '60%',
    'Lymphocytes (LYM)': '25%',
    'Monocytes (MONO)': '8%',
    'Eosinophils (EO)': '2%',
    'Basophils (BASO)': '1%',
  },
};

generatePDF(cbcCountData);
