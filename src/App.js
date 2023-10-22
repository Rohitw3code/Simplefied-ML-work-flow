import './App.css';
import React, { useEffect, useState } from 'react';
import Dataframe from './componets/Dataframe';

function App() {
  const [data, setData] = useState([]);

  return (
    <div>
      <h1></h1>
      <Dataframe rows="2" />
      <Dataframe rows="2" />
    </div>
  );
}

export default App;
