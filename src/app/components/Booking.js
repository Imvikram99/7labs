import React, {useState, useEffect} from "react";
import {IoSearchOutline} from "react-icons/io5";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRestroom} from "@fortawesome/free-solid-svg-icons";
import PatientRegistrationStep from "@/app/components/BookingPageContent/PatientRegistrationStep";
import BookingInfoStep from "@/app/components/BookingPageContent/BookingInfoStep";

const Booking = () => {
    const initialTest = {
        // id: "",
        name: "",
        barCode: "",
        cost: 0.0,
        code: "",
    };
    const [testPanel, setTestPanel] = useState([]);
    const [activeStep, setActiveStep] = useState(1);
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


    const handleChange = (e, index) => {
        const {name, value} = e.target;
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
        if (activeStep === 1) {
            console.log(formData.patientDetails)
        }
        if (activeStep === 2) {

        }
        // if (updateProfile) {
        //     const response = await fetch(
        //         "http://ec2-13-233-207-62.ap-south-1.compute.amazonaws.com:8080/api/v1/lab/bookings?updateProfile=true",
        //         {
        //             method: "POST",
        //             headers: {
        //                 "Content-Type": "application/json",
        //                 "X-API-KEY": "test123",
        //                 "X-PARTNER-ID": "PYTHONMAN2",
        //             },
        //             //   body: JSON.stringify(formData),
        //             body: JSON.stringify({
        //                 ...formData,
        //                 patientId: searchResults.patientId, // Adding patientId to the formData
        //             }),
        //         }
        //     );
        //     const result = await response.json();
        //     setPdfData(result);
        //     console.log(result);
        // } else {
        //     const response = await fetch(
        //         "http://ec2-13-233-207-62.ap-south-1.compute.amazonaws.com:8080/api/v1/lab/bookings",
        //         {
        //             method: "POST",
        //             headers: {
        //                 "Content-Type": "application/json",
        //                 "X-API-KEY": "test123",
        //                 "X-PARTNER-ID": "PYTHONMAN2",
        //             },
        //             body: JSON.stringify(formData),
        //         }
        //     );
        //     const result = await response.json();
        //     setPdfData(result);
        //     console.log(result);
        // }
    };

    return (
        <div className="max-w-7xl mx-auto">
            <h6 className="uppercase font-extrabold text-xl"><FontAwesomeIcon icon={faRestroom}/> | Create
                Bookings</h6>
            <hr/>
            <form
                onSubmit={handleSubmit}
                className="card mx-auto p-4 bg-white shadow-md rounded-lg mb-4"
            >
                <h2 className="text-2xl font-bold mb-4">Booking Form</h2>

                {/* Patient Details */}
          {/*      <div className="search-patient-main flex items-center border rounded-lg overflow-hidden">*/}
          {/*          <input*/}
          {/*              type="search"*/}
          {/*              placeholder="Search"*/}
          {/*              className="w-full search-patient"*/}
          {/*              onChange={(event) => setSearchQuery(event.target.value)}*/}
          {/*          />*/}
          {/*          <button*/}
          {/*              className="px-3 py-3 bg-gray-200 hover:bg-gray-300 text-gray-600"*/}
          {/*              onClick={handleSearch}*/}
          {/*          >*/}
          {/*              <IoSearchOutline*/}
          {/*                  className="text-black-500 test-2xl*/}
          {/*"*/}
          {/*              />*/}
          {/*          </button>*/}
          {/*      </div>*/}

                {activeStep === 1 && (
                    <PatientRegistrationStep
                        formData={formData}
                        searchResults={searchResults}
                        updateProfile={true}
                        setUpdateProfile={setUpdateProfile}
                        setFormData={setFormData}
                        handleChange={handleChange}
                    />
                )}
                {activeStep === 2 && (
                    <BookingInfoStep
                        formData={formData}
                        testPanel={testPanel}
                        setFormData={setFormData}
                        addTest={addTest}
                    />
                )}

                <div className="mt-4">
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-lg"
                    >
                        {activeStep === 1 ? "Next" : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Booking;
