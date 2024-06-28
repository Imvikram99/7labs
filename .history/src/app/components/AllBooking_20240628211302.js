import React, { useState, useEffect } from "react";
import { FaDownload } from "react-icons/fa6";
import jsPDF from "jspdf";
import "jspdf-autotable";

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

const TestComponent = ({ data }) => {
  const renderTestPanelReport = (testPanelReport) => {
    if (testPanelReport.testMasterReportList) {
      return testPanelReport.testMasterReportList.map((report) => {
        if (report.testReport) {
          if (report.testReport.report_type === "UltraSoundReport") {
            return (
              <div key={report.testReport.testReportId}>
                <h4>UltraSound Report</h4>
                <p>Header: {report.testReport.header}</p>
                <p>Body: {report.testReport.body}</p>
                <p>Impression: {report.testReport.impression}</p>
                {/* Add more UltraSoundReport details as needed */}
              </div>
            );
          } else if (report.testReport.report_type === "MatrixTestReportTemplate") {
            return (
              <div key={report.testReport.testReportId}>
                <h4>Matrix Test Report Template</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Week</th>
                      <th>Growth Measurement</th>
                      <th>Comments</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(report.testReport.columns).map(([week, data]) => (
                      <tr key={week}>
                        <td>{week}</td>
                        <td>{data.growth_measurement}</td>
                        <td>{data.comments}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Add more MatrixTestReportTemplate details as needed */}
              </div>
            );
          } else if (report.testReport.report_type === "BloodReport") {
            return (
              <div key={report.testReport.testReportId}>
                <h4>Blood Report</h4>
                <p>Investigation: {report.testReport.investigation}</p>
                <p>Value: {report.testReport.value}</p>
                <p>Unit: {report.testReport.unit}</p>
                <p>Min Reference Value: {report.testReport.minReferenceValue}</p>
                <p>Max Reference Value: {report.testReport.maxReferenceValue}</p>
                <p>Primary Sample Type: {report.testReport.primarySampleType}</p>
                {/* Add more BloodReport details as needed */}
              </div>
            );
          }
        }
        if (report.testMasterReports) {
          return renderTestPanelReport({ testMasterReportList: report.testMasterReports });
        }
        return null;
      });
    }
    return null;
  };

  return (
    <div>
      <h2>Tests:</h2>
      <table>
        <thead>
          <tr>
            <th>Test Name</th>
            <th>Barcode</th>
            <th>Cost</th>
            <th>Code</th>
            <th>Test Panel Report</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {data.bookingSlip.tests.map((test) => (
            <tr key={test.id}>
              <td>{test.name}</td>
              <td>{test.barCode}</td>
              <td>{test.cost}</td>
              <td>{test.code}</td>
              <td>
                <div>{renderTestPanelReport(test.testPanelReport)}</div>
              </td>
              {/* Add more table data as needed */}
            </tr>
          ))}
        </tbody>
      </table>
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
