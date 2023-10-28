import "./Dataframe.css";
import React, { useEffect, useState } from "react";

function Dataframe(props) {
  const [data, setData] = useState([]);
  const [shape, setShape] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    fetchData();
  },[props.cols]);

  const fetchData = async () => {
    try {
      const queryParams = new URLSearchParams();
      if(props.cols){
        queryParams.append("cols", props.cols.join(","));
      }
      else{
        queryParams.append("cols", [].join(","));
      }

      const url = `http://127.0.0.1:5001/api/df/${
        props.rows
      }?${queryParams.toString()}`;
      const resp = await fetch(url);
      if (resp.ok) {
        const jsonData = await resp.json();
        setData(jsonData.data);
        setShape(jsonData.shape);
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

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const buttonArray = Array.from({ length: props.rows }, (_, index) => index);

  return (
    <div className="section">
      {props.shapeDisplay ? (
        <div className="tags">
          <button className="tag">Row {shape[0]}</button>
          <button className="tag">Column {shape[1]}</button>
          <button className="tag">
            Shape {shape[0]} x {shape[1]}
          </button>
        </div>
      ) : null}
      <table>
        <thead>
          <tr>
            {Object.keys(data).map((key, index) => (
              <th key={index}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {buttonArray.map((index) => (
            <tr>
              {Object.values(data).map((values, idx) =>
                values.length > 0 ? (
                  <>
                    <td key={idx}>{values[index]}</td>
                  </>
                ) : null
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {props.shapeDisplay ? (
        <button className="shape">
          Shape {props.rows} x {shape[1]}
        </button>
      ) : null}
    </div>
  );
}

export default Dataframe;
