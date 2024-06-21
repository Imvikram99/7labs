import React, { useState } from "react";
import axios from "axios";

const Report = () => {
  const [formData, setFormData] = useState({
    name: "",
    shortName: "",
    testCategory: {
      name: "",
    },
    testSampleType: "",
    testPanelCode: "",
    tests: [
      {
        id: "",
        name: "",
        code: "",
        referenceValues: [
          {
            referenceValueId: "",

            minAge: "",
            maxAge: "",
            gender: "",
            minReferenceValue: "",
            maxReferenceValue: "",
            testResultUnit: { name: "" },
          },
        ],
        singleReferenceValues: {
          singleReferenceValueId: "",
          code: "",
          allPossibleValues: ["Low", "Normal", "High"],
          referenceValue: "",
          unit: "",
        },
        referenceValueType: "",
        subTests: [
          {
            id: "",
            name: "",
            code: "",
            referenceValues: [
              {
                referenceValueId: "",
                minAge: "",
                maxAge: "",
                gender: "",
                minReferenceValue: "",
                maxReferenceValue: "",
                testResultUnit: {
                  name: "",
                },
              },
            ],
            singleReferenceValues: {
              singleReferenceValueId: "",
              code: "",
              allPossibleValues: ["Low", "Normal", "High"],
              referenceValue: "",
              unit: "",
            },
          },
        ],
      },
    ],
    testResultType: "",
    inputType: "",
    method: "",
    instrument: "",
    interpretation: "",
    cost: "",
  });

  const handleInputChange = (
    e,
    index,
    subIndex = null,
    path = "",
    level = "main"
  ) => {
    const { name, value } = e.target;
    const updatedTests = [...formData.tests];

    if (level === "main") {
      if (path === "referenceValues" && subIndex !== null) {
        if (!updatedTests[index].referenceValues) {
          updatedTests[index].referenceValues = [];
        }
        if (!updatedTests[index].referenceValues[subIndex]) {
          updatedTests[index].referenceValues[subIndex] = {
            testResultUnit: { name: "" },
          };
        }
        if (name === "testResultUnit") {
          updatedTests[index].referenceValues[subIndex].testResultUnit = {
            name: value,
          };
        } else {
          updatedTests[index].referenceValues[subIndex][name] = value;
        }
      } else if (path === "singleReferenceValues") {
        updatedTests[index].singleReferenceValues[name] = value;
      } else {
        updatedTests[index][name] = value;
      }
    } else if (level === "sub") {
      if (path === "referenceValues" && subIndex !== null) {
        if (!updatedTests[index].subTests) {
          updatedTests[index].subTests = [];
        }
        if (!updatedTests[index].subTests[subIndex]) {
          updatedTests[index].subTests[subIndex] = {
            referenceValues: [
              {
                testResultUnit: { name: "" },
              },
            ],
          };
        }
        if (!updatedTests[index].subTests[subIndex].referenceValues) {
          updatedTests[index].subTests[subIndex].referenceValues = [];
        }
        if (!updatedTests[index].subTests[subIndex].referenceValues[0]) {
          updatedTests[index].subTests[subIndex].referenceValues[0] = {
            testResultUnit: { name: "" },
          };
        }
        if (name === "testResultUnit") {
          updatedTests[index].subTests[
            subIndex
          ].referenceValues[0].testResultUnit = { name: value };
        } else {
          updatedTests[index].subTests[subIndex].referenceValues[0][name] =
            value;
        }
      } else {
        updatedTests[index].subTests[subIndex][name] = value;
      }
    }

    setFormData({ ...formData, tests: updatedTests });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://ec2-13-233-207-62.ap-south-1.compute.amazonaws.com:8080/api/v1/lab/testpanel",
        formData,
        {
          headers: {
            "X-API-KEY": "test123",
            "X-PARTNER-ID": "PYTHONMAN2",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Add a new test
  const addTest = () => {
    setFormData({
      ...formData,
      tests: [
        ...formData.tests,
        {
          id: "",
          name: "",
          code: "",
          referenceValues: [
            {
              minAge: "",
              maxAge: "",
              gender: "",
              minReferenceValue: "",
              maxReferenceValue: "",
              unit: "",
            },
          ],
          singleReferenceValues: {
            code: "",
            allPossibleValues: "",
            referenceValue: "",
            unit: "",
          },
          referenceValueType: "",
          subTests: [
            {
              id: "",
              name: "",
              code: "",
              referenceValues: [
                {
                  minAge: "",
                  maxAge: "",
                  gender: "",
                  minReferenceValue: "",
                  maxReferenceValue: "",
                  testResultUnit: { name: "" },
                },
              ],
            },
          ],
        },
      ],
    });
  };

  // Remove a test
  const removeTest = (index) => {
    const updatedTests = formData.tests.filter((_, i) => i !== index);
    setFormData({ ...formData, tests: updatedTests });
  };

  // Add a sub-test to a specific test
  const addSubTest = (index) => {
    const updatedTests = [...formData.tests];
    updatedTests[index].subTests.push({
      id: "",
      name: "",
      code: "",
      referenceValues: [
        {
          minAge: "",
          maxAge: "",
          gender: "",
          minReferenceValue: "",
          maxReferenceValue: "",
          unit: "",
        },
      ],
    });
    setFormData({ ...formData, tests: updatedTests });
  };

  // Remove a sub-test from a specific test
  const removeSubTest = (index, subIndex) => {
    const updatedTests = [...formData.tests];
    updatedTests[index].subTests = updatedTests[index].subTests.filter(
      (_, i) => i !== subIndex
    );
    setFormData({ ...formData, tests: updatedTests });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Test Panel
      </h1>
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Short Name
            </label>
            <input
              type="text"
              name="shortName"
              value={formData.shortName}
              onChange={(e) =>
                setFormData({ ...formData, shortName: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Test Category
            </label>
            <input
              type="text"
              name="testCategory"
              value={formData.testCategory.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  testCategory: {
                    ...formData.testCategory,
                    name: e.target.value,
                  },
                })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Test Sample Type
            </label>
            <input
              type="text"
              name="testSampleType"
              value={formData.testSampleType}
              onChange={(e) =>
                setFormData({ ...formData, testSampleType: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Test Panel Code
            </label>
            <input
              type="text"
              name="testPanelCode"
              value={formData.testPanelCode}
              onChange={(e) =>
                setFormData({ ...formData, testPanelCode: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
            />
          </div>
        </div>

        {formData.tests.map((test, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4 mt-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold mb-4">Test {index + 1}</h2>
              {formData.tests.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeTest(index)}
                  className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Test Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={test.name}
                  onChange={(e) => handleInputChange(e, index)}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Test Code
                </label>
                <input
                  type="text"
                  name="code"
                  value={test.code}
                  onChange={(e) => handleInputChange(e, index)}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Reference Value Type
                </label>
                <input
                  type="text"
                  name="referenceValueType"
                  value={test.referenceValueType}
                  onChange={(e) => handleInputChange(e, index)}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Single Reference Values - Code
                </label>
                <input
                  type="text"
                  name="code"
                  value={test.singleReferenceValues.code}
                  onChange={(e) =>
                    handleInputChange(e, index, 0, "singleReferenceValues")
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Single Reference Values - Reference Value
                </label>
                <input
                  type="text"
                  name="referenceValue"
                  value={test.singleReferenceValues.referenceValue}
                  onChange={(e) =>
                    handleInputChange(e, index, 0, "singleReferenceValues")
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Single Reference Values - Unit
                </label>
                <input
                  type="text"
                  name="unit"
                  value={test.singleReferenceValues.unit}
                  onChange={(e) =>
                    handleInputChange(e, index, 0, "singleReferenceValues")
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
                />
              </div>

              {/* <div>
                <label className="block text-sm font-medium text-gray-700">
                  Single Reference Values - Possible Values
                </label>
                <input
                  type="text"
                  name="allPossibleValues"
                  value={test.singleReferenceValues.allPossibleValues}
                  // onChange={(e) =>
                  //   handleInputChange(e, index, 0, "singleReferenceValues")
                  // }
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
                />
              </div> */}
            </div>

            {test.referenceValues.map((refVal, subIndex) => (
              <div
                key={subIndex}
                className="bg-gray-200 p-4 rounded-lg mb-4 mt-4"
              >
                <h3 className="text-lg font-semibold mb-2">
                  Reference Value {subIndex + 1}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Min Age
                    </label>
                    <input
                      type="text"
                      name="minAge"
                      value={refVal.minAge}
                      onChange={(e) =>
                        handleInputChange(e, index, subIndex, "referenceValues")
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Max Age
                    </label>
                    <input
                      type="text"
                      name="maxAge"
                      value={refVal.maxAge}
                      onChange={(e) =>
                        handleInputChange(e, index, subIndex, "referenceValues")
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Gender
                    </label>
                    <input
                      type="text"
                      name="gender"
                      value={refVal.gender}
                      onChange={(e) =>
                        handleInputChange(e, index, subIndex, "referenceValues")
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Min Reference Value
                    </label>
                    <input
                      type="text"
                      name="minReferenceValue"
                      value={refVal.minReferenceValue}
                      onChange={(e) =>
                        handleInputChange(e, index, subIndex, "referenceValues")
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Max Reference Value
                    </label>
                    <input
                      type="text"
                      name="maxReferenceValue"
                      value={refVal.maxReferenceValue}
                      onChange={(e) =>
                        handleInputChange(e, index, subIndex, "referenceValues")
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Unit
                    </label>
                    <input
                      type="text"
                      name="testResultUnit"
                      value={refVal.testResultUnit.name}
                      onChange={(e) =>
                        handleInputChange(e, index, subIndex, "referenceValues")
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => addSubTest(index)}
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            >
              Add Sub Test
            </button>

            {test.subTests.map((subTest, subIndex) => (
              <div
                key={subIndex}
                className="bg-gray-200 p-4 rounded-lg mb-4 mt-4"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold mb-2">
                    Sub Test {subIndex + 1}
                  </h3>
                  {test.subTests.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSubTest(index, subIndex)}
                      className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Sub Test Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={subTest.name}
                      onChange={(e) =>
                        handleInputChange(e, index, subIndex, "", "sub")
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Sub Test Code
                    </label>
                    <input
                      type="text"
                      name="code"
                      value={subTest.code}
                      onChange={(e) =>
                        handleInputChange(e, index, subIndex, "", "sub")
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
                    />
                  </div>

                  {subTest.referenceValues.map((subRefVal, refIndex) => (
                    <div
                      key={refIndex}
                      className="col-span-1 md:col-span-2 lg:col-span-4 w-full"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <div className="w-full">
                          <label className="block text-sm font-medium text-gray-700">
                            Min Age
                          </label>
                          <input
                            type="text"
                            name="minAge"
                            value={subRefVal.minAge}
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                index,
                                subIndex,
                                "referenceValues",
                                "sub"
                              )
                            }
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
                          />
                        </div>

                        <div className="w-full">
                          <label className="block text-sm font-medium text-gray-700">
                            Max Age
                          </label>
                          <input
                            type="text"
                            name="maxAge"
                            value={subRefVal.maxAge}
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                index,
                                subIndex,
                                "referenceValues",
                                "sub"
                              )
                            }
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
                          />
                        </div>

                        <div className="w-full">
                          <label className="block text-sm font-medium text-gray-700">
                            Gender
                          </label>
                          <input
                            type="text"
                            name="gender"
                            value={subRefVal.gender}
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                index,
                                subIndex,
                                "referenceValues",
                                "sub"
                              )
                            }
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
                          />
                        </div>

                        <div className="w-full">
                          <label className="block text-sm font-medium text-gray-700">
                            Min Reference Value
                          </label>
                          <input
                            type="text"
                            name="minReferenceValue"
                            value={subRefVal.minReferenceValue}
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                index,
                                subIndex,
                                "referenceValues",
                                "sub"
                              )
                            }
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
                          />
                        </div>

                        <div className="w-full">
                          <label className="block text-sm font-medium text-gray-700">
                            Max Reference Value
                          </label>
                          <input
                            type="text"
                            name="maxReferenceValue"
                            value={subRefVal.maxReferenceValue}
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                index,
                                subIndex,
                                "referenceValues",
                                "sub"
                              )
                            }
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
                          />
                        </div>

                        <div className="w-full">
                          <label className="block text-sm font-medium text-gray-700">
                            Unit
                          </label>
                          <input
                            type="text"
                            name="testResultUnit"
                            value={subRefVal.testResultUnit.name}
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                index,
                                subIndex,
                                "referenceValues",
                                "sub"
                              )
                            }
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}

        <button
          type="button"
          onClick={addTest}
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
        >
          Add Test
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Test Result Type
            </label>
            <input
              type="text"
              name="testResultType"
              value={formData.testResultType}
              onChange={(e) =>
                setFormData({ ...formData, testResultType: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Input Type
            </label>
            <input
              type="text"
              name="inputType"
              value={formData.inputType}
              onChange={(e) =>
                setFormData({ ...formData, inputType: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Method
            </label>
            <input
              type="text"
              name="method"
              value={formData.method}
              onChange={(e) =>
                setFormData({ ...formData, method: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Instrument
            </label>
            <input
              type="text"
              name="instrument"
              value={formData.instrument}
              onChange={(e) =>
                setFormData({ ...formData, instrument: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Interpretation
            </label>
            <input
              type="text"
              name="interpretation"
              value={formData.interpretation}
              onChange={(e) =>
                setFormData({ ...formData, interpretation: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cost
            </label>
            <input
              type="text"
              name="cost"
              value={formData.cost}
              onChange={(e) =>
                setFormData({ ...formData, cost: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Report;
