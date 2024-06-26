import jsPDF from 'jspdf';
import 'jspdf-autotable';

const generatePDF = (generalBloodPictureData) => {
  const doc = new jsPDF();

  // Add header
  doc.setFontSize(20);
  doc.text('General Blood Picture Report', 10, 10);

  // Add patient details
  doc.setFontSize(12);
  doc.text(`Patient Name: ${generalBloodPictureData.patientName}`, 10, 30);
  doc.text(`Age: ${generalBloodPictureData.age}`, 10, 40);
  doc.text(`Gender: ${generalBloodPictureData.gender}`, 10, 50);

  // Add table
  const tableData = Object.entries(generalBloodPictureData.results).map(([key, value]) => [key, value]);
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

  doc.save(`general-blood-picture-${generalBloodPictureData.patientName}.pdf`);
};

// Example usage
const generalBloodPictureData = {
  patientName: 'John Smith',
  age: 60,
  gender: 'Male',
  results: {
    'Hemoglobin (Hb)': '14.5 g/dL',
    'Hematocrit (Hct)': '0.45',
    'Red Blood Cells (RBC)': '5.2 million/µL',
    'Mean Corpuscular Volume (MCV)': '85 fL',
    'Mean Corpuscular Hemoglobin (MCH)': '28 pg',
    'Mean Corpuscular Hemoglobin Concentration (MCHC)': '34 g/dL',
    'Red Blood Cell Distribution Width (RDW)': '12.5%',
    'Platelets (PLT)': '250,000/µL',
    'White Blood Cells (WBC)': '8,500/µL',
    'Neutrophils (NEU)': '60%',
    'Lymphocytes (LYM)': '25%',
    'Monocytes (MONO)': '8%',
    'Eosinophils (EO)': '2%',
    'Basophils (BASO)': '1%',
  },
};

generatePDF(generalBloodPictureData);
