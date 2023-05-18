import {Heading} from "./components/Heading";
import {Inputs} from "./components/Inputs";
import {Paths} from "./components/Paths";
import './App.css';
import React from 'react';
import { MapComponent } from "./components/MapComponent";
import {useState} from 'react';
import { useRef, useEffect } from 'react';

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'


const center = { lat: 48.8584, lng: 2.2945 }

function App() {
  const [isHidden, setIsHidden] = useState(true)
  const [origin,setOrigin] = useState(null);
  const [destination, setDestination] = useState(null)
  const setHiddenState = (hidden) => {
    setIsHidden(hidden);
  };

  const handleSubmit = (e) => {
    console.log("here");
    e.preventDefault();
    console.log("refresh prevented");
  };
  var res = null;
  const [directionsResponse, setDirectionsResponse] = useState(null)

  // eslint-disable-next-line no-undef
  const directionService =  new google.maps.DirectionsService()
  let results = null;

   async function handleSubmitClick(e){
    e.preventDefault();
    setIsHidden(false);
  //   if(destination!==null && origin!==null){
  //     console.log("******");
  //     console.log(origin);
  //     console.log("******");
  //     results =  await directionService.route({
  //       origin: {lat: origin.geometry.location.lat(), lng: origin.geometry.location.lng()},
  //       destination: {lat:destination.geometry.location.lat(), lng:destination.geometry.location.lng()},
  //       // eslint-disable-next-line no-undef
  //       travelMode: google.maps.TravelMode.WALKING,
  //     })
  // }
  const request = {
    origin: {lat: origin.geometry.location.lat(), lng: origin.geometry.location.lng()},
    destination: {lat:destination.geometry.location.lat(), lng:destination.geometry.location.lng()},
    travelMode: 'WALKING'
  };
  directionService.route(request, function(response, status) {
    if (status === 'OK') {
      // Process the response
      // const directionsRenderer = new google.maps.DirectionsRenderer();
      // directionsRenderer.setMap(map);
      // directionsRenderer.setDirections(response);
      console.log("here is response");
      console.log(response);
      setDirectionsResponse(response);
      // res = response;
      console.log(directionsResponse);
      console.log("####");
      console.log(directionsResponse);
      console.log("####");
    } else {
      // Handle errors
      console.error('Directions request failed due to ' + status);
    }
  });
    // console.log("here is result");
    // console.log(results);

  };
  

  useEffect(() => {
    // Action to perform after state update
    console.log('State updated:', directionsResponse);
  }, [directionsResponse]);

  return (
    
    <form onClick={handleSubmit}>
    <div>
    <Heading/>
    </div>
    <div className = "container">
      <div className= "half left">
      <Inputs setHiddenState = {setHiddenState} setDestination = {setDestination} setOrigin = {setOrigin}/>
      {/* <Paths/> */}
      {console.log(isHidden)}
      </div>
      {/* <MapComponent/> */}
      <button
      onClick={handleSubmitClick}>
          Search
      </button>
      {isHidden == false? (<div className = "half right"> <div style={{ height: '400px', width: '900px' }}>;
  <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{ width: '100%', height: '100%' }}>
        <Marker position={center} /> 
        {console.log("res is printing")}
        {console.log(directionsResponse)}
        {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
  </GoogleMap>
  
</div>
 </div>): null}

    </div>
    </form>
    
  );
}

export default App;
