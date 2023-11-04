// import '../css/DataTypeChange.css'
import React, { useEffect, useState } from 'react';

function DataTypeChange({ reloadDataTypeChange }) {
    const [dtypes, setDtypes] = useState({});
    const [columnDataTypes, setColumnDataTypes] = useState({}); 
    const [isSuccessful,setIsSuccessful] = useState(true);
    const [key, setKey] = useState(null);
    const [dtype, setDtype] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const resp = await fetch(`http://127.0.0.1:5001/api/df/datatypechange`);
            if (resp.ok) {
                const jsonData = await resp.json();
                setDtypes(jsonData.dtypes);
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

    const changeDataType = async (col,dtype) => {
        const url = 'http://127.0.0.1:5001/api/df/datatypechange'; // Replace with your API endpoint URL
        // Data to be sent in the request body
        const data = {
            key:col,
            dtype:dtype
        };

        try {
            const response = await fetch(url, {
                method: 'POST', // Use PUT for updating data
                headers: {
                    'Content-Type': 'application/json', // Specify the content type as JSON
                },
                body: JSON.stringify(data), // Convert data to JSON and send in the request body
            });

            if (response.ok) {
                const jsonResponse = await response.json();
                setDtypes(jsonResponse.dtypes);
                setIsSuccessful(jsonResponse.successful);
                setKey(jsonResponse.key);
                setDtype(jsonResponse.dtype);
                console.log('Data updated successfully:', jsonResponse);
            } else {
                // Request failed
                console.error('Failed to update data:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }



    useEffect(() => {
        fetchData();
    }, [reloadDataTypeChange]);

    const handleDataTypeChange = (column, dataType) => {
        setColumnDataTypes({
            ...columnDataTypes,
            [column]: dataType,
        });
        changeDataType(column,dataType);
    };

    return (
        <>
            <h3 className='text-2xl text-white p-5 font-semibold'>Data type casting</h3>
            <div className="flex mx-5">
                <div>
                    <div className="bg-slate-700 p-2 mx-1 my-1 rounded-sm">Columns</div>
                    <div className="bg-slate-700 p-2 mx-1 my-1 rounded-sm">Data Types</div>
                </div>
                {Object.keys(dtypes).map((key) => (
                    <div key={key}>
                        <div className="bg-slate-700 my-1 p-2 ">{key}</div><br/>
                        <div>
                            <select className='bg-inherit my-0'
                                value={columnDataTypes[key] || 'default'}
                                onChange={(e) => handleDataTypeChange(key, e.target.value)}
                            >
                                <option className='bg-slate-900 ' value="default" disabled>
                                   {dtypes[key]}
                                </option>
                                <option className='bg-slate-900 ' value="int">int</option>
                                <option className='bg-slate-900 ' value="boolean">boolean</option>
                                <option className='bg-slate-900 ' value="float">float</option>
                                <option className='bg-slate-900 ' value="object">object</option>
                            </select>
                        </div>
                    </div>
                ))}
            </div>
            <h4 className='not-cast-dtc'>{!isSuccessful ? `${key} can not be casted to ${dtype}` : null}</h4>  </>
    );
}

export default DataTypeChange;
