import React, { useState, useEffect } from "react";
import { FaDownload } from "react-icons/fa6";
import jsPDF from "jspdf";
import "jspdf-autotable";
import TestComponent from "./TestComponent";
// import QRCode from "qrcode";

const Modal = ({ showModal, handleClose, children }) => {
  if (!showModal) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="bg-white w-full h-full overflow-hidden shadow-xl transform transition-all">
          <div className="bg-white p-4">
            <div className="flex justify-end">
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
const AllBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const fetchBookings = async (selectedDate) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/lab/bookings?date=${selectedDate}`,
        {
          method: "GET",
          headers: {
            "X-API-KEY": "test123",
            "X-PARTNER-ID": "PYTHONMAN2",
          },
        }
      );
      const result = await response.json();
      setBookings(result);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings(date);
  }, [date]);

  const handleOpenModal = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">ALL Bookings of {date}</h1>
      <div className="flex items-center border rounded-lg overflow-hidden mb-4">
        <input
          type="date"
          value={date}
          className="w-full px-3 py-2 border-none outline-none"
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">
              {booking.patientDetails.firstName}{" "}
              {booking.patientDetails.lastName}
            </h2>
            <p className="text-gray-700">
              Patient ID: {booking.bookingSlip.patientId}
            </p>
            <p className="text-gray-700">Date: {booking.bookingSlip.date}</p>
            <p className="text-gray-700">Time: {booking.bookingSlip.time}</p>
            <button
              className="px-3 py-3 bg-gray-200 hover:bg-gray-300 text-gray-600"
              onClick={() => handleOpenModal(booking)}
            >
              <FaDownload className="text-black-500 test-2xl" />
              {/* View and Download PDF */}
            </button>
          </div>
        ))}
      </div>

      <Modal showModal={showModal} handleClose={handleCloseModal}>
        {selectedBooking && <TestComponent data={selectedBooking} />}
      </Modal>
    </div>
  );
};

export default AllBooking;
// const AllBooking = () => {
//   const [bookings, setBookings] = useState([]);
//   const [data, setData] = useState({});
//   const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

//   const fetchBookings = async (selectedDate) => {
//     try {
//       const response = await fetch(
//         `http://ec2-13-233-207-62.ap-south-1.compute.amazonaws.com:8080/api/v1/lab/bookings?date=${selectedDate}`,
//         {
//           method: "GET",
//           headers: {
//             "X-API-KEY": "test123",
//             "X-PARTNER-ID": "PYTHONMAN2",
//           },
//         }
//       );
//       const result = await response.json();
//       console.log(result, "data-----");
//       setBookings(result);
//     } catch (error) {
//       console.error("Error fetching bookings:", error);
//     }
//   };

//   useEffect(() => {
//     fetchBookings(date);
//   }, [date]);

//   const pdfData = {
//     patientName: "john ",
//     age: "21 Years",
//     sex: "Male",
//     pid: "555",
//     sampleCollectedAt: "125, Shivam Bungalow, S G Road, Mumbai",
//     refBy: "Dr. Hiren Shah",
//     registeredOn: "02:31 PM 02 Dec, 2X",
//     collectedOn: "03:11 PM 02 Dec, 2X",
//     reportedOn: "04:35 PM 02 Dec, 2X",
//     results: [
//       {
//         investigation: "Hemoglobin (Hb)",
//         result: "12.5",
//         reference: "13.0 - 17.0",
//         unit: "g/dL",
//         className: "low",
//       },
//       {
//         investigation: "Total RBC count",
//         result: "5.2",
//         reference: "4.5 - 5.5",
//         unit: "mill/cumm",
//       },
//       {
//         investigation: "Packed Cell Volume (PCV)",
//         result: "57.5",
//         reference: "40 - 50",
//         unit: "%",
//         className: "high",
//       },
//       {
//         investigation: "Mean Corpuscular Volume (MCV)",
//         result: "87.75",
//         reference: "83 - 101",
//         unit: "fL",
//       },
//       {
//         investigation: "MCH",
//         result: "27.2",
//         reference: "27 - 32",
//         unit: "pg",
//       },
//       {
//         investigation: "MCHC",
//         result: "32.8",
//         reference: "32.5 - 34.5",
//         unit: "g/dL",
//       },
//       {
//         investigation: "RDW",
//         result: "13.6",
//         reference: "11.6 - 14.0",
//         unit: "%",
//       },
//       {
//         investigation: "Total WBC count",
//         result: "9000",
//         reference: "4000-11000",
//         unit: "cumm",
//       },
//       {
//         investigation: "Neutrophils",
//         result: "60",
//         reference: "50 - 62",
//         unit: "%",
//       },
//       {
//         investigation: "Lymphocytes",
//         result: "31",
//         reference: "20 - 40",
//         unit: "%",
//       },
//       {
//         investigation: "Eosinophils",
//         result: "1",
//         reference: "00 - 06",
//         unit: "%",
//       },
//       {
//         investigation: "Monocytes",
//         result: "7",
//         reference: "00 - 10",
//         unit: "%",
//       },
//       {
//         investigation: "Basophils",
//         result: "1",
//         reference: "00 - 02",
//         unit: "%",
//       },
//       {
//         investigation: "Platelet Count",
//         result: "150000",
//         reference: "150000 - 410000",
//         unit: "cumm",
//       },
//     ],
//     interpretation: "Further confirm for Anemia",
//     generatedOn: "02 Dec, 20XX 05:00 PM",
//     technicians: [
//       { name: "Medical Lab Technician", title: "(DMLT, BMLT)" },
//       { name: "Dr. Payal Shah", title: "(MD, Pathologist)" },
//       { name: "Dr. Vimal Shah", title: "(MD, Pathologist)" },
//     ],
//   };

//   const generatePDF = async (data) => {
//     const doc = new jsPDF();

//     // Add 7Labs heading
//     doc.setFontSize(24);
//     doc.text("7Labs", 80, 20);

//     // Add title and other content

//     // Generate QR Code
//     // const qrCodeUrl = await QRCode.toDataURL(
//     //   `${data.patientDetails.firstName} ${data.patientDetails.lastName}`
//     // );
//     // doc.addImage(qrCodeUrl, "PNG", 160, 10, 50, 50);

//     // Add patient information
//     doc.setFontSize(12);
//     doc.text("Patient Information", 10, 90);
//     doc.setFontSize(10);
//     doc.text(
//       `Name: ${data.patientDetails.firstName} ${data.patientDetails.lastName}`,
//       10,
//       100
//     );
//     doc.text(`Age: ${data.patientDetails.ageInYears} Years`, 10, 110);
//     doc.text(`Sex: ${data.patientDetails.gender}`, 10, 120);
//     doc.text(`PID: ${data.patientDetails.patientId}`, 10, 130);

//     // Add sample information
//     doc.setFontSize(12);
//     doc.text("Sample Information", 100, 90);
//     doc.setFontSize(10);
//     doc.text(`Sample Collected At: ${data.bookingSlip.sampleBy}`, 100, 100);
//     doc.text(`Ref. By: ${data.bookingSlip.referralDoctorId}`, 100, 110);
//     doc.text(
//       `Registered on: ${data.bookingSlip.date} ${data.bookingSlip.time}`,
//       100,
//       120
//     );
//     doc.text(
//       `Collected on: ${data.bookingSlip.date} ${data.bookingSlip.time}`,
//       100,
//       130
//     );
//     doc.text(
//       `Reported on: ${data.bookingSlip.date} ${data.bookingSlip.time}`,
//       100,
//       140
//     );

//     // Add table
//     let y = 150;
//     for (const test of data.bookingSlip.tests) {
//       const testMasterReportTable = [
//         // Add headers
//         ["Investigation", "Result", "Reference Value", "Unit"],
//         ...test.testPanelReport.testMasterReportList.map((report) => {
//           const investigation = report.testMasterName;
//           const result = report.testReport?.result ?? "";
//           const referenceValue = report.testReport?.referenceValue ?? "";
//           const unit = report.testReport?.unit ?? "";

//           // Add test master reports
//           const testMasterReports = report.testMasterReports ?? [];
//           const testMasterReportRows = testMasterReports.map((subReport) => {
//             const subInvestigation = subReport.testMasterName;
//             const subResult = subReport.testReport?.result ?? "";
//             const subReferenceValue =
//               subReport.testReport?.referenceValue ?? "";
//             const subUnit = subReport.testReport?.unit ?? "";
//             return [subInvestigation, subResult, subReferenceValue, subUnit];
//           });

//           // Add row for current report
//           return [
//             [investigation, result, referenceValue, unit],
//             ...testMasterReportRows,
//           ];
//         }),
//       ];

//       // Check if testMasterReportTable is not empty
//       if (testMasterReportTable.length > 1) {
//         doc.setFontSize(12);
//         doc.text(test.name, 10, y);
//         doc.autoTable({
//           head: testMasterReportTable.slice(0, 1),
//           body: testMasterReportTable.slice(1),
//           startY: y + 10,
//           margin: { left: 10 },
//           theme: "striped",
//         });
//         y += 40 + (testMasterReportTable.length - 1) * 10;
//       }
//     }

//     // Add interpretation
//     doc.text(
//       "Interpretation: Further confirm for Anemia",
//       10,
//       doc.lastAutoTable.finalY + 10
//     );

//     // Add signatures
//     // doc.text("________________________", 10, doc.lastAutoTable.finalY + 30);
//     // doc.text("Medical Lab Technician", 10, doc.lastAutoTable.finalY + 40);
//     // doc.text("(DMLT, BMLT)", 10, doc.lastAutoTable.finalY + 50);

//     // doc.text("________________________", 70, doc.lastAutoTable.finalY + 30);
//     // doc.text("Dr. Payal Shah", 70, doc.lastAutoTable.finalY + 40);
//     // doc.text("(MD, Pathologist)", 70, doc.lastAutoTable.finalY + 50);

//     // doc.text("________________________", 140, doc.lastAutoTable.finalY + 30);
//     // doc.text("Dr. Vimal Shah", 140, doc.lastAutoTable.finalY + 40);
//     // doc.text("(MD, Pathologist)", 140, doc.lastAutoTable.finalY + 50);

//     // Add footer
//     doc.text(
//       `Generated on: ${data.bookingSlip.date} ${data.bookingSlip.time}`,
//       10,
//       doc.lastAutoTable.finalY + 70
//     );

//     // Save the PDF
//     doc.save("pathology-report.pdf");
//   };
//   console.log(data, "booking");
//   return (
//     <>
//       <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
//         <h1 className="text-2xl font-bold mb-4">ALL Bookings of {date}</h1>
//         <div className="flex items-center border rounded-lg overflow-hidden mb-4">
//           <input
//             type="date"
//             value={date}
//             className="w-full px-3 py-2 border-none outline-none"
//             onChange={(e) => {
//               setDate(e.target.value);
//             }}
//           />
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {bookings.map((booking) => (
//             <div key={booking.id} className="bg-white shadow-md rounded-lg p-4">
//               <h2 className="text-xl font-semibold mb-2">
//                 {booking.patientDetails.firstName}{" "}
//                 {booking.patientDetails.lastName}
//               </h2>
//               <p className="text-gray-700">
//                 Patient ID: {booking.bookingSlip.patientId}
//               </p>
//               <p className="text-gray-700">Date: {booking.bookingSlip.date}</p>
//               <p className="text-gray-700">Time: {booking.bookingSlip.time}</p>
//               <button
//                 className="px-3 py-3 bg-gray-200 hover:bg-gray-300 text-gray-600"
//                 onClick={() => {
//                   setData(booking);
//                   // generatePDF(booking);
//                 }} // <-- Wrap in anonymous function
//               >
//                 <FaDownload className="text-black-500 test-2xl" />
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//       <TestComponent data={data} />
//     </>
//   );
// };

// export default AllBooking;
