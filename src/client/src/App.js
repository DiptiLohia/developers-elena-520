import {Heading} from "./components/Heading";
import {Inputs} from "./components/Inputs";
import {Paths} from "./components/Paths";
import './App.css';
import React from 'react';
import { MapComponent } from "./components/MapComponent";
import {useState} from 'react';
import { useRef, useEffect } from 'react';
import jsonData from './backend_path.json';


import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { calculateSize } from "@iconify/react";


const center = { lat: 48.8584, lng: 2.2945 }
var waypoints = [];
function App() {
  const [isHidden, setIsHidden] = useState(true)
  const [origin,setOrigin] = useState(null);
  const [destination, setDestination] = useState(null)
  const [pathPoints, setPathPoints] = useState(null);
  const setHiddenState = (hidden) => {
    setIsHidden(hidden);
  };


  function parseBackendResponse(jsonData)
  {

    // const  = jsonData;
    // setPathPoints(data.elev_path_route.coordinates);
    console.log("#######$$$$");
    console.log(jsonData.elev_path_route.geometry.coordinates);
    setPathPoints(jsonData.elev_path_route.geometry.coordinates);
    console.log("#######$$$$");
    
    for(var i = 0; i<jsonData.elev_path_route.geometry.coordinates.length; i++)
    {
      var tempList = {lat: 0 , lng: 0};
      tempList.lat = jsonData.elev_path_route.geometry.coordinates[i][1];
      tempList.lng = jsonData.elev_path_route.geometry.coordinates[i][0];
      var tempList2 = {location: null, stopover: false }
      tempList2.location = tempList;

      if(i%4==0){
      waypoints.push(tempList2);
      }
    }

    console.log(waypoints);
  }

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
    parseBackendResponse(jsonData);
    console.log(waypoints[0].location)
    console.log(waypoints[waypoints.length - 1].location);

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
  
  // const waypoints = [
  //   { location: { lat: -72.5329517, lng: 42.3929607 } },
  //   { location: { lat: -72.532451, lng: 42.3932468 } },
  //   { location: { lat: -72.5323138, lng: 42.3933361 } },
  //   { location: { lat: -72.5321183, lng: 42.3934429 } },
  //   { location: { lat: -72.5313177, lng: 42.3937298 } },
  //   { location: { lat: -72.5308852, lng: 42.3936275 } },
  //   { location: { lat: -72.5307812, lng: 42.3937401 } },
  //   { location: { lat: -72.466881, lng: 442.422649} }

  //   // Add more waypoints as needed
  // ]

//     waypoints: waypoints.slice(1, waypoints.length - 1),


  const request = {
    // origin: {lat: origin.geometry.location.lat(), lng: origin.geometry.location.lng()},
    // destination: {lat:destination.geometry.location.lat(), lng:destination.geometry.location.lng()},
    origin: waypoints[0].location,
    destination: waypoints[waypoints.length - 1].location,
    waypoints: waypoints.slice(1, waypoints.length - 1),
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
    console.log('state path:', pathPoints);
  }, [directionsResponse, pathPoints]);

  return (
    
    <form onClick={handleSubmit}>
    <div style={{justifyContent: "center", alignContent: "center", marginBottom: '10rem'}}>
    <Heading/>
    <Inputs  setHiddenState = {setHiddenState} setDestination = {setDestination} setOrigin = {setOrigin}/>
      {/* <Paths/> */}
      {console.log(isHidden)}
      <button style={{ marginLeft: '1rem'}}
      onClick={handleSubmitClick}>
          Search
      </button>
      <button style={{marginLeft: '1rem'}}
      onClick={handleSubmitClick}>
          Reset
      </button>
    </div>

    <div className = "container" style={{ height: '650px', width: '1500px', marginTop: '2rem'}}>
      {/* <div className= "half left"> */}
      {/* <Inputs setHiddenState = {setHiddenState} setDestination = {setDestination} setOrigin = {setOrigin}/> */}
      {/* <Paths/> */}
      {/* {console.log(isHidden)}
      <button
      onClick={handleSubmitClick}>
          Search
      </button> */}
      {/* </div> */}
      {/* <MapComponent/> */}
      
      {isHidden == false? (<div className = "half right"> <div style={{ height: '650px', width: '1500px' }}>
      <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{ width: '100%', height: '100%'}}>
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
