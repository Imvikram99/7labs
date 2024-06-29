"use client";

import React, {useState, useEffect} from "react";
import {specificApis} from "../data/SpecificApis";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faRestroom} from "@fortawesome/free-solid-svg-icons"; // Import API handling class

export default function PatientList() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPatients() {
            try {
                const fetchedPatients = await specificApis.fetchPatientList();
                console.log(fetchedPatients, "fetchedPatients");
                setPatients(fetchedPatients);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch patients:", error);
                setLoading(false);
            }
        }

        fetchPatients();
    }, []);

    return (
        <div className="max-w-7xl mx-auto">
            <h6 className="uppercase font-extrabold text-xl text-white"><FontAwesomeIcon icon={faList}/> | Patient List
            </h6>
            <hr/>
            <div className="card">
                <div className="card-body">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <table className="table-auto w-full">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>DOB</th>
                                <th>Address</th>
                            </tr>
                            </thead>
                            <tbody>
                            {patients.length > 0 &&
                                patients?.map((patient, index) => (
                                    <tr key={index}>
                                        <td>{patient.name}</td>
                                        <td>{patient.dob}</td>
                                        <td>{patient.address}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
