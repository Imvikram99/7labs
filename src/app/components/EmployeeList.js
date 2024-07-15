import React, { useState, useEffect } from 'react';
import { specificApis } from '../data/SpecificApis'; // Import API handling class
import AddEmployeeModal from './AddEmployeeModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faFileUpload } from '@fortawesome/free-solid-svg-icons';
import FileUpload from './FileUpload/FileUpload';
import { CustomModal } from './CustomModal';
import toast from "react-hot-toast";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [isEdit, setIsEdit] = useState(null);
  

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

  const handleDetailsModal = () => {
    fetchEmployees();
    setShowDetailsModal(prevState => !prevState);
};

function onClose(){
  setSelectedCenter(null)
  setIsEdit(null)
  setModalOpen(false)
}

  const handleAddEmployee = async (newEmployee) => {
    try {
      await specificApis.addEmployee(newEmployee).then(()=>{
        toast.success('Employee Added successfully.')
        fetchEmployees();
        setModalOpen(false);
      })
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleUpdateEmployee = async (newEmployee) => {
    try {
      await specificApis.updateEmployee(newEmployee,isEdit).then(()=>{
        toast.success('Employee Updated successfully.')
        fetchEmployees();
        onClose();
      })
    } catch (error) {
      console.error('Error Updateing employee:', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 w-full">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full">
        <div className="flex justify-end">
          <button
              className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setModalOpen(true)}>
            Add Employee
          </button>
        </div>
        <AddEmployeeModal isOpen={modalOpen} onClose={() => onClose()} onSave={isEdit ? handleUpdateEmployee : handleAddEmployee} data={selectedCenter} isEdit={isEdit}/>
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
                <th className="px-4 py-2 text-left text-gray-600">Joining Date/</th>
                <th>Action</th>
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
                  <td className="border px-4 py-2">{employee.dob}</td>
                  <td className="border px-4 py-2"> {employee.joiningDate}</td>
                  <td>
                    <FontAwesomeIcon className="f-aw-upload me-1" icon={faFileUpload}
                      onClick={() => {
                        handleDetailsModal();
                        setSelectedCenter(employee)
                      }} />
                       <FontAwesomeIcon className="f-aw-edit me-1" icon={faEdit}
                                                                     onClick={() => {
                                                                      setSelectedCenter(employee)
                                                                      setIsEdit(employee.empId)
                                                                      setModalOpen(true);
                                                                    }}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No employees found. Please add some employees.</div>
        )}
      </div>
      {
                showDetailsModal && (
                    <CustomModal showModal={showDetailsModal} handleClose={handleDetailsModal}>
                        <h2 className="text-xl font-bold text-gray-700 mb-4">Lab Center Profile</h2>
                        <hr/>
                        <FileUpload center={selectedCenter} apiFunction={'addEmployeeSignature'} type={'employee'}/>
                    </CustomModal>
                )
            }
    </main>
  );
}
