import './App.css';
import React, { useEffect, useState } from 'react';
import Dataframe from './componets/Dataframe';
import MissingData from './componets/MissingData';

function App() {
  const [userInput, setUserInput] = useState(1);

  const [sectionBVisible, setSectionBVisible] = useState(false);

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
        <Dataframe rows={userInput} shapeDisplay="true" />
      </div>
      <div className='section B'>
        <button className='section-btn' onClick={sectionBVisibleFun}>Missing Value</button>
        <MissingData />
      </div>
    </div>
  );
}

export default App;
