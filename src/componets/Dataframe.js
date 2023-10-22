import './Dataframe.css';
import React, { useEffect, useState } from 'react';

function Dataframe(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null); // Add error state

    useEffect(() => {
      fetchData();
    }, [props.rows]); 

    const fetchData = async () => {
      try {
        const resp = await fetch(`http://127.0.0.1:5001/api/df/${props.rows}`);
        if (resp.ok) {
          const jsonData = await resp.json();
          setData(jsonData);
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

    if (loading) {
      return <div>Loading...</div>; // Show a loading message while fetching data
    }

    if (error) {
      return <div>Error: {error}</div>; // Show an error message if there was an error
    }

    return (
        <div>
          DataFrame : {props.rows}
          
          <table>
            <thead>
              <tr>
                {Object.keys(data).map((key, index) => (
                  <th key={index}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.Name.map((value, index) => (
                <tr key={index}>
                  {Object.values(data).map((values, idx) => (
                    <td key={idx}>{values[index]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    );
}

export default Dataframe;
