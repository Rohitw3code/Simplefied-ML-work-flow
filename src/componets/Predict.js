import React, { useEffect, useState } from "react";
import "../css/Predict.css";

function Predict() {
  const [features, setFeatures] = useState([]);
  const [target, setTarget] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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


  return (
    <>
      Features :
      {features.map((item, index) => {
        <>
          <input type="text" placeholder={item} />
        </>;
      })}
    </>
  );
}

export default Predict;
