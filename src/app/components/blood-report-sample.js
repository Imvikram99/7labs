import React, { useState } from 'react';
import { specificApis } from '../data/SpecificApis';

export default function LabProfile() {
    const [selectedTests, setSelectedTests] = useState([]);
    const nestedData = {
        "bookingSlip": {
            "receiptId": "61",
            "patientId": "61",
            "tests": [
                {
                    "id": "fe785fc7",
                    "name": "complete blood count real",
                    "barCode": "12345",
                    "cost": 3000.0,
                    "code": "bloot-fit",
                    "testPanelReport": {
                        "name": "complete blood count real",
                        "testMasterReportList": [
                            {
                                "testMasterName": "cbc-up",
                                "testReport": null,
                                "testMasterReports": [
                                    {
                                        "testMasterName": "hemoglobin",
                                        "testReport": {
                                            "report_type": "BloodReport",
                                            "investigation": "hemoglobin",
                                            "value": 0.0,
                                            "unit": "0",
                                            "minReferenceValue": 13.0,
                                            "maxReferenceValue": 17.0,
                                            "testReportId": "864df783",
                                            "testReportDate": "2024-07-02T05:08:55.093+00:00",
                                            "primarySampleType": "blood"
                                        },
                                        "testMasterReports": null
                                    },
                                    {
                                        "testMasterName": "packed cell volume",
                                        "testReport": {
                                            "report_type": "BloodReport",
                                            "investigation": "packed cell volume",
                                            "value": 0.0,
                                            "unit": "%",
                                            "minReferenceValue": 40.0,
                                            "maxReferenceValue": 50.0,
                                            "testReportId": "8ccb6c05",
                                            "testReportDate": "2024-07-02T05:08:55.093+00:00",
                                            "primarySampleType": "blood"
                                        },
                                        "testMasterReports": null
                                    }
                                ]
                            },
                            {
                                "testMasterName": "differential leucocyte count",
                                "testReport": null,
                                "testMasterReports": [
                                    {
                                        "testMasterName": "segmented neutrophils",
                                        "testReport": {
                                            "report_type": "BloodReport",
                                            "investigation": "segmented neutrophils",
                                            "value": 0.0,
                                            "unit": "%",
                                            "minReferenceValue": 40.0,
                                            "maxReferenceValue": 80.0,
                                            "testReportId": "4cdd8a4c",
                                            "testReportDate": "2024-07-02T05:08:55.093+00:00",
                                            "primarySampleType": "blood"
                                        },
                                        "testMasterReports": null
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    "id": "520cb875",
                    "name": "complete blood count real",
                    "barCode": null,
                    "cost": 3000.0,
                    "code": "bloot-fit",
                    "testPanelReport": {
                        "name": "complete blood count real",
                        "testMasterReportList": [
                            {
                                "testMasterName": "cbc-up",
                                "testReport": null,
                                "testMasterReports": [
                                    {
                                        "testMasterName": "hemoglobin",
                                        "testReport": {
                                            "report_type": "BloodReport",
                                            "investigation": "hemoglobin",
                                            "value": 0.0,
                                            "unit": "0",
                                            "minReferenceValue": 13.0,
                                            "maxReferenceValue": 17.0,
                                            "testReportId": "40afd5b1",
                                            "testReportDate": "2024-07-02T05:08:55.093+00:00",
                                            "primarySampleType": "blood"
                                        },
                                        "testMasterReports": null
                                    },
                                    {
                                        "testMasterName": "packed cell volume",
                                        "testReport": {
                                            "report_type": "BloodReport",
                                            "investigation": "packed cell volume",
                                            "value": 0.0,
                                            "unit": "%",
                                            "minReferenceValue": 40.0,
                                            "maxReferenceValue": 50.0,
                                            "testReportId": "0465cdab",
                                            "testReportDate": "2024-07-02T05:08:55.093+00:00",
                                            "primarySampleType": "blood"
                                        },
                                        "testMasterReports": null
                                    }
                                ]
                            },
                            {
                                "testMasterName": "differential leucocyte count",
                                "testReport": null,
                                "testMasterReports": [
                                    {
                                        "testMasterName": "segmented neutrophils",
                                        "testReport": {
                                            "report_type": "BloodReport",
                                            "investigation": "segmented neutrophils",
                                            "value": 0.0,
                                            "unit": "%",
                                            "minReferenceValue": 40.0,
                                            "maxReferenceValue": 80.0,
                                            "testReportId": "5fac757e",
                                            "testReportDate": "2024-07-02T05:08:55.094+00:00",
                                            "primarySampleType": "blood"
                                        },
                                        "testMasterReports": null
                                    }
                                ]
                            }
                        ]
                    }
                }
            ],
            "referralDoctorId": "",
            "paymentMode": "Credit",
            "net": 3000.0,
            "paid": 3000.0,
            "balance": 0.0,
            "sampleBy": "",
            "billedBy": "",
            "date": "2024-07-02",
            "time": null,
            "centerCode": "000"
        },
        "patientDetails": {
            "patientId": "61",
            "designation": "Mr.",
            "firstName": "jonny",
            "lastName": "depp",
            "phone": "1234567890",
            "gender": "MALE",
            "email": "jonny@gmail.com",
            "addressLine1": "street 23",
            "addressLine2": "qwerty",
            "addressLine3": "newyork",
            "pinCode": "110090",
            "ageInYears": 25,
            "ageInMonths": null,
            "ageInDays": 20,
            "dob": "1999-06-06"
        }
    };

    const handleSelectTest = (test) => {
        setSelectedTests([...selectedTests, test]);
    };

    const handleRemoveTest = (testId) => {
        setSelectedTests(selectedTests.filter(test => test.id !== testId));
    };

    // Improved renderData function
    const renderData = (testMasterReportList) => {
        return testMasterReportList.map((testMaster, index) => (
            <React.Fragment key={index}>
                {testMaster.testMasterReports && testMaster.testMasterReports.map((report, idx) => (
                    <tr key={idx}>
                        <td>{testMaster.testMasterName}</td>
                        {report.testReport && Object.entries(report.testReport).filter(([key, _]) => key !== "report_type").map(([key, value]) => (
                            <td key={key}>{value}</td>
                        ))}
                    </tr>
                ))}
            </React.Fragment>
        ));
    };

    return (
        <div className="p-5 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4 text-blue-700">Blood Report</h1>
            <div className="flex flex-wrap gap-2 mb-4">
                {nestedData.bookingSlip.tests.map((test, index) => (
                    <button
                        key={index}
                        onClick={() => handleSelectTest(test)}
                        className="px-4 py-2 rounded-full bg-gray-300 text-gray-700 hover:bg-blue-700 hover:text-white"
                    >
                        {test.name}
                    </button>
                ))}
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md">
                {selectedTests.length > 0 ? (
                    <>
                        {selectedTests.map((test, index) => (
                            <div key={index}>
                                <h2 className="text-lg font-bold mb-2">{test.name}</h2>
                                <table className="table-auto w-full mb-4">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2">Test Name</th>
                                            <th className="px-4 py-2">Investigation</th>
                                            <th className="px-4 py-2">Value</th>
                                            <th className="px-4 py-2">Unit</th>
                                            <th className="px-4 py-2">Min Reference Value</th>
                                            <th className="px-4 py-2">Max Reference Value</th>
                                            <th className="px-4 py-2">Test Report ID</th>
                                            <th className="px-4 py-2">Test Report Date</th>
                                            <th className="px-4 py-2">Primary Sample Type</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderData(test.testPanelReport.testMasterReportList)}
                                    </tbody>
                                </table>
                                <button
                                    onClick={() => handleRemoveTest(test.id)}
                                    className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-700"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </>
                ) : <p className="text-gray-600">Please select a test to view the report.</p>}
            </div>
        </div>
    );

}


