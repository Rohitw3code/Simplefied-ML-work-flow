import '../css/DfUniqueData.css'
import React, { useEffect, useState } from 'react';

function DfUniqueData() {
    const [data, setData] = useState({});
    const [shape, setShape] = useState({});
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const resp = await fetch(`http://127.0.0.1:5001/api/df/dfuniquecount`);
            if (resp.ok) {
                const jsonData = await resp.json();
                setData(jsonData.data);
                setShape(jsonData.shape);
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



    return (
        <div className='section'>
            <div className='mx-3 p-2'>Total no. of Rows : {shape[0]}</div>
            <div className='mx-3 p-2'>Total no. of Columns : {shape[1]}</div>
            <div className="flex mx-5">
                {Object.keys(data).map((key) => (
                    <div key={key}>
                        <div className="text-white bg-blue-900  p-2">{key}</div>
                        <div className="text-white bg-slate-800 p-2">{data[key]}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DfUniqueData;
