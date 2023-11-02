import React, { useEffect, useState } from 'react';

function Unique (){
    const [uni,setUni] = useState({});
    const [keys,setKeys] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null); // Add error state
  
    useEffect(() => {
        fetchUnique();
    }, []);

    const fetchUnique=async()=>{
        try {
            const resp = await fetch(`http://127.0.0.1:5001/api/unique-values`);
            if (resp.ok) {
              const jsonData = await resp.json();
              setUni(jsonData.unique_value);
              setKeys(jsonData.keys);
              setLoading(false);
            } else {
              setError("Failed to fetch data");
              setLoading(false); // Set loading to false in case of an error
            }
          } catch (error) {
            setError("Error: " + error.message);
            setLoading(false); // Set loading to false in case of an error
          }      
    }



    return (<>
    Unique

    {keys.map((item,index)=>{
        <>
        {item}
        </>
    })}

    {error}


    </>);

}

export default Unique;