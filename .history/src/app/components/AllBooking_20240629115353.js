import React, { useState, useEffect } from "react";
import { FaDownload } from "react-icons/fa6";
import jsPDF from "jspdf";
import "jspdf-autotable";
import getBook

const Modal = ({ showModal, handleClose, children }) => {
  if (!showModal) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                {children}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleClose}
            >
              Close
            </button>
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
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold leading-tight text-gray-900 mb-4">
          ALL Bookings of {date}
        </h1>
        <div className="mb-4">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-lg leading-6 font-medium text-gray-900">
                  {booking.patientDetails.firstName} {booking.patientDetails.lastName}
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Patient ID: {booking.bookingSlip.patientId}
                </p>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Date: {booking.bookingSlip.date}
                </p>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Time: {booking.bookingSlip.time}
                </p>
              </div>
              <div className="px-4 py-4 sm:px-6">
                <button
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => handleOpenModal(booking)}
                >
                  <FaDownload className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  View and Download PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal showModal={showModal} handleClose={handleCloseModal}>
        {selectedBooking && <TestComponent data={selectedBooking} />}
      </Modal>
    </div>
  );
};

export default AllBooking;

