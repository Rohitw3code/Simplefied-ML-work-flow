import './DataTypeChange.css'
import React, { useEffect, useState } from 'react';



function DataTypeChange() {
    const [data, setData] = useState({});
    const [dtypes, setDtypes] = useState({});
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null); // Add error state

    const fetchData = async (update) => {
        try {
            const resp = await fetch(`http://127.0.0.1:5001/api/df/missingdata`);
            if (resp.ok) {
                const jsonData = await resp.json();
                setData(jsonData.missing);
                setDtypes(jsonData.dtypes);
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

    useEffect(() => {
        fetchData();
    },[]);

    return (<>
        <h3>Data type casting</h3>
        <div className="horizontal-table">
            <div>
                <div className="table-cell key-dtc cell-column">Columns </div>
                <div className="table-cell key-dtc cell-column">Data Types</div>
            </div>
            {Object.keys(data).map((key) => (
                <div key={key}>
                    <div className="table-cell key-dtc">{key} </div>
                    <div className="table-cell value-dtc">{dtypes[key]}</div>
                </div>
            ))}
        </div>
    </>
    );
}

export default DataTypeChange;