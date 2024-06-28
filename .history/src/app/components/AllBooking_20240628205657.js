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
const TestReportModal = ({ testReport }) => {
  if (testReport.report_type === "UltraSoundReport") {
    return (
      <div>
        <h3>UltraSound Report</h3>
        <table>
          <tbody>
            <tr>
              <td>Header:</td>
              <td>{testReport.header}</td>
            </tr>
            <tr>
              <td>Investigation Value Map:</td>
              <td>
                {/* Display the investigationValueMap data */}
              </td>
            </tr>
            <tr>
              <td>Body:</td>
              <td>{testReport.body}</td>
            </tr>
            <tr>
              <td>Impression:</td>
              <td>{testReport.impression}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  } else if (testReport.report_type === "MatrixTestReportTemplate") {
    return (
      <div>
        <h3>Matrix Test Report Template</h3>
        <table>
          <thead>
            <tr>
              <th>Week</th>
              <th>Growth Measurement</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(testReport.columns).map(([week, data]) => (
              <tr key={week}>
                <td>{week}</td>
                <td>{data.growth_measurement}</td>
                <td>{data.comments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return null;
};

const TestComponent = ({ data }) => {
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
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Test Master Name</th>
                      <th>Report Type</th>
                      <th>Test Report ID</th>
                      <th>Test Report Date</th>
                      <th>View Report</th>
                      {/* Add more table headers as needed */}
                    </tr>
                  </thead>
                  <tbody>
                    {test.testPanelReport.testMasterReportList.map((report) => (
                      <tr key={report.testReport.testReportId}>
                        <td>{test.testPanelReport.name}</td>
                        <td>{report.testMasterName}</td>
                        <td>{report.testReport.report_type}</td>
                        <td>{report.testReport.testReportId}</td>
                        <td>{report.testReport.testReportDate}</td>
                        <td>
                          <TestReportModal testReport={report.testReport} />
                        </td>
                        {/* Add more table data as needed */}
                      </tr>
                    ))}
                  </tbody>
                </table>
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

