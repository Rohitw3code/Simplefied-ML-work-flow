import './MissingData.css'
import React, { useEffect, useState } from 'react';

function MissingData(props) {
    const [data, setData] = useState({});
    const [dtypes, setDtypes] = useState({});
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null); // Add error state
    const [clickedButton, setClickedButton] = useState(null);

    useEffect(() => {
        fetchData();
    }, [props.rows]);

    const fetchData = async () => {
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

    if (loading) {
        return <div>Loading...</div>; // Show a loading message while fetching data
    }

    if (error) {
        return <div>Error: {error}</div>; // Show an error message if there was an error
    }

    const handleButtonClick = (key) => {
        setClickedButton(key);
    };

    return (
        <div className='section'>
            <div className="horizontal-table">
                {Object.keys(data).map((key) => (
                    <div key={key} className="table-row">
                        <div className="table-cell key">{key} {dtypes[key]}</div>
                        <div className="table-cell value">{data[key]}</div>
                    </div>
                ))}
            </div>
            <div>
                <h4>Fix the missing data</h4>
                {Object.keys(data).map((key) => (
                    data[key] !== 0 && (
                        <button
                            key={key}
                            className={`fix btn ${clickedButton === key ? 'clicked' : ''}`}
                            onClick={() => handleButtonClick(key)}
                        >
                            {key}
                        </button>)
                ))}

                {clickedButton && (
                    <div className="additional-buttons">
                        {clickedButton === 'Age' && (
                            <button className="btn fixer">mean</button>
                        )}
                        {clickedButton === 'Cabin' && (<>
                            <button className="btn fixer">mode</button>
                            <button className="btn fixer">median</button>
                        </>
                        )}
                        <button className="btn fixer">remove</button>
                        <button className="btn fixer">replace</button>
                    </div>)}

            </div>
        </div>
    );
}

export default MissingData;
