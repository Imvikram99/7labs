import React, { useState } from 'react';

function AddLabCenterModal({ isOpen, onClose, onSave }) {
  const [centerDetails, setCenterDetails] = useState({
    name: '',
    address: '',
    phone: '',
    isCertified: '',
    partnershipType: ''
  });

  const handleChange = (e) => {
    setCenterDetails({ ...centerDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(centerDetails);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Add New Lab Center</h2>
        <form onSubmit={handleSubmit}>
          <input className="block w-full p-2 border rounded mb-3" type="text" name="name" placeholder="Center Name" value={centerDetails.name} onChange={handleChange} required />
          <input className="block w-full p-2 border rounded mb-3" type="text" name="address" placeholder="Address" value={centerDetails.address} onChange={handleChange} required />
          <input className="block w-full p-2 border rounded mb-3" type="text" name="phone" placeholder="Phone" value={centerDetails.phone} onChange={handleChange} required />
          <input className="block w-full p-2 border rounded mb-3" type="text" name="isCertified" placeholder="Is Certified (yes/no)" value={centerDetails.isCertified} onChange={handleChange} required />
          <select className="block w-full p-2 border rounded mb-3" name="partnershipType" value={centerDetails.partnershipType} onChange={handleChange} required>
            <option value="">Select Partnership Type</option>
            <option value="own">Own</option>
            <option value="partner">Partner</option>
          </select>
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">Save</button>
            <button type="button" onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddLabCenterModal;
