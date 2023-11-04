import './css/App.css';
import React, { useEffect, useState } from 'react';
import Dataframe from './componets/Dataframe';
import MissingData from './componets/MissingData';
import DataTypeChange from './componets/DataTypeChange';
import DataEncoding from './componets/DataEncoding';
import DfUniqueData from './componets/DfUniqueData';
import SelectFeatureTarget from './componets/SelectFeatureTarget';
import TrainTestSplit from './componets/TrainTestSplit';
import MLAlgo from './componets/MLAlog';

function App() {

  const [userInput, setUserInput] = useState(1);
  const [cols,setCols] = useState([]);
  const [sectionBVisible, setSectionBVisible] = useState(false);

  const [reloadDataTypeChange, setReloadDataTypeChange] = useState(false);


  const triggerReloadDataTypeChange = () => {
    setReloadDataTypeChange(prevReloadDataTypeChange => !prevReloadDataTypeChange);
  }
  

  const fetchData = async () => {
    try {
      const url = `http://127.0.0.1:5001/api/dfcols`;
      const resp = await fetch(url);
      if (resp.ok) {
        const jsonData = await resp.json();
        setCols(jsonData.cols);
      } 
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchData();
  },[]);

  const sectionBVisibleFun = () => {
    setSectionBVisible(true);
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  }

  return (
    <div>
      
      <h1 className='title'>Data Preprocessing </h1>
      
      <div className='section A'>
        <input className='input-head' placeholder='Enter number of rows' type="number" value={userInput} onChange={handleInputChange} />
        <Dataframe rows={userInput} cols={[]} shapeDisplay="true" />
      </div>
      
      <div className='section B'>
        <button className='section-btn' onClick={sectionBVisibleFun}>Missing Value</button>
        <MissingData triggerReloadDataTypeChange={triggerReloadDataTypeChange} />
      </div>
      
      <div className='section C'>
        <DataTypeChange reloadDataTypeChange={reloadDataTypeChange} />
      </div>

      <div className='section D'>
        <button className='section-btn' onClick={sectionBVisibleFun}>Data Encoding</button>
        <DataEncoding />
      </div>

      <div className='section E'>
        <SelectFeatureTarget />
      </div>

      <div className='section E'>
        <TrainTestSplit />
      </div>

      <div className='section E'>
        <MLAlgo />
      </div>


    </div>
  );
}

export default App;
