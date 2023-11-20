import React, { useState } from "react";
import "../css/Welcome.css";

function Welcome({ triggerReloadSelectedFile }) {
  const [selectedFile, setSelectedFile] = useState({ "name": "No Selected" });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const loadData = async () => {
    try {
      const resp = await fetch(
        `http://127.0.0.1:5001/api/load-dataset/${selectedFile.name}`
      );
      if (resp.ok) {
        const jsonData = await resp.json();
        if (jsonData.success) {
          triggerReloadSelectedFile(true);
        }
        else {
          triggerReloadSelectedFile(false)
        }

      }

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="relative w-screen min-h-screen">
        <header className=" z-50 absolute w-11/12 p-1 top-5 left-1/2 -translate-x-1/2 text-white flex items-center justify-between
         border-indigo-600"
          style={{
            background: ' rgba( 10, 66, 255, 0.5 )',
        backdropFilter: 'blur( 4px )',
        borderRadius: '100px',
        boxShadow: 'rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba( 10, 60, 255, 0.2 ) 0px 32px 16px',
        fontFamily : 'Poppins'
      }}>
        <div className=" text-2xl p-3">
          <h1 className="">ML Workflow</h1>
        </div>
        <nav className=" flex gap-5 mr-4">
          <li className=" list-none text-xl border-r-2 pr-3 "><a href="#">Home</a></li>
          <li className=" list-none text-xl border-r-2 pr-3"><a href="#">Pricing</a></li>
          <li className=" list-none text-xl"><a href="#">Help</a></li>
        </nav>
        <ul>
        <li className=" list-none text-xl bg-blue-500 transition delay-100 hover:bg-green-500 shadow-purple-500 px-4 rounded-3xl p-3"
        style={{ boxShadow : '0 0 15px 5px rgba(240, 46, 170, 0.3)'}}><a href="#">Connect</a></li>
        </ul>
      </header>
      <div className="h-screen w-screen grid place-items-center relative" style={{
        background: "linear-gradient(360deg, #000429 5%, rgba(9,9,121,0.1) 41%, rgba(0,212,255,0.1) 100%),url('/background.jpg')",
        backgroundPosition: '100% 100%',
        backgroundSize: '100%',
        backgroundOrigin: 'center',
        backgroundRepeat : 'no-repeat'
      }}>
         <div className=" font-Meuso font-semibold flex items-center justify-center text-white" style={{
           fontFamily :'Poppins',
         }}>
            <h1 className=" w-3/4" style={{
              fontSize : 'clamp(5vw,5rem,3vw)'
            }}>   Simplified    <span className=" rounded-lg border-2 border-purple-700" style={{ fontFamily : 'MuseoModerno', fontSize :  'clamp(7vw,6rem,4vw)',
            boxShadow: 'rgba(240, 46, 170, 0.4) 0px 10px, rgba(240, 46, 170, 0.3) 0px 20px, rgba(240, 46, 170, 0.2) 0px 25px, rgba(240, 46, 170, 0.1) 0px 30px, rgba(240, 46, 170, 0.05) 0px 35px',}}>Machine Learning</span> Workflow.</h1>
         </div>
         <div className=" z-40 absolute right-16 -bottom-10">
          <div className="relative animate__animated animate__fadeInUp">
         <img src={'robot.png'} className=" z-30 absolute -top-60 left-24 translate-y-10 w-60 animate__animated animate__fadeInUp animate__delay-1s"/>
         <div className=" w-96 h-44 rounded-3xl grid place-items-center border border-purple-700"
         style={{ boxShadow: '0px 17px 66px -14px rgba(144,19,254,1) inset,3px 2px 60px 6px rgba(74,144,226,0.6)',
         transform : ' perspective(75em) rotateX(50deg)',
         fontFamily : 'Shippori Antique B1'}}>
         </div>
         </div>
         </div>
      </div>
      <div className="relative h-screen w-screen overflow-hidden" style={{ background: '#000429' }}>
        {/* <div className="machine-learning-bg"></div> */}

        <div className=" flex mt-3 items-center h-full flex-row-reverse">
        <div className="mx-auto mr-3 pr-10 p-6 rounded-lg shadow-md relative max-w-2xl animate__animated animate__fadeIn"
        style={{ fontFamily : 'Space Grotesk'}}>
          <h2 className=" font-bold mb-4 text-white border-b-2 border-blue-600" style={{fontSize : 'clamp(3vw,2rem,2vw)'}}>
            Get Started with <span className="animate-typing">Your Data</span>
          </h2>
          <p className="text-gray-400 mb-4 " style={{fontSize : 'clamp(1.5vw,1.5rem,1vw)'}} >
            Load your CSV dataset into our tool, handle missing data, and
            perform feature selection effortlessly using our built-in prebuilt
            tool.
          </p>
          <p className="text-gray-400 mb-4 " style={{fontSize : 'clamp(1.5vw,1.5rem,1vw)'}}>
            After preprocessing, select relevant features and categorize your
            data into specific categories. Choose the algorithm type, select the
            algorithm, train your model, and predict values with ease.
          </p>
          <p className="text-gray-400 mb-4" style={{fontSize : 'clamp(1.5vw,1.5rem,1vw)'}}>
            Explore the power of data analysis and machine learning in a simple
            and user-friendly environment.
          </p>
        </div>

        <div className="w-full h-3/4 displaay flex items-center flex-col">
        <div className="w-1/2 h-4/5 rounded-2xl border border-dashed flex items-center justify-center"
        style={{background: 'linear-gradient(297deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)'}}>
          <div className=" w-1/2 h-1/2 bg-blue-700 rounded-full grid place-items-center"
          style={{boxShadow: 'rgba(240, 255, 255, 0.4) 0px 0px 0 8px , rgba(240, 255, 255, 0.3) 0px 0px 0 15px ,rgba(240, 255, 255, 0.2) 0px 0px 0 23px ,rgba(240, 255, 255, 0.2) 0px 0px 6px 32px'}}>
            <h2 className=" text-center sm:text-xl text-yellow-500 lg:text-5xl font-extrabold" style={{ fontFamily : 'Shippori Antique B1'}}>Drop Here</h2>
          </div>
          </div>
          <p className=" text-white text-xl mt-2 font-extrabold" style={{ fontFamily : 'Poppins'}}>Manual</p>
          <div>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="border-2 border-blue-500 rounded-lg mb-4 bg-slate-800 text-white p-2 m-3"
          />
          </div>
          <button
            onClick={loadData}
            className=" font-mono text-white p-2 m-3 bg-rose-600 rounded-md"
          >
            Start
          </button>
          <div className="text-white">
          </div>
        </div>
        </div>
      </div>
      <div className=" relative grid place-items-center w-screen h-screen" style={{ background : "url('foter.jpg') center 100% no-repeat",
    backgroundPosition: '100% 100%',
    backgroundSize: '100%',
    backgroundOrigin: 'center',
    backgroundRepeat : 'no-repeat',
    }}>
       <div className="w-screen absolute top-0">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#000429" fill-opacity="1" d="M0,224L48,202.7C96,181,192,139,288,112C384,85,480,75,576,96C672,117,768,171,864,181.3C960,192,1056,160,1152,160C1248,160,1344,192,1392,208L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
      </div>
         <div className=" w-4/5 h-2/3 md:mt-48 border rounded-3xl backdrop-blur-md flex"
         style={{ boxShadow : '0 0 20px 5px rgba(255,255,255,0.2)'}}>
          <div className=" lg:w-1/2 h-full rounded-3xl relative flex items-start justify-start pr-4">
             <img src="/video_code.gif" className=" w-3/4 h-full rounded-l-3xl object-cover rounded-r-lg"/>
          </div>
          <div className=" lg:w-1/2 flex-1 border rounded-3xl">

          </div>
         </div>
      </div>
    </div >
    </>
  );
}

export default Welcome;
