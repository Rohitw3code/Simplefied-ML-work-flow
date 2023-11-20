import "../css/DataEncoding.css";
import React, { useContext, useEffect, useState } from "react";
import Dataframe from "./Dataframe";
import DfUniqueData from "./DfUniqueData";
import Unique from "./Unique";
import ThemeContext from "./ThemeContext";

function DataEncoding() {
  const [data, setData] = useState({});
  const [encodedDataCols, setEncodedDataCols] = useState({});
  const [showDataframe, setShowDataframe] = useState(false);
  const [columns, setColumns] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const [selectedColumns, setSelectedColumns] = useState([]);
  const color = useContext(ThemeContext)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const resp = await fetch(`http://127.0.0.1:5001/api/encode-columns`);
      if (resp.ok) {
        const jsonData = await resp.json();
        setColumns(jsonData.columns);
        setLoading(false);
      } else {
        setError("Failed to fetch data");
        setLoading(false); // Set loading to false in case of an error
      }
    } catch (error) {
      setError("Error: " + error.message);
      setLoading(false); // Set loading to false in case of an error
    }
  };

  const fetchColsData = async () => {
    const url = "http://127.0.0.1:5001/api/df/colsdata"; // Replace with your API endpoint URL
    // Data to be sent in the request body
    const payload = {
      cols: selectedColumns,
    };
    try {
      const response = await fetch(url, {
        method: "POST", // Use PUT for updating data
        headers: {
          "Content-Type": "application/json", // Specify the content type as JSON
        },
        body: JSON.stringify(payload), // Convert data to JSON and send in the request body
      });

      if (response.ok) {
        // Request was successful
        const jsonResponse = await response.json();
        setData(jsonResponse.data);
        console.log("Fetch Successfully:", jsonResponse);
      } else {
        // Request failed
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

  const encodeDF = async () => {
    const url = "http://127.0.0.1:5001/api/df/encode-df"; // Replace with your API endpoint URL
    // Data to be sent in the request body
    const payload = {
      cols: selectedColumns,
    };
    try {
      const response = await fetch(url, {
        method: "POST", // Use PUT for updating data
        headers: {
          "Content-Type": "application/json", // Specify the content type as JSON
        },
        body: JSON.stringify(payload), // Convert data to JSON and send in the request body
      });

      if (response.ok) {
        // Request was successful
        const jsonResponse = await response.json();
        setEncodedDataCols(jsonResponse.cols);
        setShowDataframe(true);
        console.log("Fetch Successfully:", jsonResponse);
      } else {
        // Request failed
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

  const fetchColumnData = (col) => {
    const newSelectedColumns = [...selectedColumns];
    newSelectedColumns.push(col);
    setSelectedColumns(newSelectedColumns);
    fetchColsData();
  };

  const removeCol = (col) => {
    setSelectedColumns((prevSelectedColumns) =>
      prevSelectedColumns.filter((item) => item !== col)
    );
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while fetching data
  }

  if (error) {
    return <div>Error: {error}</div>; // Show an error message if there was an error
  }

  return (
    <>
      <div
        className="plan-de"
        onClick={() => {
          fetchData();
        }}
      >
        <h3 className="text-xl mx-3 font-medium" style={{fontFamily : 'Poppins'}}>
          Unique data in the dataframe
        </h3>

        <DfUniqueData />

        {/* <Unique /> */}

        <h4 className="text-lg mt-4 font-medium my-3" style={{ fontFamily : 'Poppins'}}>Select the Category columns</h4>
        
        {columns.map((item, index) => (
          <button
            className={` m-1 rounded-sm p-2 hover:bg-white ${color === '#ED9ED6' && 'bg-pink-500'} ${color === '#87C4FF' && 'bg-blue-500'}
            ${color === '#9ADE7B' && 'bg-green-500'} ${color === '#FFCF96' && 'bg-yellow-500'}`}
            key={index}
            onClick={() => {
              fetchColumnData(item);
            }}
          >
            {item}
          </button>
        ))}

        <h4 className="text-lg my-3 font-medium"
        style={{fontFamily : 'Poppins'}}>Selected Columns:</h4>
        {selectedColumns.length > 0 ? (
          ""
        ) : (
          <h5 className=" text-sm" style={{ fontFamily : 'Poppins'}}>NO Categorical Feature is Selected</h5>
        )}
        {selectedColumns.map((col, index) => (
          <button className={` text-white mx-1 p-2 my-1 hover:bg-slate-800 ${color === '#ED9ED6' && 'bg-pink-500'} ${color === '#87C4FF' && 'bg-blue-500'}
          ${color === '#9ADE7B' && 'bg-green-500'} ${color === '#FFCF96' && 'bg-yellow-500'}`} key={index}>
            {col}
            <label
              className="remove-cat-cols-de"
              onClick={() => {
                removeCol(col);
              }}
            >
              x
            </label>
          </button>
        ))}

        <Dataframe rows={3} cols={selectedColumns} />

        <div>
          {selectedColumns.length > 0 ? (
            <>
              <button
                className={` rounded-md mx-3 my-3 p-3 ${color === '#ED9ED6' && 'bg-pink-500'} ${color === '#87C4FF' && 'bg-blue-500'}
                ${color === '#9ADE7B' && 'bg-green-500'} ${color === '#FFCF96' && 'bg-yellow-500'}`}
                onClick={() => {
                  encodeDF();
                }}
              >
                Encode
              </button>
            </>
          ) : (
            ""
          )}

          {showDataframe && (
            <>
              <h4 className="text-lg mx-3 my-3 font-semibold" style={{ fontFamily : 'Poppins'}}>Encoded Data</h4>
              <Dataframe rows={3} cols={encodedDataCols} />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default DataEncoding;
