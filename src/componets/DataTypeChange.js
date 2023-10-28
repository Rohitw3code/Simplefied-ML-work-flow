import '../css/DataTypeChange.css'
import React, { useEffect, useState } from 'react';

function DataTypeChange() {
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
    }, []);

    const handleDataTypeChange = (column, dataType) => {
        setColumnDataTypes({
            ...columnDataTypes,
            [column]: dataType,
        });
        changeDataType(column,dataType);
    };

    return (
        <>
            <h3>Data type casting</h3>
            <div className="horizontal-table">
                <div>
                    <div className="table-cell key-dtc cell-column">Columns</div>
                    <div className="table-cell key-dtc cell-column">Data Types</div>
                </div>
                {Object.keys(dtypes).map((key) => (
                    <div key={key}>
                        <div className="table-cell key-dtc">{key}</div>
                        <div className="table-cell value-dtc">
                            <select className='select-dtc'
                                value={columnDataTypes[key] || 'default'}
                                onChange={(e) => handleDataTypeChange(key, e.target.value)}
                            >
                                <option value="default" disabled>
                                   {dtypes[key]}
                                </option>
                                <option value="int">int</option>
                                <option value="boolean">boolean</option>
                                <option value="float">float</option>
                                <option value="object">object</option>
                            </select>
                        </div>
                    </div>
                ))}
            </div>
            <h4 className='not-cast-dtc'>{!isSuccessful ? `${key} can not be casted to ${dtype}` : null}</h4>  </>
    );
}

export default DataTypeChange;
