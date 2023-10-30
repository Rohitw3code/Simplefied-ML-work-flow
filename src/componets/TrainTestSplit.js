import "../css/TrainTestSplit.css";

function TrainTestSplit() {
  const fetchData = async () => {
    try {
      const url = `http://127.0.0.1:5001/api/dfcols`;
      const resp = await fetch(url);
      if (resp.ok) {
        const jsonData = await resp.json();
      }
    } catch (error) {}
  };

  return (
    <>
      <h4>Train Test Split</h4>
      <div className="train-test-split-field-tts">
        <input
          className="input-field-tts"
          placeholder="random state"
          type="number"
        />

        <input
          className="input-field-tts"
          placeholder="train-size %"
          type="number"
        />
      </div>
      <div className="shuffle-tts">
        <label>Shuffle</label>
        <select className="select-tts">
          <option value="float">true</option>
          <option value="object">false</option>
        </select>

        <button className="split-btn">split</button>


      </div>
    </>
  );
}

export default TrainTestSplit;
