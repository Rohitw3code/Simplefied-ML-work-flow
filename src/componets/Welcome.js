import React, { useState } from "react";
import "../css/Welcome.css";

function Welcome({triggerReloadSelectedFile}) {
  const [selectedFile, setSelectedFile] = useState({"name":"No Selected"});

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const loadData = async () => {
    try {
      const resp = await fetch(
        `http://127.0.0.1:5001/api/load-dataset/${selectedFile.name}`
      );
      if(resp.ok){
        const jsonData = await resp.json();
        if(jsonData.success){
          triggerReloadSelectedFile(true);
        }
        else{
          triggerReloadSelectedFile(false)
        }

      }
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="relative h-screen w-screen bg-slate-950 overflow-hidden">
        {/* <div className="machine-learning-bg"></div> */}
        <h1 className="text-white text-center text-4xl p-10  font-mono font-bold border-l-4">
          Simplified ML workflow
        </h1>

        <div className="mx-auto my-3 p-6 rounded-lg shadow-md text-center relative max-w-2xl animate__animated animate__fadeIn">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Get Started with <span className="animate-typing">Your Data</span>
          </h2>
          <p className="text-gray-400 mb-4 ">
            Load your CSV dataset into our tool, handle missing data, and
            perform feature selection effortlessly using our built-in prebuilt
            tool.
          </p>
          <p className="text-gray-400 mb-4 ">
            After preprocessing, select relevant features and categorize your
            data into specific categories. Choose the algorithm type, select the
            algorithm, train your model, and predict values with ease.
          </p>
          <p className="text-gray-400 mb-4">
            Explore the power of data analysis and machine learning in a simple
            and user-friendly environment.
          </p>
        </div>

        <div className="flex items-center justify-center animate__animated animate__fadeInUp">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="border-2 border-blue-500 rounded-lg mb-4 bg-slate-800 text-white p-2 m-3"
          />
          <button
            onClick={loadData}
            className=" font-mono text-white p-2 m-3 bg-rose-600 rounded-md animate__animated animate__fadeInUp animate__delay-1s"
          >
            Start
          </button>
          <div className="text-white">
          </div>
        </div>
      </div>
    </>
  );
}

export default Welcome;
