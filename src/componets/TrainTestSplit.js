import "../css/TrainTestSplit.css"

function TrainTestSplit(){

    const fetchData = async () => {
        try {
          const url = `http://127.0.0.1:5001/api/dfcols`;
          const resp = await fetch(url);
          if (resp.ok) {
            const jsonData = await resp.json();
          } 
        } catch (error) {
        }
      };
    


    return (
        <>
        Train Test Split
        </>
    );

}

export default TrainTestSplit;