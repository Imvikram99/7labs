'use client';

import React, {useState, useEffect} from 'react';
import {specificApis} from '../data/SpecificApis';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons"; // Import API handling class

export default function FinancialAnalysis() {
    const [financialData, setFinancialData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchFinancialData() {
            try {
                const fetchedData = await specificApis.analyzeFinances();
                setFinancialData(fetchedData);
                setLoading(false);
            } catch (error) {
                console.error('Failed to analyze finances:', error);
                setLoading(false);
            }
        }

        fetchFinancialData();
    }, []);

    return (
        <div className="max-w-7xl mx-auto">
            <h6 className="uppercase font-extrabold text-xl text-white"><FontAwesomeIcon icon={faList}/> | Financial
                Analysis
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
                                <th>Month</th>
                                <th>Revenue</th>
                                <th>Expenses</th>
                                <th>Profit</th>
                            </tr>
                            </thead>
                            <tbody>
                            {financialData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.month}</td>
                                    <td>{item.revenue}</td>
                                    <td>{item.expenses}</td>
                                    <td>{item.profit}</td>
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
