import "../css/Dataframe.css";
import React, { useEffect, useState } from "react";

function Dataframe(props) {
  const [data, setData] = useState([]);
  const [shape, setShape] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    fetchData();
  }, [props.cols]);

  const fetchData = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (props.cols) {
        queryParams.append("cols", props.cols.join(","));
      } else {
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
    <div className="p-2">
      {props.shapeDisplay ? (
        <div className="flex font-mono">
          <div className="text-white bg-blue-900 p-2 rounded my-3 mx-1">
            Row {shape[0]}
          </div>
          <div className="text-white bg-blue-900 p-2 rounded my-3 mx-1">
            Column {shape[1]}
          </div>
          <div className="text-white bg-blue-900 p-2 rounded my-3 mx-1">
            Shape {shape[0]} x {shape[1]}
          </div>
        </div>
      ) : null}
      <table>
        <thead>
          <tr>
            {Object.keys(data).map((key, index) => (
              <th
                className="text-white bg-blue-900 font-thin  p-2 border-0 "
                key={index}
              >
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-red-900">
          {buttonArray.map((index) => (
            <tr>
              {Object.values(data).map((values, idx) =>
                values.length > 0 ? (
                  <>
                    <td
                      className="bg-blue-950 text-white font-mono border-0"
                      key={idx}
                    >
                      {values[index]}
                    </td>
                  </>
                ) : null
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {props.shapeDisplay ? (
        <div className="flex">
          <div className="text-white p-2 rounded my-3 font-mono bg-cyan-900">
            Shape {props.rows} x {shape[1]}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Dataframe;
