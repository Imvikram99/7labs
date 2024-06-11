import React, { useState } from 'react';

function AddEmployeeModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    designation: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    pincode: '',
    dob: '',
    joiningDate: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-xl font-bold">Add New Employee</h2>
        <form onSubmit={handleSubmit}>
          {/* Include form inputs for all fields */}
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
          <input type="text" name="designation" value={formData.designation} onChange={handleChange} placeholder="Designation" required />
          <input type="text" name="addressLine1" value={formData.addressLine1} onChange={handleChange} placeholder="Address Line 1" />
          <input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleChange} placeholder="Address Line 2" />
          <input type="text" name="addressLine3" value={formData.addressLine3} onChange={handleChange} placeholder="Address Line 3" />
          <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" />
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} placeholder="Date of Birth" />
          <input type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} placeholder="Joining Date" />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
          <button onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">Cancel</button>
        </form>
      </div>
    </div>
  );
}
export default AddEmployeeModal;