import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const TestComponent = ({ data }) => {
  const reportRef = useRef();

  const generatePDF = () => {
    const input = reportRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("pathology-report.pdf");
    });
  };
  console.log(data, "idddddd");
  return (
    <div>
      <div ref={reportRef} style={{ padding: "20px" }}>
        <button
          onClick={generatePDF}
          // className="px-3 py-3 bg-gray-200 hover:bg-gray-300 text-gray-600"
          style={{
            //   width: "80%",
            padding: "10px",
            background: "black",
            color: "white",
          }}
        >
          Download PDF
        </button>
        <div className="container" style={{ width: "80%", margin: "auto" }}>
          <div
            className="header"
            style={{ textAlign: "center", opacity: "70%" }}
          >
            <h1 style={{ fontSize: "40px", fontWeight: "800" }}>7 LABS</h1>
            <p>
              <strong>Accurate | Caring | Instant</strong>
            </p>
            <p>
              <strong>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic
                harum nihil enim, repudiandae aliquam ea veniam. Ratione, totam
                pariatur qui quam dolorem deserunt.
              </strong>
            </p>
            <p>
              <strong>www.7labs.com | 0123456789 | info@7labs.com</strong>
            </p>
          </div>

          <div
            className=""
            style={{
              display: "flex",
              justifyContent: "space-between",
              // gap:"30px",
              fontSize: "18px",
            }}
          >
            <div className="patient-info" style={{ width: "50%" }}>
              {/* <h2>Patient Information</h2> */}
              <p>
                <strong>Name:</strong> {data?.patientDetails?.firstName}{" "}
                {data?.patientDetails?.lastName}
              </p>
              <p>
                <strong>Age:</strong> {data?.patientDetails?.ageInYears}
              </p>
              <p>
                <strong>Sex:</strong> {data?.patientDetails?.gender}
              </p>
              <p>
                <strong>PID:</strong> {data?.patientDetails?.patientId}
              </p>
            </div>

            <div className="sample-info" style={{ width: "50%" }}>
              {/* <h2>Sample Information</h2> */}
              <p>
                <strong>Sample Collected At:</strong>{" "}
                {data?.bookingSlip?.sampleCollectedAt}
              </p>
              <p>
                <strong>Ref. By:</strong> {data?.bookingSlip?.referralDoctorId}
              </p>
              <p>
                <strong>Registered on:</strong> {data?.bookingSlip?.date}
              </p>
              <p>
                <strong>Collected on:</strong> {data?.bookingSlip?.date}
              </p>
              <p>
                <strong>Reported on:</strong> {data?.bookingSlip?.date}
              </p>
            </div>
          </div>

          <div className="results">
            <h2
              style={{
                background: "blue",
                color: "white",
                fontSize: "18px",
                fontWeight: "800",
                textAlign: "center",
              }}
            >
              {/* Complete Blood Count (CBC) */}
              {data?.bookingSlip?.tests[0]?.name}
            </h2>
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>Investigation</th>
                  <th>Result</th>
                  <th>Reference Value</th>
                  <th>Unit</th>
                </tr>
              </thead>
              <tbody>
                {data?.bookingSlip?.tests[0]?.testPanelReport?.testMasterReportList.map(
                  (result, index) => (
                    <tr key={index}>
                      <td>{result.testMasterName}</td>
                      <td>{result?.testReport}</td>
                      <td>{result.reference}</td>
                      <td>{result.unit}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            <p>
              <b>Interpretation:</b> {data.interpretation}
            </p>
          </div>

          <div
            className="signatures"
            style={{
              textAlign: "center",
              display: "flex",
              gap: "50px",
              justifyContent: "space-evenly",
            }}
          >
            {/* {data.technicians.map((tech, index) => (
              <div key={index}>
                <p>________________________</p>
                <p>{tech.name}</p>
                <p>{tech.title}</p>
              </div>
            ))} */}
            <div>
              {/* <p>________________________</p> */}
              <p>{data?.bookingSlip?.sampleBy}</p>
              <p>
                <strong>Sample By</strong>
              </p>
            </div>
            <div>
              {/* <p>________________________</p> */}
              <p>{data?.bookingSlip?.billedBy}</p>
              <p>
                <strong>Billed By</strong>
              </p>
            </div>
          </div>

          <div className="footer">
            <p>
              <b>Generated on:</b> {data?.bookingSlip?.date}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestComponent;

//   const data = {
//     patientName: "Yash M. Patel",
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
