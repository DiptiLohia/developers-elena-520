import React, { useRef, useState, useEffect } from 'react';
import { MapComponent } from './MapComponent';
// import inputs from './Inputs';

export const Inputs = (props) => {
  const [sourceLocation, setSourceLocation] = useState('');
  const [destinationLocation, setDestinationLocation] = useState('');

  function handleSourceChange(event) {
    setSourceLocation(event.target.value);
    }

  function handleDestinationChange(event) {
    setDestinationLocation(event.target.value);
  }
  function handlePathLimit(event) {
    props.setThreshold(event.target.value);
  }
  // function handleSubmitClick(event) {
  //   props.setHiddenState(false);
  // }
  function onValueChangeElevation(event) {
    props.setElevation(event.target.value);
  }
  function onValueChangeAlgorithm(event) {
    props.setAlgorithm(event.target.value);
  }

    const autoCompleteRefSource = useRef();
    const inputRefSource = useRef();
    const autoCompleteRefDest = useRef();
    const inputRefDest = useRef();
    const options = {
    fields: ["address_components", "geometry", "icon", "name"],
    }

    useEffect(() => {
     autoCompleteRefSource.current = new window.google.maps.places.Autocomplete(
      inputRefSource.current,
      options
     );
     autoCompleteRefSource.current.addListener("place_changed", async function () {
        const source = await autoCompleteRefSource.current.getPlace();
        console.log({ source });
        setSourceLocation(source);
        props.setOrigin(source);

       });
    
       autoCompleteRefDest.current = new window.google.maps.places.Autocomplete(
        inputRefDest.current,
        options
       );
       autoCompleteRefDest.current.addListener("place_changed", async function () {
          const dest = await autoCompleteRefDest.current.getPlace();
          setDestinationLocation(dest)
          props.setDestination(dest);
          console.log({ dest });
         });

    }, []);

  return (
    <form className = "input_forms">
    <div>
        <text style={{ marginLeft: '1rem'}}> Source </text>
        <input
        style={{ marginLeft: '1rem', marginBottom: '10px', justifyContent: "center", alignContent: "center" }} 
        ref= {inputRefSource}
        id = "source"
          label="source"
          type="address"
          name="source"
          onChange={handleSourceChange}
          placeholder="Enter Source"
          className="mbsc-col-12 mbsc-col-lg-6"
        />
        <text style={{ marginLeft: '1rem'}}> Destination </text>
        <input
          style={{ marginLeft: '1rem', marginBottom: '10px'}} 
          ref= {inputRefDest}
          label="destination"
          type="address"
          name="destination"
          onChange={handleDestinationChange}
          placeholder="Enter Destination"
        />
        <text style={{ marginLeft: '1rem'}}> Elevation </text>
        <input
          style={{ marginLeft: '1rem', marginBottom: '10px' }} 
          type="integer"
          name="pathLimit"
          onChange={handlePathLimit}
          placeholder="Enter path limit"
        />
    </div>
    <div>
    <div onChange = {onValueChangeElevation}>
        <input type="radio" value="min" name="elevationType"  onChange = {onValueChangeElevation}/> Minimum Elevation
        <input type="radio" value="max" name="elevationType"  onChange = {onValueChangeElevation}/> Maximum Elevation
      </div>
      <div onChange = {onValueChangeAlgorithm}>
        <input type="radio" value="AStar" name="AlgorithmType"  onChange = {onValueChangeAlgorithm}/> A* Algo
        <input type="radio" value="Dijkstra" name="AlgorithmType" onChange = {onValueChangeAlgorithm}/> Dijkstra Algo
      </div>
    </div>

    </form>
  );

  }