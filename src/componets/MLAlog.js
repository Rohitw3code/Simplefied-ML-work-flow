import React, { useEffect, useState } from "react";
import "../css/MLAlgo.css";

function MLAlgo() {
  const [features, setFeatures] = useState([]);
  const [target, setTarget] = useState("");
  const [regression, setRegression] = useState([]);
  const [selectAlgo, setSelectAlgo] = useState("Linear Regression");
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

  const fetchFeatures = async () => {
    try {
      const resp = await fetch(`http://127.0.0.1:5001/api/model-predict`);
      if (resp.ok) {
        const jsonData = await resp.json();
        setFeatures(jsonData.features);
        setTarget(jsonData.target);
        setLoading(false);
      } else {
        setError("Failed to fetch data");
        setLoading(false);
      }
    } catch (error) {
      setError("Error: " + error.message);
      setLoading(false);
    }
  };

  const modelTrain = async () => {
    fetchFeatures();
    const url = "http://127.0.0.1:5001/api/model-train-algo";
    const data = {
      algoType: algoType,
      algo: selectAlgo,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
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

  const setSelectedAlgorithm = (e) => {
    setSelectAlgo(e.target.value);
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
        value={selectAlgo || regression[0]}
        onChange={(e) => {
          setSelectedAlgorithm(e);
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
      <button className="train-btn" onClick={() => modelTrain()}>
        Model Train
      </button>
      <br />
      <div className="predict-section">
        <div className="feature-container">
          Features:
          {features.map((item, index) => (
            <div className="feature-flex" key={index}>
              <input className="input-feature" type="text" placeholder={item} />
            </div>
          ))}
        </div>
        <button className="predict-btn">Predict</button>
      </div>{" "}
    </>
  );
}

export default MLAlgo;
