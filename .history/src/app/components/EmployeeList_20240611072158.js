import React, { useState, useEffect } from 'react';
import { specificApis } from '../data/SpecificApis'; // Import API handling class
import AddEmployeeModal from './AddEmployeeModal';

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const fetchedEmployees = await specificApis.fetchEmployeeList();
      if (Array.isArray(fetchedEmployees)) {
        setEmployees(fetchedEmployees);
      } else {
        setEmployees([]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch employees:', error);
      setLoading(false);
    }
  };

  const handleAddEmployee = async (newEmployee) => {
    try {
      await specificApis.addEmployee(newEmployee);
      fetchEmployees();
      setModalOpen(false);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 w-full">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-4xl">
        <button className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setModalOpen(true)}>
          Add Employee
        </button>
        <AddEmployeeModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSave={handleAddEmployee} />
        {loading ? (
          <div>Loading...</div>
        ) : employees.length > 0 ? (
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left text-gray-600">Full Name</th>
                <th className="px-4 py-2 text-left text-gray-600">Email</th>
                <th className="px-4 py-2 text-left text-gray-600">Phone</th>
                <th className="px-4 py-2 text-left text-gray-600">Designation</th>
                <th className="px-4 py-2 text-left text-gray-600">Address</th>
                <th className="px-4 py-2 text-left text-gray-600">DOB/</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={index} className="bg-gray-50 hover:bg-gray-100">
                  <td className="border px-4 py-2">{employee.firstName} {employee.lastName}</td>
                  <td className="border px-4 py-2">{employee.email}</td>
                  <td className="border px-4 py-2">{employee.phone}</td>
                  <td className="border px-4 py-2">{employee.designation}</td>
                  <td className="border px-4 py-2">
                    {employee.addressLine1}, {employee.addressLine2 ? `${employee.addressLine2}, ` : ''}{employee.addressLine3 ? `${employee.addressBuffer3}, ` : ''}{employee.pincode}
                  </td>
                  <td className="border px-4 py-2">{employee.dob} / {employee.joiningDate }</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No employees found. Please add some employees.</div>
        )}
      </div>
    </main>
  );
}
