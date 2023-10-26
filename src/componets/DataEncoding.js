import "./DataEncoding.css";
import React, { useEffect, useState } from "react";

function MissingData() {
  const [columns, setColumns] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

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

  const fetchColumnData = (col)=>{
    alert(col);
  }

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while fetching data
  }

  if (error) {
    return <div>Error: {error}</div>; // Show an error message if there was an error
  }

  return (
    <>
      <h4>Select the Category columns</h4>
      {columns.map((item, index) => (
        <button className="choose-column-de-btn" key={index}
        onClick={() => {
            fetchColumnData({item});
        }}
        >{item}</button>
      ))}
    </>
  );
}

export default MissingData;
