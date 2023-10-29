import "../css/SelectFeatureTarget.css";
import Dataframe from "./Dataframe";
import React, { useEffect, useState } from "react";

function SelectFeatureTarget() {
  const [columns, setColumns] = useState([]);
  const [update, setUpdate] = useState(false);
  const [targetfeature, setTargetfeature] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState([]); // Change this to an array

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const resp = await fetch("http://127.0.0.1:5001/api/encode-columns");
      if (resp.ok) {
        const jsonData = await resp.json();
        setColumns(jsonData.columns);
      }
    } catch (error) {
      // Handle any errors here
      console.error("Error fetching data:", error);
    }
  };

  const setTarget = async (col) => {
    const url = `http://127.0.0.1:5001/api/select-target-feature/${col}`;
    try {
      const resp = await fetch(url);
      if (resp.ok) {
        const jsonData = await resp.json();
        if (jsonData.update) {
          setUpdate(true);
          setTargetfeature(col);
          updateFeature(selectedFeatures,targetfeature);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateFeature = async (sf,tf) =>{
    const url = "http://127.0.0.1:5001/api/feature-target";
    const payload = {
      feature: sf,
      target:tf
    };
    try {
      const response = await fetch(url, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(payload), 
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log("Fetch Successfully:", jsonResponse);
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
  }

  const addinfeature = (col) => {
    const newSelectedColumns = [...selectedFeatures]; // Create a copy of the array
    newSelectedColumns.push(col);
    setSelectedFeatures(newSelectedColumns);
    updateFeature(selectedFeatures);
    if (selectedFeatures.includes(col)) {
      const updatedSelectedFeatures = selectedFeatures.filter(
        (item) => item !== col
      );
      setSelectedFeatures(updatedSelectedFeatures);
    }
  };

  return (
    <div>
      <h2>Features:</h2>
      {columns.map((column, index) => (
        <>
          {column === targetfeature ? (
            ""
          ) : (
            <>
              <button
                className={`train-feature-btn-st ${
                  selectedFeatures.includes(column) ? "selected-feature" : ""
                }`}
                onClick={() => {
                  addinfeature(column);
                }}
              >
                {column}
              </button>
            </>
          )}
        </>
      ))}

      <h2>Target:</h2>
      {columns.map((column, index) => (
        <button
          className={`target-feature-btn-st ${
            targetfeature === column ? "selected-target" : ""
          }`}
          onClick={() => {
            setTarget(column);
          }}
          key={index}
        >
          {column}
        </button>
      ))}
      {update && (
        <>
          <h3>{targetfeature}</h3>
        </>
      )}

      <div>
        <div className="container">
          <div className="dataframe-container">
            {selectedFeatures.length === 0 ? (
              ""
            ) : (
              <>
              <div className="feature-title-x">Train Feature (X)</div>
                <Dataframe rows={3} cols={selectedFeatures} />
              </>
            )}
          </div>
          <div className="dataframe-container">
            {targetfeature === "" ? (
              ""
            ) : (
              <>
              <div className="feature-title-y">Target (Y)</div>
                <Dataframe rows={3} cols={[targetfeature]} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectFeatureTarget;
