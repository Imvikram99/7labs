import React, {useState, useEffect, Fragment} from "react";
import {FaDownload} from "react-icons/fa6";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {specificApis} from '../data/SpecificApis';
import {faArrowLeft, faRestroom} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Image from "next/image";

const Modal = ({showModal, handleClose, children}) => {
    if (!showModal) return null;

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto custom-modal">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div
                    className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle w-7/10"
                    style={{minWidth: '60%'}}>
                    <div className="card" style={{marginBottom: '0'}}>
                        <div className="card-body">
                            {children}
                        </div>
                    </div>
                    <div className="custom-modal-close mt-5 mb-4 sm:flex sm:flex-row-reverse">
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

const TestComponent = ({data}) => {
    const [selectedTestData, setSelectedTestData] = useState({});
    const [reportType, setReportType] = useState(null);
    const [reportData, setReportData] = useState(null);

    const renderTestPanelReport = (mainData, reportData, reportType) => {
        if (reportType === "BloodReport") {
            return (
                <Fragment>
                    <h2 className="test-title">{mainData.name}</h2>
                    <table className="text-start w-100">
                        <thead>
                        <tr>
                            <th className="text-start">Test Name</th>
                            <th className="text-start">Result</th>
                            <th className="text-start">Range</th>
                            <th className="text-start">Units</th>
                            <th className="text-start">Sample Type</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            reportData.map((report, index) => (
                                <tr key={index}>
                                    <td>
                                        <span className="report-value">{report.testReport.investigation}</span>
                                    </td>
                                    <td>
                                        <span className="report-value">{report.testReport.value}</span>
                                    </td>
                                    <td>
                                        <span>{report.testReport.minReferenceValue}</span>
                                        -
                                        <span>{report.testReport.maxReferenceValue}</span>
                                    </td>
                                    <td>
                                        <span>{report.testReport.unit}</span>
                                    </td>
                                    <td>
                                        <span className="capitalize">{report.testReport.primarySampleType}</span>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </Fragment>
            );
        }
        else if (reportType === "UltraSoundReport") {
            return (
                <div>
                    <h2 className="test-title">{mainData.name}</h2>
                    <p>Header: <span className="report-value">{reportData.header}</span></p>
                    <p>Body: <span className="report-value">{reportData.body}</span></p>
                    <p>Impression: <span className="report-value">{reportData.impression}</span></p>
                </div>
            );
        }else if (reportType === "MatrixTestReportTemplate") {
            return (
                <div>
                    <h2 className="test-title">{mainData.name}</h2>
                    <table className="text-start w-100">
                        <thead>
                        <tr>
                            <th>Week</th>
                            <th>Growth Measurement</th>
                            <th>Comments</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.entries(reportData.columns).map(([week, data]) => (
                            <tr key={week}>
                                <td className="capitalize text-blue-700" style={{textAlign: 'center'}}>{week}</td>
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

    const filterTestById = (testId) => {
        const picked = data.bookingSlip.tests.filter(test => test.id === testId)[0];
        setSelectedTestData(picked);

        // Get report type and report data from selected test
        if (picked && picked.testPanelReport && picked.testPanelReport.testMasterReportList) {
            picked.testPanelReport.testMasterReportList.forEach(report => {
                // Check if testReport exists and has a report_type
                if (report.testReport && report.testReport.report_type) {
                    setReportType(report.testReport.report_type);
                    setReportData(report.testReport)
                }
                // Check if testMasterReports exists
                // this is for blood report
                if (report.testMasterReports) {
                    report.testMasterReports.forEach(masterReport => {
                        masterReport.testMasterReports.forEach(masterReport2 => {
                            // Check if testReport exists and has a report_type
                            if (masterReport2.testReport && masterReport2.testReport.report_type) {
                                setReportType(masterReport2.testReport.report_type);
                                setReportData(masterReport.testMasterReports)
                            }
                        });
                    });
                }
            });
        }
    }

    return (
        <div>
            <label className="block text-sm mb-2">Select a Test</label>
            <select className="mb-3" name="test-dropdown" id="test-dropdown"
                    onChange={(e) => filterTestById(e.target.value)}>
                <option value="">--- Select a Test ---</option>
                {
                    data.bookingSlip.tests.map((test) =>
                        <option key={test.id} value={test.id}>{test.name}</option>
                    )
                }
            </select>
            <hr/>

            <div className="report-main-body">
                <div className="address-part">
                    <div className="a-left">
                        <h5 className="hos-name">Hospital Name</h5>
                        <p>19/C, East Noyatola, Moghbazar</p>
                    </div>
                    <div className="a-right">
                        <Image src="/logoreport1.png" width="100" height="100" alt="logo"/>
                    </div>
                </div>
                <h3 className="report-title">Laboratory Report</h3>
                <div className="personal-info-part">
                    <div className="a-left">
                        <h5><span>Name</span>
                            <strong>{data.patientDetails.firstName} {data.patientDetails.lastName}</strong></h5>
                        <h5><span>DoB</span> {data.patientDetails.dob}</h5>
                        <h5><span>Doctor</span> Alfaz Uddin</h5>
                        <h5><span>Phone</span> {data.patientDetails.phone}</h5>
                        <h5>
                            <span>Address</span> {data.patientDetails.addressLine1}, {data.patientDetails.addressLine2}, {data.patientDetails.addressLine3}
                        </h5>
                    </div>
                    <div className="a-right">
                        <h5><span>Patient ID</span><strong>{data.patientDetails.patientId}</strong></h5>
                        <h5>
                            <span>Age</span><strong>{data.patientDetails.ageInYears}</strong>Y <strong>{data.patientDetails.ageInMonths}</strong>M <strong>{data.patientDetails.ageInDays}</strong>D
                        </h5>
                        <h5><span>SEX</span>{data.patientDetails.gender}</h5>
                        <h5><span>Test ID</span>{data.patientDetails.pinCode}</h5>
                    </div>
                </div>
                <hr/>

                {
                    selectedTestData && selectedTestData.testPanelReport && reportType !== '' ? renderTestPanelReport(selectedTestData, reportData, reportType) : <p className="no-test-selected-msg text-center text-red-500">Please select a test name to view report</p>
                }

                <div className="signature-part">
                    <p>Digitally signed by</p>
                    <p><strong>Dr. Alfaz Uddin</strong></p>
                    <p>GNU Public Key</p>
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

