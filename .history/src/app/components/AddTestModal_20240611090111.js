import React, { useState } from 'react';

function AddTestModal({ isOpen, onClose, onSave }) {
  const [testDetails, setTestDetails] = useState({
    name: '',
    code: '',
    department: '',
    sampleType: '',
    cost: ''
  });

  const handleChange = (e) => {
    setTestDetails({...testDetails, [e.target.name]: e.target.value});
  };

  const handleSubmit = () => {
    onSave(testTypeDetails);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-background">
      <div className="modal-content">
        <h2>Add New Test</h2>
        <input type="text" name="name" placeholder="Test Name" onChange={handleChange} value={testDetails.name} />
        {/* Similar inputs for code, department, sampleType, and cost */}
        <button onClick={handleSubmit}>Save Test</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default AddTestModal;
