import React, {useState, useEffect} from "react";
import {FaDownload} from "react-icons/fa6";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {specificApis} from '../data/SpecificApis';
import {faArrowLeft, faRestroom} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Modal = ({showModal, handleClose, children}) => {
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
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle w-7/10" style={{minWidth:'60%'}}>
                <div className="card" style={{marginBottom: '0'}}>
                    <div className="card-body">
                            {children}
                         <div className="bg-gray-50 mt-3 sm:flex sm:flex-row-reverse">
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
            </div>
        </div>
    );
};

const TestComponent = ({data}) => {
    const renderTestPanelReport = (testPanelReport) => {
        if (testPanelReport.testMasterReportList) {
            return testPanelReport.testMasterReportList.map((report) => {
                if (report.testReport) {
                    if (report.testReport.report_type === "UltraSoundReport") {
                        return (
                            <div key={report.testReport.testReportId}>
                                <h4>UltraSound Report</h4>
                                <p>Header: <span className="report-value">{report.testReport.header}</span></p>
                                <p>Body: <span className="report-value">{report.testReport.body}</span></p>
                                <p>Impression: <span className="report-value">{report.testReport.impression}</span></p>
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
                                <h4 className="font-bold">Blood Report</h4>
                                <p>Investigation: <span className="report-value">{report.testReport.investigation}</span></p>
                                <p>Value: <span className="report-value">{report.testReport.value}</span></p>
                                <p>Unit: <span className="report-value">{report.testReport.unit}</span></p>
                                <p>Min Reference Value: <span className="report-value">{report.testReport.minReferenceValue}</span></p>
                                <p>Max Reference Value: <span className="report-value">{report.testReport.maxReferenceValue}</span></p>
                                <p>Primary Sample Type: <span className="report-value">{report.testReport.primarySampleType}</span></p>
                                {/* Add more BloodReport details as needed */}
                            </div>
                        );
                    }
                }
                if (report.testMasterReports) {
                    return renderTestPanelReport({testMasterReportList: report.testMasterReports});
                }
                return null;
            });
        }
        return null;
    };

    return (
        <div>
            <h2 className="font-bold fa-xl mb-8 mt-3">Test Report</h2>
            <table className="text-start w-100">
                <thead>
                <tr>
                    <th className="text-start">Test Name</th>
                    <th className="text-start">Barcode</th>
                    <th className="text-start">Cost</th>
                    <th className="text-start">Code</th>
                    <th className="text-start">Test Panel Report</th>
                    {/* Add more table headers as needed */}
                </tr>
                </thead>
                <tbody>
                {data.bookingSlip.tests.map((test) => (
                    <tr key={test.id}>
                        <td><span className="text-blue-700">{test.name}</span></td>
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
        specificApis.getBookings(date, "")
            .then(response => {
                setBookings(response);
            })
            .catch(error => {
                console.error('Failed to fetch bookings:', error);
            });
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
        <div className="max-w-7xl mx-auto">
            <h6 className="uppercase font-extrabold text-xl"><FontAwesomeIcon icon={faRestroom}/> | ALL
                Bookings</h6>
            <hr/>
            <div className="">
                <h6 className=" font-semibold mb-4">
                    ALL Bookings of <span className="italic">{date}</span>
                </h6>
                <div className="mb-4">
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-3 py-2 outline-none"
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {bookings.map((booking) => (
                        <div key={booking.id} className="card overflow-hidden shadow rounded-lg">
                            <div className="card-body">
                                <h2 className="text-lg card-title font-bold">
                                    Vikram Panwar {booking.patientDetails.firstName} {booking.patientDetails.lastName}
                                </h2>
                            </div>
                            <div className="card-body-out">
                                <p className="mt-1 max-w-2xl text-sm">
                                    Patient ID: {booking.bookingSlip.patientId}
                                </p>
                                <p className="mt-1 max-w-2xl text-sm">
                                    Date: {booking.bookingSlip.date}
                                </p>
                                <p className="mt-1 max-w-2xl text-sm">
                                    Time: {booking.bookingSlip.time}
                                </p>
                            </div>
                            <div className="download-btn-block">
                                <button
                                    className="w-100 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-normal text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={() => handleOpenModal(booking)}
                                >
                                    <FaDownload className="-ml-1 mr-2 h-5 w-5" aria-hidden="true"/>
                                    View and Download PDF
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Modal showModal={showModal} handleClose={handleCloseModal}>
                {selectedBooking && <TestComponent data={selectedBooking}/>}
            </Modal>
        </div>
    );
};

export default AllBooking;

