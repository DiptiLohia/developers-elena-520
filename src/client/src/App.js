import {Heading} from "./components/Heading";
import {Inputs} from "./components/Inputs";
import {Paths} from "./components/Paths";
import './App.css';
import React from 'react';
import { MapComponent } from "./components/MapComponent";


function App() {
  return (
    <div>
    <div>
    <Heading/>
    </div>
    <div className = "container">
      <div className= "half left">
      <Inputs/>
      <Paths/>
      </div>
      <div className = "half right">
      <MapComponent/>
    </div>
    </div>
    </div>
  );
}

export default App;
