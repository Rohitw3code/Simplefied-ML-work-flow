import React, { useEffect, useState } from "react";
import "../css/MLAlgo.css";

function MLAlgo() {
  const [regression, setRegression] = useState([]);
  const [selectReg, setSelectReg] = useState([]);
  const [algoType, setAlgoType] = useState("regression");
  const [classification, setClassification] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  const fetchRegressionAlog = async () => {
    try {
      const resp = await fetch(
        `http://127.0.0.1:5001/api/regression-classification-algo`
      );
      if (resp.ok) {
        const jsonData = await resp.json();
        setRegression(jsonData.regression);
        setClassification(jsonData.classification);
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

  const setSelectedRegression = (e) => {
    setSelectReg(e.target.value);
  };

  useEffect(() => {
    fetchRegressionAlog();
  }, []);

  return (
    <>
      <h3>Choose the ML Alogorithm for the ML training</h3>
      <h3>Model Type</h3>
      <select
        className="select-algo-type-mlalgo"
        value={algoType || "regression"}
        onChange={(e) => {
          setAlgoType(e.target.value);
        }}
      >
        <option value="regression">Regression</option>
        <option value="classification">Classification</option>
      </select>

      <h3>Choose Alogorithm for Model Training</h3>
      <select
        className="select-algo-type-mlalgo"
        value={selectReg || regression[0]}
        onChange={(e) => {
          setSelectedRegression(e);
        }}
      >
        {algoType === "regression" ? (
          <>
            {regression.map((algo, index) => (
              <option key={index} value={algo}>
                {algo}
              </option>
            ))}
          </>
        ) : (
          <>
            {classification.map((algo, index) => (
              <option key={index} value={algo}>
                {algo}
              </option>
            ))}
          </>
        )}
      </select>
      <button className="train-btn">Model Train</button>
    </>
  );
}

export default MLAlgo;
