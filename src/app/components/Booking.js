import { useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";

const Booking = () => {
  const initialTest = {
    // id: "",
    name: "",
    barCode: "",
    cost: 0.0,
    code: "",
  };
  const [testPanel, setTestPanel] = useState([]);
  const [pdfData, setPdfData] = useState([]);
  const [updateProfile, setUpdateProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({});

  const handleSearch = async (event) => {
    event.preventDefault();

    // let url;
    let searchQueryType;
    if (/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(searchQuery)) {
      searchQueryType = "email";
    } else if (/^\d+$/.test(searchQuery)) {
      searchQueryType = "mobile";
    } else {
      alert("Please enter a valid search query (number or email address)");
      return;
    }

    const url = `http://ec2-13-233-207-62.ap-south-1.compute.amazonaws.com:8080/api/v1/lab/patient?searchQuery=${encodeURIComponent(
      searchQuery
    )}&searchQueryType=${encodeURIComponent(searchQueryType)}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-API-KEY": "test123",
        "X-PARTNER-ID": "PYTHONMAN2",
        "Content-Type": "application/json",
      },
      //   body: JSON.stringify({}),
    });

    const data = await response.json();

    // setSearchResults(data[0]);
    // console.log(searchResults, "search");
    if (data.length > 0) {
      setSearchResults(data[0]);
      setFormData((prevState) => ({
        ...prevState,
        patientDetails: {
          designation: data[0].designation,
          firstName: data[0].firstName,
          lastName: data[0].lastName,
          phone: data[0].phone,
          gender: data[0].gender,
          email: data[0].email,
          addressLine1: data[0].addressLine1,
          addressLine2: data[0].addressLine2,
          addressLine3: data[0].addressLine3,
          pinCode: data[0].pinCode,
          ageInYears: data[0].ageInYears,
          ageInMonths: data[0].ageInMonths,
          ageInDays: data[0].ageInDays,
          dob: data[0].dob,
        },
      }));
    } else {
      setSearchResults([]);
    }
    // setSearchQueryType(searchQueryType);
  };
  console.log(searchResults, "search");

  const [formData, setFormData] = useState({
    bookingSlip: {
      tests: [initialTest],
      referralDoctorId: "",
      paymentMode: "Credit",
      net: 0.0,
      paid: 0.0,
      balance: 0.0,
      sampleBy: "",
      billedBy: "",
      date: "",
      time: "",
      centerCode: "",
    },
    patientDetails: {
      designation: "Mr.",
      firstName: "",
      lastName: "",
      phone: "",
      gender: "MALE",
      email: "",
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      pinCode: "",
      ageInYears: 0,
      ageInMonths: 0,
      ageInDays: 0,
      dob: "",
    },
  });

  useEffect(() => {
    const fetchTestPanel = async () => {
      try {
        const response = await fetch(
          "http://ec2-13-233-207-62.ap-south-1.compute.amazonaws.com:8080/api/v1/lab/testpanel",
          {
            headers: {
              "X-API-KEY": "test123",
              "X-PARTNER-ID": "PYTHONMAN2",
            },
          }
        );
        const data = await response.json();
        setTestPanel(data);
      } catch (error) {
        console.error("Error fetching test panel data:", error);
      }
    };

    fetchTestPanel();
  }, []);

  console.log(testPanel, "data");

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      const updatedTests = [...prevState.bookingSlip.tests];
      if (name === "name") {
        const selectedTest = testPanel.find((test) => test.name === value);
        if (selectedTest) {
          updatedTests[index] = {
            // ...updatedTests[index],
            name: selectedTest.name,
            cost: parseFloat(selectedTest.cost), // Ensure cost is a number
            code: selectedTest.testPanelCode, // Set code to testPanelCode
          };
        }
      } else if (name === "barCode") {
        updatedTests[index] = {
          ...updatedTests[index],
          barCode: value,
        };
      } else {
        updatedTests[index] = {
          ...updatedTests[index],
          [name]: name === "cost" ? parseFloat(value) : value,
        };
      }
      return {
        ...prevState,
        bookingSlip: {
          ...prevState.bookingSlip,
          tests: updatedTests,
        },
      };
    });
  };

  const addTest = () => {
    setFormData((prevData) => ({
      ...prevData,
      bookingSlip: {
        ...prevData.bookingSlip,
        tests: [...prevData.bookingSlip.tests, initialTest],
      },
    }));
  };

  const removeTest = (index) => {
    const updatedTests = [...formData.bookingSlip.tests];
    updatedTests.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      bookingSlip: {
        ...prevData.bookingSlip,
        tests: updatedTests,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (updateProfile) {
      const response = await fetch(
        "http://ec2-13-233-207-62.ap-south-1.compute.amazonaws.com:8080/api/v1/lab/bookings?updateProfile=true",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "test123",
            "X-PARTNER-ID": "PYTHONMAN2",
          },
          //   body: JSON.stringify(formData),
          body: JSON.stringify({
            ...formData,
            patientId: searchResults.patientId, // Adding patientId to the formData
          }),
        }
      );
      const result = await response.json();
      setPdfData(result);
      console.log(result);
    } else {
      const response = await fetch(
        "http://ec2-13-233-207-62.ap-south-1.compute.amazonaws.com:8080/api/v1/lab/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "test123",
            "X-PARTNER-ID": "PYTHONMAN2",
          },
          body: JSON.stringify(formData),
        }
      );
      const result = await response.json();
      setPdfData(result);
      console.log(result);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Booking Form</h2>

      {/* Patient Details */}
      <div className="flex items-center border rounded-lg overflow-hidden">
        <input
          type="search"
          placeholder="Search"
          className="w-full px-3 py-2 border-none outline-none"
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <button
          className="px-3 py-3 bg-gray-200 hover:bg-gray-300 text-gray-600"
          onClick={handleSearch}
        >
          <IoSearchOutline
            className="text-black-500 test-2xl
          "
          />
        </button>
      </div>

      <div className="mb-4">
        <div className="flex justify-between mt-4">
          {" "}
          <h3 className="text-xl font-bold mb-2 ">Patient Details</h3>
          {Object.keys(searchResults).length > 0 && (
            <button
              className=" py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold"
              onClick={() => {
                setUpdateProfile(true);
              }}
            >
              Update Profile
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
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
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
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
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
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
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
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
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
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
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
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
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
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
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
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
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
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
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
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
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
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
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
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
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
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
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
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
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Tests */}
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Tests</h3>
        {formData.bookingSlip.tests.map((test, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
          >
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
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
                className="w-full px-3 py-2 border rounded-lg"
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
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor={`testName-${index}`}
              >
                Test Name
              </label>
              <input
                type="text"
                name={`name`}
                value={test.name}
                onChange={(e) => handleChange(e, index)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor={`barCode-${index}`}
              >
                Bar Code
              </label>
              <input
                type="text"
                name={`barCode`}
                value={test.barCode}
                onChange={(e) => handleChange(e, index)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor={`cost-${index}`}
              >
                Cost
              </label>
              <input
                type="number"
                name={`cost`}
                value={test.cost}
                onChange={(e) => handleChange(e, index)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor={`code-${index}`}
              >
                Code
              </label>
              <input
                type="text"
                name={`code`}
                value={test.code}
                onChange={(e) => handleChange(e, index)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="flex items-end">
              {index === formData.bookingSlip.tests.length - 1 && (
                <button
                  type="button"
                  onClick={addTest}
                  className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
        <h3 className="text-xl font-bold mb-2">Booking Slip Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
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
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
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
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
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
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
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
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
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
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
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
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
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
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
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
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
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
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
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
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-4">
        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Booking;
