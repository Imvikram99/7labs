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
        <h3 className="text-lg font-semibold mb-2">UltraSound Report</h3>
        <table className="w-full border-collapse">
          <tbody>
            <tr>
              <td className="border px-4 py-2">Header:</td>
              <td className="border px-4 py-2">{testReport.header}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Investigation Value Map:</td>
              <td className="border px-4 py-2">
                {/* Display the investigationValueMap data */}
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Body:</td>
              <td className="border px-4 py-2">{testReport.body}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Impression:</td>
              <td className="border px-4 py-2">{testReport.impression}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  } else if (testReport.report_type === "MatrixTestReportTemplate") {
    return (
      <div>
        <h3 className="text-lg font-semibold mb-2">Matrix Test Report Template</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Week</th>
              <th className="border px-4 py-2">Growth Measurement</th>
              <th className="border px-4 py-2">Comments</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(testReport.columns).map(([week, data]) => (
              <tr key={week}>
                <td className="border px-4 py-2">{week}</td>
                <td className="border px-4 py-2">{data.growth_measurement}</td>
                <td className="border px-4 py-2">{data.comments}</td>
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
      <h2 className="text-xl font-semibold mb-2">Tests:</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Test Name</th>
            <th className="border px-4 py-2">Barcode</th>
            <th className="border px-4 py-2">Cost</th>
            <th className="border px-4 py-2">Code</th>
            <th className="border px-4 py-2">Test Panel Report</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {data.bookingSlip.tests.map((test) => (
            <tr key={test.id}>
              <td className="border px-4 py-2">{test.name}</td>
              <td className="border px-4 py-2">{test.barCode}</td>
              <td className="border px-4 py-2">{test.cost}</td>
              <td className="border px-4 py-2">{test.code}</td>
              <td className="border px-4 py-2">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2">Name</th>
                      <th className="border px-4 py-2">Test Master Name</th>
                      <th className="border px-4 py-2">Report Type</th>
                      <th className="border px-4 py-2">Test Report ID</th>
                      <th className="border px-4 py-2">Test Report Date</th>
                      <th className="border px-4 py-2">View Report</th>
                      {/* Add more table headers as needed */}
                    </tr>
                  </thead>
                  <tbody>
                    {test.testPanelReport.testMasterReportList.map((report) => (
                      <tr key={report.testReport.testReportId}>
                        <td className="border px-4 py-2">{test.testPanelReport.name}</td>
                        <td className="border px-4 py-2">{report.testMasterName}</td>
                        <td className="border px-4 py-2">{report.testReport.report_type}</td>
                        <td className="border px-4 py-2">{report.testReport.testReportId}</td>
                        <td className="border px-4 py-2">{report.testReport.testReportDate}</td>
                        <td className="border px-4 py-2">
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
              className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => handleOpenModal(booking)}
            >
              <FaDownload className="inline-block mr-2" />
              View and Download PDF
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
