import React, {useState, useEffect, Fragment} from "react";
import {FaDownload} from "react-icons/fa6";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {specificApis} from '../data/SpecificApis';
import {faArrowLeft, faEdit, faFilePdf, faRestroom} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Image from "next/image";
import {formatDate} from "@/helper/globalFunctions";
import {CustomModal} from "@/app/components/CustomModal";
import html2canvas from "html2canvas";

const TestComponent = ({data}) => {
    const [selectedTests, setSelectedTests] = useState([]);
    const [reportType, setReportType] = useState(null);
    const [showEditReportModal, setShowEditReportModal] = useState(false);

    const renderTestPanelReport = (selectedTests, reportType) => {
        if (reportType === "BloodReport") {
            return (
                <div className="bg-white rounded-lg">
                    {selectedTests.length > 0 ? (
                        <Fragment>
                            {selectedTests.map((test, index) => (
                                <div key={index}>
                                    <h2 className="text-lg font-bold mb-2 text-center uppercase">{test.name}</h2>
                                    <table className="table-auto w-full mb-4">
                                        <thead>
                                        <tr>
                                            <th className="px-4 py-2">Test Name</th>
                                            <th className="px-4 py-2">Investigation</th>
                                            <th className="px-4 py-2">Value</th>
                                            <th className="px-4 py-2">Unit</th>
                                            <th className="px-4 py-2">Min</th>
                                            <th className="px-4 py-2">Max</th>
                                            <th className="px-4 py-2">Test Report ID</th>
                                            <th className="px-4 py-2">Report Date</th>
                                            <th className="px-4 py-2">Sample Type</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {renderData(test.testPanelReport.testMasterReportList)}
                                        </tbody>
                                    </table>
                                </div>
                            ))}
                        </Fragment>
                    ) : <p className="text-gray-600">Please select a test to view the report.</p>}
                </div>
            );
        } else if (reportType === "UltraSoundReport") {
            let data = selectedTests[0];
            return (
                <div>
                    <h2 className="test-title">{data.name}</h2>
                    {
                        data.testPanelReport && data.testPanelReport.testMasterReportList.map((testMaster, index) => (
                            <div key={index} className="ultar-report-main">
                                <p>Header: <span className="report-value">{testMaster.header}</span></p>
                                <p>Body: <span className="report-value">{testMaster.body}</span></p>
                                <p>Impression: <span className="report-value">{testMaster.impression}</span></p>
                            </div>
                        ))
                    }
                </div>
            );
        } else if (reportType === "MatrixTestReportTemplate") {
            let data = selectedTests[0];
            return (
                <div>
                    <h2 className="test-title">{data.name}</h2>
                    <table className="text-start w-100">
                        <thead>
                        <tr>
                            <th>Week</th>
                            <th>Growth Measurement</th>
                            <th>Comments</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.entries(data.testPanelReport.testMasterReportList[0].testReport.columns).map(([week, data]) => (
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
        if (testId === '') {
            setSelectedTests([]);
            setReportType('');
        } else {
            const picked = data.bookingSlip.tests.filter(test => test.id === testId);
            setSelectedTests(picked);

            // Get report type from selected Test
            const processReports = (reports) => {
                reports.forEach(report => {
                    // Check if testReport exists and has a report_type
                    if (report.testReport && report.testReport.report_type) {
                        setReportType(report.testReport.report_type);
                    }
                    // Check if testMasterReports exists
                    if (report.testMasterReports) {
                        processReports(report.testMasterReports);
                    }
                });
            };

            if (picked && picked[0].testPanelReport && picked[0].testPanelReport.testMasterReportList) {
                processReports(picked[0].testPanelReport.testMasterReportList);
            }
        }
    }


    const renderData = (testMasters, parentName = '') => {
        return testMasters.map((testMaster, index) => (
            <React.Fragment key={'master-' + index}>
                {testMaster.testReport && (
                    <tr>
                        <td className="capitalize">{testMaster.testMasterName}</td>
                        {Object.entries(testMaster.testReport).filter(([key, _]) => key !== "report_type").map(([key, value]) => (
                            <td key={key}>{key === 'investigation' ? <span
                                className="capitalize">{value}</span> : key === 'testReportDate' ? formatDate(value) : value}</td>
                        ))}
                    </tr>
                )}
                {testMaster.testMasterReports && (
                    <>
                        <tr style={{backgroundColor: '#484848', color: 'white', border: '1px solid aliceblue'}}>
                            <td colSpan="100%" style={{textAlign: 'center', textTransform: 'capitalize', paddingBottom:'10px'}}>
                                <strong>{parentName ? `${parentName} - ${testMaster.testMasterName}` : testMaster.testMasterName}</strong>
                            </td>
                        </tr>
                        {renderData(testMaster.testMasterReports, testMaster.testMasterName)}
                    </>
                )}
            </React.Fragment>
        ));
    };

    const generatePdf = async () => {
        const content = document.getElementById('report-main-body-pdf');
        const canvas = await html2canvas(content, {
            scale: 5,
            allowTaint: true,
            useCORS: true
        });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        pdf.save('report.pdf');
    };

    const testtt = () => {
        const payload = {
            "name": "ultrasound full body",
            "testMasterReportList": [
                {
                    "testMasterName": "White Blood Cell Count",
                    "testReport": {
                        "report_type": "UltraSoundReport",
                        "testReportId": "048d5a5a",
                        "testReportDate": "2024-07-03T06:07:40.178+00:00",
                        "header": "ye pet ka ultrasound hai",
                        "investigationValueMap": {},
                        "body": "ye body",
                        "impression": "kuch nhi hai thik hai"
                    },
                    "testMasterReports": null
                }
            ]
        }

        specificApis.updateTestResult("63", "cb718a44", payload)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error('Failed to update test:', error);
            });
    }

    return (
        <div className="report-modal-container">
            <div className="report-modal-header">
                <div className="flex justify-center items-center">
                    <label className="block text-sm flex-grow whitespace-nowrap mr-2">Select a Test</label>
                    <select name="test-dropdown" id="test-dropdown" className="flex-grow"
                            onChange={(e) => filterTestById(e.target.value)}>
                        <option value="">--- Select a Test ---</option>
                        {
                            data.bookingSlip.tests.map((test) =>
                                <option key={test.id} value={test.id}>{test.name}</option>
                            )
                        }
                    </select>
                </div>
                <hr/>
                <div className="editable-icon-block flex content-end">
                    <div className="edit-icon mr-4"><FontAwesomeIcon icon={faEdit} onClick={() => setShowEditReportModal(true)}/></div>
                    <div className="download-pdf-icon"><FontAwesomeIcon onClick={generatePdf} icon={faFilePdf}/></div>
                </div>
                {
                    showEditReportModal &&
                    <CustomModal showModal={showEditReportModal} handleClose={() => {
                        setShowEditReportModal(false)
                    }}>
                        <form>
                            <label className="block text-sm mb-2">Test Name:</label>
                            <input type="text" name="name" placeholder="Test Name"
                                   className="w-full"/>

                            <button type="button" onClick={testtt}>Submit</button>

                        </form>
                    </CustomModal>
                }
            </div>

            <div id="report-main-body-pdf">
                <div id="report-main-body" className="report-main-body">
                    <div className="address-part">
                        <div className="a-left">
                            <h5 className="hos-name">Hospital Name</h5>
                            <p>19/C, East Noyatola, Moghbazar</p>
                        </div>
                        <div className="a-right">
                            <img style={{width: "100px"}} src="/logoreport1.png" alt="logo"/>
                        </div>
                    </div>
                    <h3 id="report-title" className="report-title">Laboratory Report</h3>
                    <div className="personal-info-part">
                        <div className="a-left">
                            <h5><span>Name</span>
                                <strong>{data.patientDetails.firstName} {data.patientDetails.lastName}</strong></h5>
                            <h5><span>DoB</span>{data.patientDetails.dob}</h5>
                            <h5><span>Doctor</span>Alfaz Uddin</h5>
                            <h5><span>Phone</span>{data.patientDetails.phone}</h5>
                            <h5>
                                <span>Address</span>{data.patientDetails.addressLine1}, {data.patientDetails.addressLine2}, {data.patientDetails.addressLine3}
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
                        setSelectedTests.length > 0 && reportType !== '' ? renderTestPanelReport(selectedTests, reportType) :
                            <p className="no-test-selected-msg text-center text-red-500">Please select a test name to
                                view
                                report</p>
                    }

                    <div className="signature-part">
                        <p>Digitally signed by</p>
                        <p><strong>Dr. Alfaz Uddin</strong></p>
                        <p>GNU Public Key</p>
                        <p>&nbsp;</p>
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
        setSelectedBooking(booking)
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
                                    {booking.patientDetails.firstName} {booking.patientDetails.lastName}
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

            <CustomModal showModal={showModal} handleClose={handleCloseModal}>
                {selectedBooking && <TestComponent data={selectedBooking}/>}
            </CustomModal>
        </div>
    );
};

export default AllBooking;

