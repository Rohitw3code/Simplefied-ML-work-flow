import { useState } from "react";
import "../css/TrainTestSplit.css";

function TrainTestSplit() {
  const [randomstate, setRandomState] = useState(42);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(true);
  const [shuffle, setshuffle] = useState(false);
  const [trainsize, setTrainSize] = useState(80);
  const [trainshape, setTrainShape] = useState([]);
  const [testshape, setTestShape] = useState([]);

  const splitDf = async () => {
    const url = "http://127.0.0.1:5001/api/train-test-split";

    const data = {
      randomstate: randomstate,
      shuffle: shuffle,
      trainsize: trainsize,
    };

    try {
      const response = await fetch(url, {
        method: "POST", // Use PUT for updating data
        headers: {
          "Content-Type": "application/json", // Specify the content type as JSON
        },
        body: JSON.stringify(data), // Convert data to JSON and send in the request body
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        setTrainShape(jsonResponse.trainshape);
        setTestShape(jsonResponse.testshape);
        setSuccess(jsonResponse.success);
        setMessage(jsonResponse.message);
        console.log("Data updated successfully:", jsonResponse);
      } else {
        // Request failed
        console.error(
          "Failed to update data:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRandomState = (event) => {
    setRandomState(event.target.value);
  };

  const handleTrainState = (event) => {
    setTrainSize(event.target.value);
  };

  const handleShuffle = (event) => {
    setshuffle(event.target.value);
  };

  return (
    <>
      <h4 className="text-lg text-white mx-2 my-3 font-semibold">
        Train Test Split
      </h4>
      {!success && message}
      <div className="train-test-split-field-tts ">
        <div className="mx-5">
          <h3 className="text-white">Random State</h3>
          <input
            className="w-20 h-10 bg-slate-700 text-white p-1 rounded-xl my-5"
            placeholder="random state"
            type="number"
            value={randomstate}
            onChange={handleRandomState}
          />
        </div>

        <div className="mx-10">
          <h3 className="text-white">Train Size</h3>
          <input
            className="w-20 h-10 bg-slate-700 text-white p-1 rounded-xl mx-3 my-5"
            placeholder="train-size %"
            type="number"
            value={trainsize}
            onChange={handleTrainState}
          />
        </div>
      </div>

      <div className="shuffle-tts">
        <label className="font-semibold">Shuffle</label>
        <select
          className="bg-slate-800 p-2 rounded-md mx-3"
          value={shuffle || true}
          onChange={(e) => handleShuffle(e.target.value)}
        >
          <option className="bg-slate-900" value="true">true</option>
          <option className="bg-slate-900" value="false">false</option>
        </select>

        <button
          className="p-2 w-20 bg-rose-700 rounded-xl"
          onClick={() => {
            splitDf();
          }}
        >
          split
        </button>

        <div>
          {trainshape.length === 0 ? (
            ""
          ) : (
            <>
              <p>No. of rows in Train {trainshape[0]}</p>
            </>
          )}
          {testshape.length === 0 ? (
            ""
          ) : (
            <>
              <p>No. of rows in Test {testshape[0]}</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default TrainTestSplit;
