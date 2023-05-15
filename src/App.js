import {Heading} from "./components/Heading";
import {Inputs} from "./components/Inputs";
import {Paths} from "./components/Paths";
import './App.css';
import React from 'react';
import { MapComponent } from "./components/MapComponent";
import {useState} from 'react';


function App() {
  const [isHidden, setIsHidden] = useState(true)

  const setHiddenState = (hidden) => {
    setIsHidden(hidden);
  };

  const handleSubmit = (e) => {
    console.log("here");
    e.preventDefault();
    console.log("refresh prevented");
  };


  return (
    
    <form onClick={handleSubmit}>
    <div>
    <Heading/>
    </div>
    <div className = "container">
      <div className= "half left">
      <Inputs setHiddenState = {setHiddenState}/>
      {/* <Paths/> */}
      {console.log(isHidden)}
      </div>
      {/* <MapComponent/> */}
      {isHidden == false? (<div className = "half right"> <MapComponent/> </div>): null}
    </div>
    </form>
    
  );
}

export default App;
