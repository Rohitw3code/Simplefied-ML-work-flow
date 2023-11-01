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
      <h4>Train Test Split</h4>
      {!success && message}
     <div className="train-test-split-field-tts">
        <input
          className="input-field-tts"
          placeholder="random state"
          type="number"
          value={randomstate}
          onChange={handleRandomState}
        />

        <input
          className="input-field-tts"
          placeholder="train-size %"
          type="number"
          value={trainsize}
          onChange={handleTrainState}
        />
      </div>

      <div className="shuffle-tts">
        <label>Shuffle</label>
        <select
          className="select-tts"
          value={shuffle || true}
          onChange={(e) => handleShuffle(e.target.value)}
        >
          <option value="true">true</option>
          <option value="false">false</option>
        </select>

        <button
          className="split-btn"
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
