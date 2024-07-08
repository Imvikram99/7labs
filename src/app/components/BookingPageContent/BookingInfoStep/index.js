import React from 'react';

const BookingInfoStep = (props) => {
    const {formData,testPanel,setFormData,addTest,handleChange} = props;
    return (
        <>
            <div className="mb-4">
                <h3 className="text-xl font-bolder mb-2 base-blue">Tests</h3>
                {formData.bookingSlip.tests.map((test, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
                    >
                        <div>
                            <label
                                className="block text-sm mb-2"
                                htmlFor={`testName-${index}`}
                            >
                                Test Name
                            </label>
                            <select
                                name="name"
                                value={test.name}
                                //   onChange={(e) => handleChange(e, index)}
                                onChange={(e) => handleChange(e, index)}
                                // onChange={(e)=>{

                                // }}
                                className="w-full"
                            >
                                <option value="">Select a test</option>
                                {testPanel?.map((testOption) => (
                                    <option key={testOption.id} value={testOption.name}>
                                        {testOption.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label
                                className="block text-sm mb-2"
                                htmlFor={`testName-${index}`}
                            >
                                Test Name
                            </label>
                            <input
                                type="text"
                                name={`name`}
                                value={test.name}
                                onChange={(e) => handleChange(e, index)}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label
                                className="block text-sm mb-2"
                                htmlFor={`barCode-${index}`}
                            >
                                Bar Code
                            </label>
                            <input
                                type="text"
                                name={`barCode`}
                                value={test.barCode}
                                onChange={(e) => handleChange(e, index)}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label
                                className="block text-sm mb-2"
                                htmlFor={`cost-${index}`}
                            >
                                Cost
                            </label>
                            <input
                                type="number"
                                name={`cost`}
                                value={test.cost}
                                onChange={(e) => handleChange(e, index)}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label
                                className="block text-sm mb-2"
                                htmlFor={`code-${index}`}
                            >
                                Code
                            </label>
                            <input
                                type="text"
                                name={`code`}
                                value={test.code}
                                onChange={(e) => handleChange(e, index)}
                                className="w-full"
                            />
                        </div>
                        <div className="flex items-end">
                            {index === formData.bookingSlip.tests.length - 1 && (
                                <button
                                    type="button"
                                    onClick={addTest}
                                    className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md bg-blue-500 hover:bg-blue-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Add Test
                                </button>
                            )}
                            {formData.bookingSlip.tests.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeTest(index)}
                                    className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                >
                                    Remove Test
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Additional Booking Slip Details */}
            <div className="mb-4">
                <h3 className="text-xl font-bolder mb-2 base-blue">Booking Slip Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label
                            className="block text-sm mb-2"
                            htmlFor="referralDoctorId"
                        >
                            Referral Doctor ID
                        </label>
                        <input
                            type="text"
                            name="bookingSlip.referralDoctorId"
                            value={formData.bookingSlip.referralDoctorId}
                            onChange={(e) =>
                                setFormData((prevData) => ({
                                    ...prevData,
                                    bookingSlip: {
                                        ...prevData.bookingSlip,
                                        referralDoctorId: e.target.value,
                                    },
                                }))
                            }
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label
                            className="block text-sm mb-2"
                            htmlFor="paymentMode"
                        >
                            Payment Mode
                        </label>
                        <input
                            type="text"
                            name="bookingSlip.paymentMode"
                            value={formData.bookingSlip.paymentMode}
                            onChange={(e) =>
                                setFormData((prevData) => ({
                                    ...prevData,
                                    bookingSlip: {
                                        ...prevData.bookingSlip,
                                        paymentMode: e.target.value,
                                    },
                                }))
                            }
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label
                            className="block text-sm mb-2"
                            htmlFor="net"
                        >
                            Net Amount
                        </label>
                        <input
                            type="number"
                            name="bookingSlip.net"
                            value={formData.bookingSlip.net}
                            onChange={(e) =>
                                setFormData((prevData) => ({
                                    ...prevData,
                                    bookingSlip: {
                                        ...prevData.bookingSlip,
                                        net: parseFloat(e.target.value),
                                    },
                                }))
                            }
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label
                            className="block text-sm mb-2"
                            htmlFor="paid"
                        >
                            Paid Amount
                        </label>
                        <input
                            type="number"
                            name="bookingSlip.paid"
                            value={formData.bookingSlip.paid}
                            onChange={(e) =>
                                setFormData((prevData) => ({
                                    ...prevData,
                                    bookingSlip: {
                                        ...prevData.bookingSlip,
                                        paid: parseFloat(e.target.value),
                                    },
                                }))
                            }
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label
                            className="block text-sm mb-2"
                            htmlFor="balance"
                        >
                            Balance Amount
                        </label>
                        <input
                            type="number"
                            name="bookingSlip.balance"
                            value={formData.bookingSlip.balance}
                            onChange={(e) =>
                                setFormData((prevData) => ({
                                    ...prevData,
                                    bookingSlip: {
                                        ...prevData.bookingSlip,
                                        balance: parseFloat(e.target.value),
                                    },
                                }))
                            }
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label
                            className="block text-sm mb-2"
                            htmlFor="sampleBy"
                        >
                            Sample By
                        </label>
                        <input
                            type="text"
                            name="bookingSlip.sampleBy"
                            value={formData.bookingSlip.sampleBy}
                            onChange={(e) =>
                                setFormData((prevData) => ({
                                    ...prevData,
                                    bookingSlip: {
                                        ...prevData.bookingSlip,
                                        sampleBy: e.target.value,
                                    },
                                }))
                            }
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label
                            className="block text-sm mb-2"
                            htmlFor="billedBy"
                        >
                            Billed By
                        </label>
                        <input
                            type="text"
                            name="bookingSlip.billedBy"
                            value={formData.bookingSlip.billedBy}
                            onChange={(e) =>
                                setFormData((prevData) => ({
                                    ...prevData,
                                    bookingSlip: {
                                        ...prevData.bookingSlip,
                                        billedBy: e.target.value,
                                    },
                                }))
                            }
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label
                            className="block text-sm mb-2"
                            htmlFor="date"
                        >
                            Date
                        </label>
                        <input
                            type="date"
                            name="bookingSlip.date"
                            value={formData.bookingSlip.date}
                            onChange={(e) =>
                                setFormData((prevData) => ({
                                    ...prevData,
                                    bookingSlip: {
                                        ...prevData.bookingSlip,
                                        date: e.target.value,
                                    },
                                }))
                            }
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label
                            className="block text-sm mb-2"
                            htmlFor="time"
                        >
                            Time
                        </label>
                        <input
                            type="time"
                            name="bookingSlip.time"
                            value={formData.bookingSlip.time}
                            onChange={(e) =>
                                setFormData((prevData) => ({
                                    ...prevData,
                                    bookingSlip: {
                                        ...prevData.bookingSlip,
                                        time: e.target.value,
                                    },
                                }))
                            }
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label
                            className="block text-sm mb-2"
                            htmlFor="centerCode"
                        >
                            Center Code
                        </label>
                        <input
                            type="text"
                            name="bookingSlip.centerCode"
                            value={formData.bookingSlip.centerCode}
                            onChange={(e) =>
                                setFormData((prevData) => ({
                                    ...prevData,
                                    bookingSlip: {
                                        ...prevData.bookingSlip,
                                        centerCode: e.target.value,
                                    },
                                }))
                            }
                            className="w-full"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookingInfoStep;