import React, { useEffect, useState } from "react";
import "../css/MLAlgo.css";

function MLAlgo() {
  const [features, setFeatures] = useState([]);
  const [regression, setRegression] = useState([]);
  const [selectAlgo, setSelectAlgo] = useState("Logistic Regression");
  const [algoType, setAlgoType] = useState("classification");
  const [classification, setClassification] = useState([]);
  const [accuracy, setAccuracy] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state0
  const [inputValues, setInputValues] = useState([]);
  const [predict, setPredict] = useState();
  const [predicted, setPredicted] = useState(false);
  const [params, setParams] = useState({});
  const [paramsKey, setParamsKey] = useState([]);
  const [showParams, setShowParams] = useState(true);

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

  const handleInputChange = (event, index) => {
    const newValue = event.target.value;
    setInputValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index] = newValue;
      return updatedValues;
    });
  };

  const fetchModelParams = async () => {
    const url = "http://127.0.0.1:5001/api/model-params";
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
        if (jsonResponse.success) {
          setParams(jsonResponse.params);
          setParamsKey(jsonResponse.params_key);
          console.log("Data updated successfully:", jsonResponse);
        }
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

  const predictFun = async () => {
    const url = "http://127.0.0.1:5001/api/mode-predict";
    const data = {
      featureValue: inputValues,
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
        setPredict(jsonResponse.predict);
        setPredicted(true);
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

  const modelTrain = async () => {
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
        setFeatures(jsonResponse.features);
        setAccuracy(jsonResponse.accuracy);
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

  function snakeToCamel(str) {
    return str.replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace("-", "").replace("_", "")
    );
  }

  const setSelectedAlgorithm = (e) => {
    setSelectAlgo(e.target.value);
    fetchModelParams();
  };

  useEffect(() => {
    fetchRegressionAlog();
  }, []);

  return (
    <>
      <h3 className="text-lg text-white mx-2 my-3 font-semibold">
        Choose the ML Alogorithm for the ML training
      </h3>
      <h3 className="text-lg text-white mx-2 my-3 font-semibold">Model Type</h3>
      <select
        className="bg-slate-800 p-2 m-2"
        value={algoType || "regression"}
        onChange={(e) => {
          setAlgoType(e.target.value);
        }}
      >
        <option className="bg-slate-900" value="regression">
          Regression
        </option>
        <option className="bg-slate-900" value="classification">
          Classification
        </option>
      </select>
      <h3 className="text-lg text-white mx-2 my-3 font-semibold">
        Choose Alogorithm for Model Training
      </h3>
      <select
        className="bg-slate-800 p-2 m-2"
        value={selectAlgo || regression[0]}
        onChange={(e) => {
          setSelectedAlgorithm(e);
        }}
      >
        {algoType === "regression" ? (
          <>
            {regression.map((algo, index) => (
              <option className="bg-slate-900" key={index} value={algo}>
                {algo}
              </option>
            ))}
          </>
        ) : (
          <>
            {classification.map((algo, index) => (
              <option className="bg-slate-900" key={index} value={algo}>
                {algo}
              </option>
            ))}
          </>
        )}
      </select>
      <br />
      {showParams && (
        <>
          <div className="block columns-4 mx-2">
            {paramsKey.map((item, index) => (
              <div className="p-1" key={index}>
                <div>{snakeToCamel(item)}</div>
                <input
                  className="w-20 h-7 bg-slate-800 text-white p-1 rounded-lg"
                  placeholder={snakeToCamel(item)}
                  value={params[item]}
                />
              </div>
            ))}
          </div>
        </>
      )}

      <button
        className="p-2 bg-slate-800 mx-2 rounded-sm my-5"
        onClick={() => modelTrain()}
      >
        Model Train
      </button>

      <br />

      <h3 className="text-lg text-white mx-2 my-3 font-semibold">
        {accuracy && <>Accuracy : {accuracy}</>}
      </h3>

      <br />

      <div>
        <div>
          <h3 className="text-lg text-white mx-2 my-3 font-semibold">
            Features:
          </h3>
          <div className="block columns-5 m-3">
            {features.map((item, index) => (
              <div key={index}>
                <input
                  className="w-20 h-10 text-white p-2 rounded-lg bg-slate-800"
                  type="number"
                  placeholder={snakeToCamel(item)}
                  value={inputValues[index] || ""}
                  onChange={(event) => handleInputChange(event, index)}
                />
              </div>
            ))}
          </div>
        </div>
        <button
          className="w-20 h-15 p-3 mx-4 my-5 bg-red-600 rounded-md"
          onClick={() => {
            predictFun();
          }}
        >
          Predict
        </button>
      </div>
      <div className="p-5 text-2xl">
      {predicted && <>Prediction Value : {predict}</>}
      </div>
    </>
  );
}

export default MLAlgo;
