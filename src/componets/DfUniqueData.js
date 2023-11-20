import '../css/DfUniqueData.css'
import React, { useContext, useEffect, useState } from 'react';
import ThemeContext from './ThemeContext';

function DfUniqueData() {
    const [data, setData] = useState({});
    const [shape, setShape] = useState({});
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    const color = useContext(ThemeContext) 
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
        <div className='section text-lg' style={{fontFamily : 'ClashGrotesk'}}>
            <div className='mx-3 p-2'>Total no. of Rows : <span className='px-4 rounded border-b-4 border-blue-700'>{shape[0]}</span></div>
            <div className='mx-3 p-2'>Total no. of Columns : <span className='px-4 rounded border-b-4 border-blue-700'>{shape[1]}</span></div>
            <div className="flex mx-5" style={{ fontFamily : 'Poppins'}}>
                {Object.keys(data).map((key) => (
                    <div key={key}>
                        <div className={`text-white p-2 ${color === '#ED9ED6' && 'bg-pink-600'} ${color === '#87C4FF' && 'bg-blue-600'}
              ${color === '#9ADE7B' && 'bg-green-600'} ${color === '#FFCF96' && 'bg-yellow-600'}`}>{key}</div>
                        <div className="text-white bg-slate-800 p-2"
                        style={{ background : '#E0F4FF',color : '#164863',fontFamily : 'Poppins',}}>{data[key]}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DfUniqueData;
