import React from 'react';

const PatientRegistrationStep = (props) => {
    const {searchResults,updateProfile,setUpdateProfile,formData,handleChange,setFormData } = props;
    return (
        <div className="mb-4">
            <div className="flex justify-between mt-4">
                {" "}
                <h3 className="text-xl font-bolder mb-2 base-blue">Patient Details</h3>
                {/*{Object.keys(searchResults).length > 0 && (*/}
                {/*    <button*/}
                {/*        className=" py-2 px-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md"*/}
                {/*        onClick={() => {*/}
                {/*            setUpdateProfile(true);*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        Update Profile*/}
                {/*    </button>*/}
                {/*)}*/}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label
                        className="block text-sm mb-2"
                        htmlFor="designation"
                    >
                        Designation
                    </label>
                    <input
                        type="text"
                        name="patientDetails.designation"
                        value={formData.patientDetails.designation}
                        readOnly={!updateProfile}
                        onChange={(e) =>
                            setFormData((prevData) => ({
                                ...prevData,
                                patientDetails: {
                                    ...prevData.patientDetails,
                                    designation: e.target.value,
                                },
                            }))
                        }
                        className="w-full"
                    />
                </div>
                <div>
                    <label
                        className="block text-sm mb-2"
                        htmlFor="firstName"
                    >
                        First Name
                    </label>
                    <input
                        type="text"
                        readOnly={!updateProfile}
                        name="patientDetails.firstName"
                        value={formData.patientDetails.firstName}
                        onChange={(e) =>
                            setFormData((prevData) => ({
                                ...prevData,
                                patientDetails: {
                                    ...prevData.patientDetails,
                                    firstName: e.target.value,
                                },
                            }))
                        }
                        className="w-full"
                    />
                </div>
                <div>
                    <label
                        className="block text-sm mb-2"
                        htmlFor="lastName"
                    >
                        Last Name
                    </label>
                    <input
                        readOnly={!updateProfile}
                        type="text"
                        name="patientDetails.lastName"
                        value={formData.patientDetails.lastName}
                        onChange={(e) =>
                            setFormData((prevData) => ({
                                ...prevData,
                                patientDetails: {
                                    ...prevData.patientDetails,
                                    lastName: e.target.value,
                                },
                            }))
                        }
                        className="w-full"
                    />
                </div>
                <div>
                    <label
                        className="block text-sm mb-2"
                        htmlFor="phone"
                    >
                        Phone
                    </label>
                    <input
                        readOnly={!updateProfile}
                        type="text"
                        name="patientDetails.phone"
                        value={formData.patientDetails.phone}
                        onChange={(e) =>
                            setFormData((prevData) => ({
                                ...prevData,
                                patientDetails: {
                                    ...prevData.patientDetails,
                                    phone: e.target.value,
                                },
                            }))
                        }
                        className="w-full"
                    />
                </div>
                <div>
                    <label
                        className="block text-sm mb-2"
                        htmlFor="gender"
                    >
                        Gender
                    </label>
                    <select
                        disabled={!updateProfile}
                        name="patientDetails.gender"
                        value={formData.patientDetails.gender}
                        onChange={(e) =>
                            setFormData((prevData) => ({
                                ...prevData,
                                patientDetails: {
                                    ...prevData.patientDetails,
                                    gender: e.target.value,
                                },
                            }))
                        }
                        className="w-full"
                    >
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="OTHER">Other</option>
                    </select>
                </div>
                <div>
                    <label
                        className="block text-sm mb-2"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        readOnly={!updateProfile}
                        type="email"
                        name="patientDetails.email"
                        value={formData.patientDetails.email}
                        onChange={(e) =>
                            setFormData((prevData) => ({
                                ...prevData,
                                patientDetails: {
                                    ...prevData.patientDetails,
                                    email: e.target.value,
                                },
                            }))
                        }
                        className="w-full"
                    />
                </div>
                <div>
                    <label
                        className="block text-sm mb-2"
                        htmlFor="addressLine1"
                    >
                        Address Line 1
                    </label>
                    <input
                        type="text"
                        readOnly={!updateProfile}
                        name="patientDetails.addressLine1"
                        value={formData.patientDetails.addressLine1}
                        onChange={(e) =>
                            setFormData((prevData) => ({
                                ...prevData,
                                patientDetails: {
                                    ...prevData.patientDetails,
                                    addressLine1: e.target.value,
                                },
                            }))
                        }
                        className="w-full"
                    />
                </div>
                <div>
                    <label
                        className="block text-sm mb-2"
                        htmlFor="addressLine2"
                    >
                        Address Line 2
                    </label>
                    <input
                        type="text"
                        readOnly={!updateProfile}
                        name="patientDetails.addressLine2"
                        value={formData.patientDetails.addressLine2}
                        onChange={(e) =>
                            setFormData((prevData) => ({
                                ...prevData,
                                patientDetails: {
                                    ...prevData.patientDetails,
                                    addressLine2: e.target.value,
                                },
                            }))
                        }
                        className="w-full"
                    />
                </div>
                <div>
                    <label
                        className="block text-sm mb-2"
                        htmlFor="addressLine3"
                    >
                        Address Line 3
                    </label>
                    <input
                        readOnly={!updateProfile}
                        type="text"
                        name="patientDetails.addressLine3"
                        value={formData.patientDetails.addressLine3}
                        onChange={(e) =>
                            setFormData((prevData) => ({
                                ...prevData,
                                patientDetails: {
                                    ...prevData.patientDetails,
                                    addressLine3: e.target.value,
                                },
                            }))
                        }
                        className="w-full"
                    />
                </div>
                <div>
                    <label
                        className="block text-sm mb-2"
                        htmlFor="pinCode"
                    >
                        Pin Code
                    </label>
                    <input
                        readOnly={!updateProfile}
                        type="text"
                        name="patientDetails.pinCode"
                        value={formData.patientDetails.pinCode}
                        onChange={(e) =>
                            setFormData((prevData) => ({
                                ...prevData,
                                patientDetails: {
                                    ...prevData.patientDetails,
                                    pinCode: e.target.value,
                                },
                            }))
                        }
                        className="w-full"
                    />
                </div>
                <div>
                    <label
                        className="block text-sm mb-2"
                        htmlFor="ageInYears"
                    >
                        Age (Years)
                    </label>
                    <input
                        readOnly={!updateProfile}
                        type="number"
                        name="patientDetails.ageInYears"
                        value={formData.patientDetails.ageInYears}
                        onChange={(e) =>
                            setFormData((prevData) => ({
                                ...prevData,
                                patientDetails: {
                                    ...prevData.patientDetails,
                                    ageInYears: parseInt(e.target.value),
                                },
                            }))
                        }
                        className="w-full"
                    />
                </div>
                <div>
                    <label
                        className="block text-sm mb-2"
                        htmlFor="ageInMonths"
                    >
                        Age (Months)
                    </label>
                    <input
                        type="number"
                        readOnly={!updateProfile}
                        name="patientDetails.ageInMonths"
                        value={formData.patientDetails.ageInMonths}
                        onChange={(e) =>
                            setFormData((prevData) => ({
                                ...prevData,
                                patientDetails: {
                                    ...prevData.patientDetails,
                                    ageInMonths: parseInt(e.target.value),
                                },
                            }))
                        }
                        className="w-full"
                    />
                </div>
                <div>
                    <label
                        className="block text-sm mb-2"
                        htmlFor="ageInDays"
                    >
                        Age (Days)
                    </label>
                    <input
                        readOnly={!updateProfile}
                        type="number"
                        name="patientDetails.ageInDays"
                        value={formData.patientDetails.ageInDays}
                        onChange={(e) =>
                            setFormData((prevData) => ({
                                ...prevData,
                                patientDetails: {
                                    ...prevData.patientDetails,
                                    ageInDays: parseInt(e.target.value),
                                },
                            }))
                        }
                        className="w-full"
                    />
                </div>
                <div>
                    <label
                        className="block text-sm mb-2"
                        htmlFor="dob"
                    >
                        Date of Birth
                    </label>
                    <input
                        type="date"
                        readOnly={!updateProfile}
                        name="patientDetails.dob"
                        value={formData.patientDetails.dob}
                        onChange={(e) =>
                            setFormData((prevData) => ({
                                ...prevData,
                                patientDetails: {
                                    ...prevData.patientDetails,
                                    dob: e.target.value,
                                },
                            }))
                        }
                        className="w-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default PatientRegistrationStep;