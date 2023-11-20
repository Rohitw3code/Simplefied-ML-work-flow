import React, { useContext, useEffect, useState } from "react";
import "../css/MLAlgo.css";
import ThemeContext from "./ThemeContext";

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
  const color = useContext(ThemeContext);

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
      <div
        className={` p-5 rounded-md mr-3 ${
          color === "#ED9ED6" && "bg-pink-600"
        } ${color === "#87C4FF" && "bg-blue-600"}
               ${color === "#9ADE7B" && "bg-green-600"} ${
          color === "#FFCF96" && "bg-yellow-600"
        }`}
      >
        <h3
          className="text-lg mx-2 text-white my-3 font-semibold"
          style={{ fontFamily: "ClashGrotesk" }}
        >
          Choose the ML Alogorithm for the ML training
        </h3>
        <h3
          className="text-lg text-white mx-2 my-3 font-semibold"
          style={{ fontFamily: "Poppins" }}
        >
          Model Type
        </h3>
        <select
          className={` m-2 rounded p-2 hover:bg-slate-200 ${
            color === "#ED9ED6" && "bg-pink-300"
          } ${color === "#87C4FF" && "bg-blue-300"}
        ${color === "#9ADE7B" && "bg-green-300"} ${
            color === "#FFCF96" && "bg-yellow-300"
          }`}
          value={algoType || "regression"}
          onChange={(e) => {
            setAlgoType(e.target.value);
          }}
        >
          <option className="bg-blue-600" value="regression">
            Regression
          </option>
          <option className="bg-blue-600" value="classification">
            Classification
          </option>
        </select>

        <h3
          className="text-lg text-white mx-2 my-3 font-semibold"
          style={{ fontFamily: "Poppins" }}
        >
          Choose Alogorithm for Model Training
        </h3>
        <select
          className={` m-2 rounded p-2 hover:bg-slate-200 ${
            color === "#ED9ED6" && "bg-pink-300"
          } ${color === "#87C4FF" && "bg-blue-300"}
        ${color === "#9ADE7B" && "bg-green-300"} ${
            color === "#FFCF96" && "bg-yellow-300"
          }`}
          value={selectAlgo || regression[0]}
          onChange={(e) => {
            setSelectedAlgorithm(e);
          }}
        >
          {algoType === "regression" ? (
            <>
              {regression.map((algo, index) => (
                <option
                  className={` p-2 hover:bg-slate-200 ${
                    color === "#ED9ED6" && "bg-pink-600"
                  } ${color === "#87C4FF" && "bg-blue-600"}
              ${color === "#9ADE7B" && "bg-green-600"} ${
                    color === "#FFCF96" && "bg-yellow-600"
                  }`}
                  key={index}
                  value={algo}
                >
                  {algo}
                </option>
              ))}
            </>
          ) : (
            <>
              {classification.map((algo, index) => (
                <option
                  className={` p-2 hover:bg-slate-200 ${
                    color === "#ED9ED6" && "bg-pink-600"
                  } ${color === "#87C4FF" && "bg-blue-600"}
              ${color === "#9ADE7B" && "bg-green-600"} ${
                    color === "#FFCF96" && "bg-yellow-600"
                  }`}
                  key={index}
                  value={algo}
                >
                  {algo}
                </option>
              ))}
            </>
          )}
        </select>
        <br />
        {showParams && (
          <>
                <h2 className={`text-2xl mb-4 p-5 font-semibold border-t-2 border-b-2 ${color === '#ED9ED6' && 'border-pink-500'} ${color === '#87C4FF' && 'border-blue-500'}
      ${color === '#9ADE7B' && 'border-green-500'} ${color === '#FFCF96' && 'border-yellow-500'}`} style={{fontFamily : 'ClashGrotesk'}}>
        Hyper Parameters
      </h2>

            <div className="block columns-4 mx-2">
              {paramsKey.map((item, index) => (
                <div className="p-1" key={index}>
                  <div className=" text-white">{snakeToCamel(item)}</div>
                  <input
                    className={`p-4 h-7  rounded-lg ${
                      color === "#ED9ED6" && "bg-pink-300"
                    } ${color === "#87C4FF" && "bg-blue-300"}
                  ${color === "#9ADE7B" && "bg-green-300"} ${
                      color === "#FFCF96" && "bg-yellow-300"
                    }`}
                    placeholder={snakeToCamel(item)}
                    style={{ fontFamily: "Poppins" }}
                    value={params[item]}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <button
        className={`p-2  mx-2 text-white rounded-sm my-5 ${
          color === "#ED9ED6" && "bg-pink-600"
        } ${color === "#87C4FF" && "bg-blue-600"}
        ${color === "#9ADE7B" && "bg-green-600"} ${
          color === "#FFCF96" && "bg-yellow-600"
        }`}
        onClick={() => modelTrain()}
      >
        Model Train
      </button>

      <br />

      <h2
        className={`text-2xl mb-4 p-5 font-semibold border-t-2 border-b-2 ${
          color === "#ED9ED6" && "border-pink-500"
        } ${color === "#87C4FF" && "border-blue-500"}
      ${color === "#9ADE7B" && "border-green-500"} ${
          color === "#FFCF96" && "border-yellow-500"
        }`}
        style={{ fontFamily: "ClashGrotesk" }}
      >
        Accuracy
        <button className="h-15 text-xl p-1 mx-4 my-5 text-white bg-blue-700 rounded-md">
          {accuracy && <>{accuracy}</>}
        </button>
      </h2>

      <br />

      <div>
        <div>
          <h2
            className={`text-2xl mb-4 p-5 font-semibold border-t-2 border-b-2 ${
              color === "#ED9ED6" && "border-pink-500"
            } ${color === "#87C4FF" && "border-blue-500"}
      ${color === "#9ADE7B" && "border-green-500"} ${
              color === "#FFCF96" && "border-yellow-500"
            }`}
            style={{ fontFamily: "ClashGrotesk" }}
          >
            Input Features
          </h2>

          <div className="block columns-5 m-3">
            {features.map((item, index) => (
              <div key={index}>
                <input
                  className="my-2 h-10 text-white p-2 rounded-lg bg-slate-800"
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
          className="w-20 h-15 p-3 mx-4 my-5 text-white bg-green-900 rounded-md"
          onClick={() => {
            predictFun();
          }}
        >
          Predict
        </button>
      </div>

      <h2
        className={`text-2xl mb-4 p-5 font-semibold border-t-2 border-b-2 ${
          color === "#ED9ED6" && "border-pink-500"
        } ${color === "#87C4FF" && "border-blue-500"}
      ${color === "#9ADE7B" && "border-green-500"} ${
          color === "#FFCF96" && "border-yellow-500"
        }`}
        style={{ fontFamily: "ClashGrotesk" }}
      >
        <button className=" h-15 text-xl p-3 mx-0 my-5 bg-teal-700 text-white rounded-md">
          {predicted && <> Prediction Value {predict}</>}
        </button>
      </h2>
    </>
  );
}

export default MLAlgo;
