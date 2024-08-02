import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState(null);

  const options = [
    { value: "alphabets", label: "Alphabets" },
    { value: "numbers", label: "Numbers" },
    { value: "highest_alphabet", label: "Highest Alphabet" },
  ];

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      let inputData;
      try {
        inputData = JSON.parse(inputValue);
      } catch {
        inputData = { data: inputValue.split(",").map((item) => item.trim()) };
      }

      const response = await axios.post(
        "https://bajaj-fiserv-ra2111003020111.onrender.com/bfhl",
        inputData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setResponseData(response.data);
      setError(null);
    } catch (err) {
      console.error("Error:", err.response ? err.response.data : err.message);
      setError("Invalid input or server error");
      setResponseData(null);
    }
  };

  const renderResponse = () => {
    if (!responseData) return null;

    const selectedKeys = selectedOptions.map((option) => option.value);
    const filteredResponse = Object.keys(responseData)
      .filter((key) => selectedKeys.includes(key))
      .reduce((obj, key) => {
        obj[key] = responseData[key];
        return obj;
      }, {});

    return (
      <pre className="p-4 mt-4 bg-gray-100 rounded">
        {JSON.stringify(filteredResponse, null, 2)}
      </pre>
    );
  };

  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="mb-4 text-2xl font-bold">RA2111003020111</h1>
      <textarea
        value={inputValue}
        onChange={handleInputChange}
        rows="10"
        cols="50"
        placeholder='Enter JSON like {"data": ["A","B","C"]} or comma-separated values like A,B,C'
        className="w-full max-w-md p-2 border rounded"
      />
      <button
        onClick={handleSubmit}
        className="hover:bg-blue-700 px-4 py-2 mt-4 text-white bg-blue-500 rounded"
      >
        Submit
      </button>
      {error && <p className="mt-2 text-red-500">{error}</p>}
      {responseData && (
        <>
          <div className="w-full max-w-md mt-4">
            <Select
              options={options}
              isMulti
              onChange={(selected) => setSelectedOptions(selected)}
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>
          {renderResponse()}
        </>
      )}
    </div>
  );
};

export default App;
