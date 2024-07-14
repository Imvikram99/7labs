import React, {useEffect, useState} from 'react';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  designation: '',
  addressLine1: '',
  addressLine2: '',
  addressLine3: '',
  employeeType: '',
  pinCode: '',
  gender: '',
  dob: '',
  joiningDate: ''
};

function AddEmployeeModal({ isOpen, onClose, onSave,data,isEdit }) {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    setFormData(data ?? initialState);
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center overflow-auto justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-6/12">
        <h2 className="text-xl font-bold mb-3">{isEdit ? 'Edit' : 'Add New'} Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3 items-center">
            <input
                type="text" name="firstName" value={formData.firstName} onChange={handleChange}
                placeholder="First Name" required/>
            <input
                type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name"
                required/>
            <input
                type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email"
                required/>
            <input
                type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone"
                required/>
            <input
                type="text" name="designation" value={formData.designation} onChange={handleChange}
                placeholder="Designation" required/>
            <input
                type="text" name="addressLine1" value={formData.addressLine1} onChange={handleChange}
                placeholder="Address Line 1"/>
            <input
                type="text" name="addressLine2" value={formData.addressLine2} onChange={handleChange}
                placeholder="Address Line 2"/>
            <input
                type="text" name="addressLine3" value={formData.addressLine3} onChange={handleChange}
                placeholder="Address Line 3"/>
            <input type="text" name="pinCode" value={formData.pinCode} onChange={handleChange} placeholder="pinCode"/>
            <div>
              <select
                  name="gender"
                  value={formData.gender} onChange={handleChange}
                  required={true}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border">
                <option value={""}>Select Gender</option>
                <option value={"MALE"}>Male</option>
                <option value={"FEMALE"}>Female</option>
                <option value={"OTHER"}>Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="dob" className="text-xs">Date Of Birth</label>
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} placeholder="Date of Birth"/>
            </div>
            <div>
              <label htmlFor="dob" className="text-xs">Joining Date</label>
              <input
                  type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange}
                  placeholder="Joining Date"/>
            </div>
            <div>
              <select
                  name="employeeType"
                  value={formData.employeeType}
                  onChange={handleChange}
                  required={true}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border">
                <option value={""}>Employee Type</option>
                <option value={"RECEPTIONIST"}>Receptionist</option>
                <option value={"NURSE"}>Nurse</option>
                <option value={"ADMIN"}>Admin</option>
                <option value={"DOCTOR"}>Doctor</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-3">
            <button
                onClick={onClose}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Cancel
            </button>
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmployeeModal;