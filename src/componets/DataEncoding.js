import "./DataEncoding.css";
import React, { useEffect, useState } from "react";

function DataEncoding() {
  const [data, setData] = useState({});
  const [columns, setColumns] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const [selectedColumns, setSelectedColumns] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (update) => {
    try {
      const resp = await fetch(`http://127.0.0.1:5001/api/df/dataencoding`);
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

  const fetchColsData = async ()=>{
    const url = 'http://127.0.0.1:5001/api/df/colsdata'; // Replace with your API endpoint URL
    // Data to be sent in the request body
    const data = {
        cols: selectedColumns
    };
    try {
        const response = await fetch(url, {
            method: 'POST', // Use PUT for updating data
            headers: {
                'Content-Type': 'application/json', // Specify the content type as JSON
            },
            body: JSON.stringify(data), // Convert data to JSON and send in the request body
        });

        if (response.ok) {
            // Request was successful
            const jsonResponse = await response.json();
            setData(jsonResponse.data);
            console.log('Data updated successfully:', jsonResponse);
        } else {
            // Request failed
            console.error('Failed to update data:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
  }

  const fetchColumnData = (col) => {
    const newSelectedColumns = [...selectedColumns];
    newSelectedColumns.push(col);
    setSelectedColumns(newSelectedColumns);
    fetchColsData();
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
        <h4>Select the Category columns</h4>
        {columns.map((item, index) => (
          <button
            className="choose-column-de-btn"
            key={index}
            onClick={() => {
              fetchColumnData(item);
            }}
          >
            {item}
          </button>
        ))}
      </div>
      <div>
          <h4>Selected Columns:</h4>
          {selectedColumns.map((col, index) => (
            <button className="selected-column-btn-de" key={index}>
              {col}
            </button>
          ))}
      </div>

      <table>
        <thead>
          <tr>
            {Object.keys(data).map((key, index) => (
              <th key={index}>{key}</th>
            ))}
          </tr>
        </thead>
      </table>



    </>
  );
}

export default DataEncoding;