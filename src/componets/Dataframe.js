import "../css/Dataframe.css";
import React, { useContext, useEffect, useState } from "react";
import ThemeContext from "./ThemeContext";

function Dataframe(props) {
  const [data, setData] = useState([]);
  const [shape, setShape] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  const color = useContext(ThemeContext);
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
    <div className="p-2" style={{ fontFamily : 'ClashGrotesk' }}>
      {props.shapeDisplay ? (
        <>
        <div className="w-5/6 flex justify-around">
        <div className="flex justify-center">
          <div className={`border border-gray-300 uppercase p-2 rounded my-3 mx-1 flex gap-3
          ${color === '#ED9ED6' && 'bg-pink-500'} ${color === '#87C4FF' && 'bg-blue-500'}
          ${color === '#9ADE7B' && 'bg-green-500'} ${color === '#FFCF96' && 'bg-yellow-500'}`}>
            <h1> Row</h1>
            <span style={{ fontFamily : 'Poppins' }}>{shape[0]}</span>
          </div>
          <div className={`border border-gray-300 uppercase p-2 rounded my-3 mx-1 flex gap-3
          ${color === '#ED9ED6' && 'bg-pink-500'} ${color === '#87C4FF' && 'bg-blue-500'}
          ${color === '#9ADE7B' && 'bg-green-500'} ${color === '#FFCF96' && 'bg-yellow-500'}`}>
            <h1> Column </h1>
            <span style={{ fontFamily : 'Poppins' }}>{shape[1]}</span>
          </div>
          <div className={`border border-gray-300 uppercase p-2 rounded my-3 mx-1 flex gap-3
          ${color === '#ED9ED6' && 'bg-pink-500'} ${color === '#87C4FF' && 'bg-blue-500'}
          ${color === '#9ADE7B' && 'bg-green-500'} ${color === '#FFCF96' && 'bg-yellow-500'}`}>
            <h1> Shape </h1>
            <span style={{ fontFamily : 'Poppins' }}>{shape[0]} x {shape[1]}</span>
          </div>
        </div>
        <div>
        {props.shapeDisplay ? (
          <div className="flex">
            <div className="text-white p-2 rounded my-3 font-mono bg-cyan-900">
              Current Shape {props.rows} x {shape[1]}
            </div>
          </div>
        ) : null}
        </div>
        </div>
        </>
      ) : null}
      <div className=" flex justify-center">
      <div className="w-5/6 max-h-96 overflow-auto rounded-md"
      style={{boxShadow: 'rgba(0,0,0,0.2) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px'}}>
      <table className=" w-full">
        <thead>
          <tr>
            {Object.keys(data).map((key, index) => (
              <th
                className={`font-thin  p-2 border-0
          ${color === '#ED9ED6' && 'bg-pink-500'} ${color === '#87C4FF' && 'bg-blue-500'}
          ${color === '#9ADE7B' && 'bg-green-500'} ${color === '#FFCF96' && 'bg-yellow-500'}`}
                style={{
                  fontFamily : 'Poppins'
               }}
                key={index}
              >
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-red-900">
          {buttonArray.map((index) => (
            <tr style={{
              fontFamily : 'Poppins'
           }}>
              {Object.values(data).map((values, idx) =>
                values.length > 0 ? (
                  <>
                    <td
                      colSpan={1}
                      style={{ background : '#FFF6F6',color : '#164863',fontFamily : 'Poppins',}}
                      className=" p-2 text-white font-semibold border-0"
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
      </div>
      </div>
    </div>
  );
}

export default Dataframe;
