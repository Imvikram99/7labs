import React, { useState, useEffect, Fragment } from "react";
import { FaDownload } from "react-icons/fa6";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { specificApis } from '../data/SpecificApis';
import { faArrowLeft, faEdit, faFilePdf, faRestroom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDate } from "@/helper/globalFunctions";
import { CustomModal } from "@/app/components/CustomModal";
import html2canvas from "html2canvas";
import toast from "react-hot-toast";
import Booking from "./Booking";
import { useForm } from "react-hook-form";
import Select from "react-select";
import Image from "next/image";

export const TestComponent = ({ data,type }) => {
    const [selectedTests, setSelectedTests] = useState([]);
    const [reportType, setReportType] = useState(null);
    const [showEditReportModal, setShowEditReportModal] = useState(false);
    const [centers, setCenters] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [selectedEmployees, setselectedEmployees] = useState([]);
    const [imagePreviewUrl, setImagePreviewUrl] = useState('/logoreport1.png');

    const [inputValues, setInputValues] = useState({});
    const [ultraInputValues, setUltraInputValues] = useState({});
    const [matrixInputValues, setMatrixInputValues] = useState({});

    const [primarySampleType, setPrimarySampleType] = useState(null);
    const [testReportDate, setTestReportDate] = useState(null);
    const [reportTemplate, setReportTemplate] = useState([]);
    const [currentTemplate, setCurrentTemplate] = useState("");
    const [ModalOpen, setModalOpen] = useState(false);

    const handleInputChange = (e, testReportId) => {
        setInputValues({
            ...inputValues,
            [testReportId]: e.target.value
        });
    };
    useEffect(() => {
        fetchCenters()
        fetchEmployees()
        fetchReportTemplate()
    }, [])

    async function fetchCenters() {
        try {
            const fetchedCenters = await specificApis.fetchCenters();
            const find = fetchedCenters.find((e) => e.id == data.bookingSlip.centerCode)
            if (find) {
                setCenters(find);
            }
        } catch (error) {
            console.error('Failed to fetch center information:', error);
        }
    }

    function onClose() {
        setModalOpen(false)
        fetchReportTemplate()
    }

    async function getImgUrl(id) {
        if (id == undefined || id == "") {
            return "/logoreport1.png"
        }
        const response = await specificApis.downloadFile(id);
        const url = URL.createObjectURL(response);
        return url
    }

    function setTempleteData(id) {
        const find = (reportTemplate || []).find((a) => a.testReportId == id)
        setCurrentTemplate(find ?? "")
    }

    function setEmployeesData(id) {
        const find = (employees || []).find((a) => a.empId == id)
        setselectedEmployees(find ?? {})
        getImgUrl(find?.signatureUrl)
    }

    const fetchEmployees = async () => {
        try {
            const fetchedEmployees = await specificApis.fetchEmployeeList();
            if (Array.isArray(fetchedEmployees)) {
                setEmployees(fetchedEmployees);
            } else {
                setEmployees([]);
            }
        } catch (error) {
            console.error('Failed to fetch employees:', error);
        }
    };

    const fetchReportTemplate = async () => {
        try {
            const fetchedTemplate = await specificApis.fetchReportTemplate();
            if (Array.isArray(fetchedTemplate)) {
                setReportTemplate(fetchedTemplate);
                if (currentTemplate !== "") {
                    const find = fetchedTemplate.find((e) => e.testReportId == currentTemplate?.testReportId)
                    if (find) {
                        setCurrentTemplate(find)
                    }
                }
            } else {
                setReportTemplate([]);
            }
        } catch (error) {
            console.error('Failed to fetch employees:', error);
        }
    };


    const handleUltraInputChange = (e, testReportId, field) => {
        const { value } = e.target;
        setUltraInputValues(prevValues => ({
            ...prevValues,
            [testReportId]: {
                ...prevValues[testReportId],
                [field]: value
            }
        }));
    }

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
                        data.testPanelReport && data.testPanelReport.testMasterReportList !== null && data.testPanelReport.testMasterReportList.map((testMaster, index) => (
                            <div key={index} className="ultar-report-main">
                                <p>Header: <span className="report-value">{testMaster.testReport.header}</span></p>
                                <p>Body: <span className="report-value">{testMaster.testReport.body}</span></p>
                                <p>Impression: <span className="report-value">{testMaster.testReport.impression}</span></p>
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
                                    <td className="capitalize text-blue-700" style={{ textAlign: 'center' }}>{week}</td>
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
        setCurrentTemplate("")
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
                        setTestReportDate(report.testReport.testReportDate)
                        setReportType(report.testReport.report_type);
                        if (report.testReport.primarySampleType) {
                            setPrimarySampleType(report.testReport.primarySampleType);
                        }
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
                        {Object.entries(testMaster.testReport)
                            .filter(([key, _]) => key === "investigation" || key == 'isRatio' || key === 'value' || key === 'unit' || key === 'minReferenceValue' || key === 'maxReferenceValue')
                            .map(([key, value]) => {

                                return (
                                    <td key={key}>
                                        {key == 'value' && testMaster.testReport?.isRatio ? (
                                            <>
                                                {(value - testMaster.testReport.minReferenceValue) / (testMaster.testReport.maxReferenceValue - testMaster.testReport.minReferenceValue)}
                                            </>
                                        ) : (
                                            <>
                                                {key === 'investigation' ? <span
                                                    className="capitalize">{value}</span> : key === 'testReportDate' ? formatDate(value) : value}
                                            </>
                                        )}
                                    </td>
                                );
                            })
                        }
                    </tr>
                )}
                {testMaster.testMasterReports && (
                    <>
                        <tr style={{ backgroundColor: '#484848', color: 'white', border: '1px solid aliceblue' }}>
                            <td colSpan="100%"
                                style={{ textAlign: 'center', textTransform: 'capitalize', paddingBottom: '10px' }}>
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

    function showTemplate() {
        return selectedTests[0] && selectedTests[0]?.testPanelReport?.testMasterReportList[0]?.testReport?.report_type == "UltraSoundReport"
    }

    const updateTestData = () => {
        let payload = {}
        let updatedTestsData = []

        if (reportType === 'BloodReport') {
            const updateReports = (reports) => {
                return reports.map(report => {
                    if (report.testReport && inputValues[report.testReport.testReportId]) {
                        return {
                            ...report,
                            testReport: {
                                ...report.testReport,
                                value: inputValues[report.testReport.testReportId]
                            }
                        };
                    }
                    if (report.testMasterReports) {
                        return {
                            ...report,
                            testMasterReports: updateReports(report.testMasterReports)
                        };
                    }
                    return report;
                });
            };

            updatedTestsData = selectedTests.map(test => {
                return {
                    ...test,
                    testPanelReport: {
                        ...test.testPanelReport,
                        testMasterReportList: updateReports(test.testPanelReport.testMasterReportList)
                    }
                };
            });

            payload = updatedTestsData[0].testPanelReport;

        } else if (reportType === 'UltraSoundReport') {

            updatedTestsData = selectedTests.map(test => {
                return {
                    ...test,
                    testPanelReport: {
                        ...test.testPanelReport,
                        testMasterReportList: test.testPanelReport.testMasterReportList.map(masterReport => {
                            if (masterReport.testReport.testReportId in ultraInputValues) {
                                const updatedReport = {
                                    ...masterReport.testReport,
                                    ...ultraInputValues[masterReport.testReport.testReportId]
                                };
                                return {
                                    ...masterReport,
                                    testReport: updatedReport
                                };
                            }
                            return masterReport;
                        })
                    }
                };
            });

            payload = updatedTestsData[0].testPanelReport;

        } else if (reportType === 'MatrixTestReportTemplate') {

            updatedTestsData = selectedTests.map(test => {
                return {
                    ...test,
                    testPanelReport: {
                        ...test.testPanelReport,
                        testMasterReportList: test.testPanelReport.testMasterReportList.map(masterReport => {
                            const updatedColumns = Object.entries(masterReport.testReport.columns).reduce((acc, [week, data]) => {
                                if (week in matrixInputValues[masterReport.testReport.testReportId]) {
                                    return {
                                        ...acc,
                                        [week]: {
                                            ...data,
                                            ...matrixInputValues[masterReport.testReport.testReportId][week]
                                        }
                                    };
                                }
                                return {
                                    ...acc,
                                    [week]: data
                                };
                            }, {});

                            return {
                                ...masterReport,
                                testReport: {
                                    ...masterReport.testReport,
                                    columns: updatedColumns
                                }
                            };
                        })
                    }
                };
            });

            payload = updatedTestsData[0].testPanelReport;

        }
        payload.verifiedByEmpId = selectedEmployees.empId ? [selectedEmployees.empId] : payload.verifiedByEmpId
        specificApis.updateTestResult(data.bookingSlip.receiptId, selectedTests[0].id, payload)
            .then(response => {
                setSelectedTests(updatedTestsData);
                toast.success('Data updated successfully')
            })
            .catch(error => {
                console.error('Failed to update test:', error);
            });
    }

    const renderEditedData = (testMasters, parentName = '') => {
        return testMasters.map((testMaster, testIndex) => (
            <React.Fragment key={'master-' + testIndex}>
                {testMaster.testReport && (
                    <tr>
                        <td className="capitalize">{testMaster.testMasterName}</td>
                        {Object.entries(testMaster.testReport).filter(([key, _]) => key === "investigation" || key === "value").map(([key, value]) => (
                            <td key={key}>{key === 'value' ?
                                <input type="text" value={inputValues[testMaster.testReport.testReportId] ?? value}
                                    onChange={(e) => handleInputChange(e, testMaster.testReport.testReportId)} /> : value}</td>))}
                    </tr>
                )}
                {testMaster.testMasterReports && (
                    <>
                        <tr style={{ backgroundColor: '#484848', color: 'white', border: '1px solid aliceblue' }}>
                            <td colSpan="100%"
                                style={{ textAlign: 'center', textTransform: 'capitalize', paddingBottom: '10px' }}>
                                <strong>{parentName ? `${parentName} - ${testMaster.testMasterName}` : testMaster.testMasterName}</strong>
                            </td>
                        </tr>
                        {renderEditedData(testMaster.testMasterReports, testMaster.testMasterName)}
                    </>
                )}
            </React.Fragment>
        ));
    };
    if(type == 'bill'){
        return <Invoice data={data} centers={centers} generatePdf={generatePdf}/>
    }  
    return (
        <div className="report-modal-container">
            <div className="report-modal-header">
                <div className="grid grid-cols-3 gap-3">
                    <div className="w-full">
                        <label className="block text-sm flex-grow whitespace-nowrap mr-2">Select a Test</label>
                        <select name="test-dropdown" id="test-dropdown" className="flex-grow"
                            onChange={(e) => filterTestById(e.target.value)}>
                            <option value="">--- Select a Test ---</option>
                            {
                                (data.bookingSlip.tests || []).map((test) =>
                                    <option key={test.id} value={test.id}>{test.name}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="w-full">
                        <label className="block text-sm flex-grow whitespace-nowrap mr-2">Verified By</label>
                        <Select
                            className="w-full"
                            options={(employees || []).map((e) => { return { value: e.empId, label: e.firstName + ' ' + e.lastName } }) ?? []}
                            isMulti
                            // value={value}
                            onChange={async (selectedOptions, selected) => {
                                if (selected.action == 'remove-value') {
                                    const newData = selectedEmployees.filter((a) => a.empId !== selected.removedValue?.value)
                                    setselectedEmployees(newData)
                                } else {
                                    const findData = employees.find((a) => a.empId == selected.option?.value)
                                    if (findData) {
                                        setselectedEmployees([...selectedEmployees, { ...findData, url: await getImgUrl(findData?.signatureUrl) }])
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
                <hr />
                {
                    reportType !== null && reportType.length > 0 &&
                    <div className="editable-icon-block flex justify-end">
                        <div className="edit-icon mr-4">
                            <FontAwesomeIcon icon={faEdit} onClick={() => setShowEditReportModal(true)} />
                        </div>
                        <div className="download-pdf-icon"><FontAwesomeIcon onClick={generatePdf} icon={faFilePdf} />
                        </div>
                    </div>
                }

                {
                    showEditReportModal &&
                    <CustomModal showModal={showEditReportModal} handleClose={() => {
                        setShowEditReportModal(false)
                    }}>
                        <form>
                            <div className="bg-white rounded-lg">
                                {reportType === 'BloodReport' && selectedTests.length > 0 ? (
                                    <Fragment>
                                        {selectedTests.map((test, index) => (
                                            <div key={index}>
                                                <h2 className="text-lg font-bold mb-2 text-center uppercase">{test.name}</h2>
                                                <table className="table-auto w-full mb-4">
                                                    <tbody>
                                                        {renderEditedData(test.testPanelReport.testMasterReportList)}
                                                    </tbody>
                                                </table>
                                            </div>
                                        ))}
                                    </Fragment>
                                ) : reportType === 'UltraSoundReport' ? <Fragment>
                                    <div>
                                        <h2 className="text-lg font-bold mb-2 text-center uppercase">{selectedTests[0].name}</h2>
                                        {
                                            selectedTests[0].testPanelReport && selectedTests[0].testPanelReport.testMasterReportList.map((testMaster, index) => {
                                                const fields = ['header', 'body', 'impression'];
                                                return (
                                                    <div key={index} className="ultar-report-main">
                                                        {fields.map(field => (
                                                            <p key={field}>
                                                                <label
                                                                    className="block text-sm mb-2 capitalize">{field}</label>
                                                                <span className="report-value">
                                                                    <input className="w-full mb-3 text-black"
                                                                        type="text" required
                                                                        value={ultraInputValues[testMaster.testReport.testReportId]?.[field] || testMaster.testReport[field]}
                                                                        onChange={(e) => handleUltraInputChange(e, testMaster.testReport.testReportId, field)}
                                                                    />
                                                                </span>
                                                            </p>
                                                        ))}
                                                        {showTemplate() && (
                                                            <div className="w-full flex items-end mb-3">
                                                                <div className="w-full mr-2">
                                                                    <label className="block text-sm flex-grow whitespace-nowrap">Template</label>
                                                                    <select onChange={(e) => setTempleteData(e.target.value)} value={currentTemplate?.testReportId}>
                                                                        <option>Select Value</option>
                                                                        {(reportTemplate || []).map((a, i) => {
                                                                            return <option key={i} value={a.testReportId}>{a.header}</option>
                                                                        })}
                                                                    </select>
                                                                </div>
                                                                {currentTemplate !== "" && (
                                                                    <div className="edit-icon">
                                                                        <FontAwesomeIcon icon={faEdit} onClick={() => setModalOpen(true)} />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </Fragment> : reportType === 'MatrixTestReportTemplate' ? (
                                    <div>
                                        <h2 className="text-lg font-bold mb-2 text-center uppercase">{selectedTests[0].name}</h2>
                                        <table className="text-start w-100">
                                            <thead>
                                                <tr>
                                                    <th>Week</th>
                                                    <th>Growth Measurement</th>
                                                    <th>Comments</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Object.entries(selectedTests[0].testPanelReport.testMasterReportList[0].testReport.columns).map(([week, data]) => (
                                                    <tr key={week}>
                                                        <td className="capitalize text-blue-700"
                                                            style={{ textAlign: 'center' }}>{week}</td>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                value={matrixInputValues[selectedTests[0].testPanelReport.testMasterReportList[0].testReport.testReportId]?.[week]?.growth_measurement || data.growth_measurement}
                                                                onChange={(e) => setMatrixInputValues(prev => ({
                                                                    ...prev,
                                                                    [selectedTests[0].testPanelReport.testMasterReportList[0].testReport.testReportId]: {
                                                                        ...prev[selectedTests[0].testPanelReport.testMasterReportList[0].testReport.testReportId],
                                                                        [week]: {
                                                                            ...prev[selectedTests[0].testPanelReport.testMasterReportList[0].testReport.testReportId]?.[week],
                                                                            growth_measurement: e.target.value
                                                                        }
                                                                    }
                                                                }))}
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                value={matrixInputValues[selectedTests[0].testPanelReport.testMasterReportList[0].testReport.testReportId]?.[week]?.comments || data.comments}
                                                                onChange={(e) => setMatrixInputValues(prev => ({
                                                                    ...prev,
                                                                    [selectedTests[0].testPanelReport.testMasterReportList[0].testReport.testReportId]: {
                                                                        ...prev[selectedTests[0].testPanelReport.testMasterReportList[0].testReport.testReportId],
                                                                        [week]: {
                                                                            ...prev[selectedTests[0].testPanelReport.testMasterReportList[0].testReport.testReportId]?.[week],
                                                                            comments: e.target.value
                                                                        }
                                                                    }
                                                                }))}
                                                            />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) :
                                    <p className="text-gray-600">Please select a test to view the report.</p>}
                            </div>

                            <button type="button"
                                className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-white rounded-md"
                                onClick={updateTestData}>Submit
                            </button>

                        </form>
                    </CustomModal>
                }
            </div>

            <div id="report-main-body-pdf">
                <div id="report-main-body" className="report-main-body">
                    <div className="address-part">
                        <div className="a-left">
                            <h5 className="hos-name">{centers.name}</h5>
                            <p>{centers.address}</p>
                        </div>
                        <div className="a-right">
                            <Image style={{ width: "100px" }} src="/logoreport1.png" alt="logo" />
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
                            {
                                primarySampleType && reportType === "BloodReport" && <h5><span>Sample Type</span><span
                                    className="capitalize text-blue-700 italic">{primarySampleType}</span></h5>
                            }
                            {
                                testReportDate && reportType !== "" && <h5><span>Report Date</span><span
                                    className="capitalize text-blue-700 italic">{formatDate(testReportDate)}</span>
                                </h5>
                            }
                        </div>
                    </div>
                    <hr />

                    {
                        setSelectedTests.length > 0 && reportType !== '' ? renderTestPanelReport(selectedTests, reportType) :
                            <p className="no-test-selected-msg text-center text-red-500">Please select a test name to
                                view
                                report</p>
                    }
                    <p>Digitally signed by</p>
                    {selectedEmployees.map((e) => {
                        return (
                            <div className="signature-part">
                                <p><strong>{e?.firstName} {e?.lastName}</strong></p>
                                <p>{e?.designation}</p>
                                <p>&nbsp;</p>
                                <div className="a-right">
                                    <Image style={{ width: "100px" }} src={e.url} alt="logo" />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            {ModalOpen && (<EditTemplate data={currentTemplate} onClose={onClose} />)}
        </div>
    );
};


const Invoice = ({data,centers,generatePdf}) => {
    const booking = data.bookingSlip
    const patient   = data.patientDetails
    return (
        <div>
        <div id="report-main-body-pdf" className="max-w-2xl">
          <div className="text-center">
                  <h2 className="font-bold text-2xl">Invoice</h2>
          </div>
           <div className="flex justify-between px-20 mt-10">
           <ul className="">
             <li className="flex text-xs mb-1">
                <div className="w-14 font-bold">Name :</div>
                <div>{patient.firstName} {patient.lastName}</div>
             </li>
             <li className="flex text-xs  mb-1">
                <div className="w-14 font-bold">Phone :</div>
                <div> {patient.phone}</div>
             </li>
             <li className="flex text-xs  mb-1">
                <div className="w-14 font-bold">Email :</div>
                <div> {patient.email}</div>
             </li>
             <li className="flex text-xs  mb-1">
                <div className="w-14 font-bold">Age :</div>
                <div>{patient.ageInYears} year {patient.ageInMonths} Months {patient.ageInMonths} Days</div>
             </li>
          </ul>

          <div className="">
            <h2 className="font-bold text-base mb-2">Center</h2>
             <ul>
             <li className="flex text-xs mb-1">
                <div className="w-14 font-bold">Name :</div>
                <div>{centers.name}</div>
             </li>
             <li className="flex text-xs  mb-1">
                <div className="w-14 font-bold">Address :</div>
                <div> {centers.address}</div>
             </li>
             <li className="flex text-xs  mb-1">
                <div className="w-14 font-bold">Phone :</div>
                <div> {centers.phone}</div>
             </li>
             </ul>
          </div>
           </div>

          <div className="px-20 mt-5 mb-5">
            <h2 className="font-bold text-base mb-2">Test List</h2>
             <ul>
             {booking.tests.map((e,i)=>{
                return(
                    <li className="flex text-xs mb-1" key={i}>
                    <div className=" font-bold mr-2">{e.name} : </div>
                    <div>$ {e.cost}</div>
                 </li>
                )
             })}
             </ul>
          </div>

            <table className="body-wrap">
                <tbody>
                    <tr>
                        <td></td>
                        <td className="container p-0" width="600">
                            <div className="content">
                                <table className="main" width="100%" cellpadding="0" cellspacing="0">
                                    <tbody>
                                        <tr>
                                            <td className="content-wrap aligncenter p-0">
                                                <table width="100%" cellpadding="0" cellspacing="0">
                                                    <tbody>
                                                        <tr>
                                                            <td className="content-block">
                                                                <table className="invoice">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>
                                                                                <table className="invoice-items" cellpadding="0"
                                                                                    cellspacing="0">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td className="text-left">Net Amount</td>
                                                                                            <td className="alignright">$ {booking.net}</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td className="text-left">Paid Amount</td>
                                                                                            <td className="alignright">$ {booking.paid}</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td className="text-left">Payable Amount
                                                                                          </td>
                                                                                            <td className="alignright">$ {booking.balance}</td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className="download-pdf-icon absolute right-4 top-5"><FontAwesomeIcon onClick={generatePdf} icon={faFilePdf} />
        </div>
        </div>
    )
}

const EditTemplate = ({ data, onClose }) => {
    const { register, control, watch, handleSubmit, reset } = useForm({
        defaultValues: data ?? {}
    });
    async function onSubmit(updateData) {
        try {
            await specificApis.updateReportTemplate(updateData, data.testReportId);
            onClose()
        } catch (error) {
            console.error('Error updating test:', error);
        }
    }
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center overflow-auto justify-center p-4">
            <div className="bg-white p-5 rounded-lg shadow-lg w-full">
                <h2 className="text-xl font-bold text-gray-700 mb-4"> Edit Template</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="mb-3">
                            <label className="block  text-sm font-bold mb-2">Template Code:</label>
                            <input
                                type="text" name="name" placeholder="Template Code" {...register(`templateCode`)} required={true}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div>
                            <label className="block  text-sm font-bold mb-2">header:</label>
                            <input
                                type="text" name="code" placeholder="header" {...register(`header`)} required
                                className="shadow mb-3 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    </div>
                    {/* <div className="grid grid-cols-3 gap-2">
         <div className="mb-3">
            <label className="block  text-sm font-bold mb-2">Template Code</label>
            <input
                type="text" name="name" placeholder="Template Code" {...register(`investigationValueMap`)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label className="block  text-sm font-bold mb-2">header</label>
            <input
                type="text" name="code" placeholder="header" {...register(`header`)}
                className="shadow mb-3 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label className="block  text-sm font-bold mb-2">header</label>
            <input
                type="text" name="code" placeholder="header" {...register(`header`)}
                className="shadow mb-3 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
         </div> */}
                    <div>
                        <div>
                            <label className="block  text-sm font-bold mb-2">Body</label>
                            <textarea  {...register(`body`)} required className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                        </div>
                        <div>
                            <label className="block  text-sm font-bold mb-2">Impression</label>
                            <textarea  {...register(`impression`)} required className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                        </div>
                    </div>
                    <div className="flex justify-end items-center mt-4 gap-3">
                        <button type="button" onClick={onClose} className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancel</button>
                        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Save Template</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const AllBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [showModal, setShowModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [editBooking, setEditBooking] = useState(false)


    useEffect(() => {
        getBooking()
    }, [date]);

    function getBooking() {
        specificApis.getBookings(date, "")
            .then(response => {
                setBookings(response);
            })
            .catch(error => {
                console.error('Failed to fetch bookings:', error);
            });
    }

    const handleOpenModal = (booking) => {
        setSelectedBooking(booking)
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedBooking(null);
        getBooking()
    };

    function onClose() {
        setEditBooking(false)
        setSelectedBooking(null)
        getBooking()
    }

    return (
        <>
            {editBooking ? <Booking isEdit={true} data={selectedBooking} onClose={onClose} /> : (
                <div className="max-w-7xl mx-auto">
                    <h6 className="uppercase font-extrabold text-xl"><FontAwesomeIcon icon={faRestroom} /> | ALL
                        Bookings</h6>
                    <hr />
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
                            {bookings.map((booking, i) => (
                                <div key={booking.id + i} className="card overflow-hidden shadow rounded-lg">
                                    <div className="card-body flex justify-between">
                                        <h2 className="text-lg card-title font-bold">
                                            {booking.patientDetails.firstName} {booking.patientDetails.lastName}
                                        </h2>
                                        <span>
                                            <FontAwesomeIcon className="f-aw-edit me-1" icon={faEdit}
                                                onClick={() => {
                                                    setEditBooking(booking.bookingSlip.receiptId)
                                                    setSelectedBooking(booking)
                                                }} />
                                        </span>
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
                                            <FaDownload className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                                            View and Download PDF
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <CustomModal showModal={showModal} handleClose={handleCloseModal}>
                        {selectedBooking && <TestComponent data={selectedBooking} />}
                    </CustomModal>
                </div>
            )}
        </>
    );
};

export default AllBooking;

