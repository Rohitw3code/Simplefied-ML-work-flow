import "../css/MissingData.css";
import React, { useEffect, useState } from "react";

function MissingData({ triggerReloadDataTypeChange }) {
  const [data, setData] = useState({});
  const [dtypes, setDtypes] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const [clickedButton, setClickedButton] = useState(null);
  const [btnDtype, setBtnDtype] = useState(null);

  // Update Dataset isna sum and dtypes
  const [updated_ds, setUpdatedDs] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const resp = await fetch(`http://127.0.0.1:5001/api/df/missingdata`);
      if (resp.ok) {
        const jsonData = await resp.json();
        setData(jsonData.missing);
        setDtypes(jsonData.dtypes);
        setLoading(false); // Set loading to false after data is fetched
      } else {
        setError("Failed to fetch data");
        setLoading(false); // Set loading to false in case of an error
      }
    } catch (error) {
      setError("Error: " + error.message);
      setLoading(false); // Set loading to false in case of an error
    }
  };

  const post = async (key, value, replace = "nan") => {
    const url = "http://127.0.0.1:5001/api/df/missingdata/operation"; // Replace with your API endpoint URL
    // Data to be sent in the request body
    const data = {
      key: key,
      operation: value,
      replace: replace,
    };

    try {
      const response = await fetch(url, {
        method: "POST", // Use PUT for updating data
        headers: {
          "Content-Type": "application/json", // Specify the content type as JSON
        },
        body: JSON.stringify(data), // Convert data to JSON and send in the request body
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        if (jsonResponse.updated) {
          setUpdatedDs(jsonResponse);
          triggerReloadDataTypeChange();
        }
        console.log("Data updated successfully:", jsonResponse);
      } else {
        console.error(
          "Failed to update data:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleMissingData = (key, opra, replace = "nan") => {
    setUpdatedDs({});
    post(key, opra, replace);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleButtonClick = (key, dtype) => {
    setClickedButton(key);
    setBtnDtype(dtype);
  };

  return (
    <div className="section">
      <div className="flex p-3 rounded-md">
        {Object.keys(data).map((key) => (
          <div key={key}>
            <div className="bg-blue-900 p-2">
              {key}
              <br /> {dtypes[key]}
            </div>
            <div className="bg-blue-950 p-1">{data[key]}</div>
          </div>
        ))}
      </div>
      <div>
        <div className="text-2xl text-white px-3 font-semibold">
          Fix the missing data
        </div>
        <div className="text-sm text-white px-3 my-3 font-semibold">
          Data Imputation and Deletion
        </div>
        <div className="m-3">
          {Object.keys(data).map(
            (key) =>
              data[key] !== 0 && (
                <button
                  key={key}
                  className={`bg-slate-800 p-2 ${
                    clickedButton === key ? "bg-red-500" : ""
                  }`}
                  onClick={() => handleButtonClick(key, dtypes[key])}
                >
                  {key}
                </button>
              )
          )}
        </div>

        {clickedButton && (
          <div className="mx-3">
            {btnDtype === "float64" && (
              <>
                <button
                  className="bg-slate-800 p-2 mx-1 rounded-lg hover:bg-slate-700"
                  onClick={() => handleMissingData(clickedButton, "mean")}
                >
                  mean
                </button>
                <button
                  className="bg-slate-800 p-2 mx-1 rounded-lg hover:bg-slate-700"
                  onClick={() => handleMissingData(clickedButton, "median")}
                >
                  median
                </button>
              </>
            )}
            {btnDtype === "object" && (
              <>
                <button
                  className="bg-slate-800 p-2 mx-1 rounded-lg hover:bg-slate-700"
                  onClick={() => handleMissingData(clickedButton, "mode")}
                >
                  mode
                </button>
              </>
            )}
            <button
              className="bg-slate-800 p-2 mx-1 rounded-lg hover:bg-slate-700"
              onClick={() => handleMissingData(clickedButton, "delete")}
            >
              delete (column)
            </button>
            <button
              className="bg-slate-800 p-2 mx-1 rounded-lg hover:bg-slate-700"
              onClick={() => handleMissingData(clickedButton, "remove")}
            >
              remove (nan)
            </button>

            <input
              type="text"
              placeholder="replace"
              className="bg-slate-800 p-2 my-1"
            />
            <button
              className="bg-slate-800 p-2 rounded hover:bg-slate-700"
              onClick={() => {
                const inputValue =
                  document.querySelector(".replace-input").value; // Get the input value
                handleMissingData(clickedButton, "replace", inputValue);
              }}
            >
              replace
            </button>
          </div>
        )}
      </div>
      {updated_ds.updated && (
        <>
          <div className="flex m-5">
            {Object.keys(updated_ds.data).map((key) => (
              <div key={key} className="table-row">
                <div className="bg-blue-900 text-white p-2">
                  {key} {updated_ds.dtypes[key]}
                </div>
                <div className="bg-blue-950 text-white items-center p-4">
                  {updated_ds.data[key]}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default MissingData;
