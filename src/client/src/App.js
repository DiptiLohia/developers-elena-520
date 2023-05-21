import {Heading} from "./components/Heading";
import {Inputs} from "./components/Inputs";
import {Paths} from "./components/Paths";
import './App.css';
import React from 'react';
import { MapComponent } from "./components/MapComponent";
import {useState} from 'react';
import { useRef, useEffect } from 'react';
import jsonData from './backend_path.json';
import $ from 'jquery';


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
  const [pathLimit, setPathLimit] = useState(null);
  const [elevationStrategy, setElevationStrategy] = useState(null);
  const setHiddenState = (hidden) => {
    setIsHidden(hidden);
  };

  const fetchData = (src, dest) => {
    const responseToBackend = {
      text_origin_address: [src.geometry.location.lat(), src.geometry.location.lng()],
      text_dest_address: [dest.geometry.location.lat(), dest.geometry.location.lng()],
      min_max: 'max',
      algorithm: 'AStar',
      path_limit: '10'
    };
  
    $.ajax({
      type: 'POST',
      url: 'http://localhost:5000/get_elena_path',
      data: JSON.stringify(responseToBackend),
      contentType: 'application/json',
      success: function (data) {
        console.log('Response:', data);
        // Handle the path with datapoints
      },
      error: function (error) {
        console.error('Error:', error);
        // Handle the error
      }
    });
  };

  function sendResponseToBackend(origin, destination)
  {
    var responseToBackend = {
      "text_origin_address": [origin.geometry.location.lat(),origin.geometry.location.lng()],
      "text_dest_address": [destination.geometry.location.lat(),destination.geometry.location.lng()],
      "min_max": "max",
      "algorithm": "AStar",
      "path_limit": "23"
  }
  responseToBackend = JSON.stringify(responseToBackend);

    $.ajax({
      type: "POST",
      url: "/path_via_address",
      data: responseToBackend,
      success: function(data) {
      // plotRoute(data, "address")
      // updateOutputs(data)
      },
      dataType: "json"
  });

  console.log("printing response to backend" ,responseToBackend )
  }


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
    fetchData(origin,destination)
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
