import React, {useState, useEffect} from "react";

function App(){
  const [imgData, setImgData] = useState([]);
  const [imgURL, setImgURL] = useState("");
  const [charName, setCharName] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData(){
      try{
        const response = await fetch("https://dattebayo-api.onrender.com/characters");
        const data = await response.json();
  
        const newArr = data.characters.map((d) => {
          return {[d.name]: d.images[0]}
        });
        setImgData(newArr.map((elem) => {return Object.entries(elem)}));
      }catch(e){
        console.log(e);
      }
    }
  
    fetchData();
  }, []); // so api call is made on the first render

  function handleOnClick(){
    const choice = Math.floor(Math.random() * imgData.length);
    async function checkURL(){
      const response = await fetch(imgData[choice][0][1]);
      if(response.ok){
        setImgURL(imgData[choice][0][1]);
        setCharName(imgData[choice][0][0]);
        setError(false);
      }else{
        setError(true);
      }
    }
    checkURL();
  }

  return(
    <div id="container">
      <div id="main">
        <h1 className="my-4 page-text">Anime Pics Generator</h1>
        <button className="mb-3 btn-md page-text" onClick={handleOnClick}>Get Anime</button>
        {error ? <p className="page-text info">Error! Please try again</p> : (imgURL && <img src={imgURL}/>)}
        <p className="my-2 page-text info">{charName}</p>
      </div>
    </div>
  )
};

export default App;