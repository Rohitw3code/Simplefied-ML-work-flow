import "../css/SelectTarget.css"
import React, { useEffect, useState } from 'react';

function SelectTarget() {
  const [columns, setColumns] = useState([]);
  const [update, setUpdate] = useState(false);
  const [targetfeature, setTargetfeature] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const resp = await fetch('http://127.0.0.1:5001/api/df/dataencoding');
      if (resp.ok) {
        const jsonData = await resp.json();
        setColumns(jsonData.columns);
      }
    } catch (error) {
      // Handle any errors here
      console.error('Error fetching data:', error);
    }
  };

  const setTarget = async (col)=>{
    const url = `http://127.0.0.1:5001/api/select-target-feature/${col}`; 
    try {
      const resp = await fetch(url);
      if (resp.ok) {
        const jsonData = await resp.json();
        if(jsonData.update){
          setUpdate(true);
          setTargetfeature(col);
        }
      }
    } catch (error) {
      // Handle any errors here
      console.error('Error fetching data:', error);
    }
  }

  return (
    <div>
      <h2>Columns:</h2>
      {columns.map((column, index) => (
        <button className="target-feature-btn-st" onClick={()=>{
          setTarget(column)
        }} key={index}>{column}</button>
      ))}
      {update && <>
      <h2>Target Feature</h2> <h3>{targetfeature}</h3>
      </>}
    </div>
  );
}

export default SelectTarget;
