import {Heading} from "./components/Heading";
import {Inputs} from "./components/Inputs";
import {Paths} from "./components/Paths";
import './App.css';
import React from 'react';
import { MapComponent } from "./components/MapComponent";
import {useState} from 'react';
import { useRef, useEffect } from 'react';
import $ from 'jquery';
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from '@react-google-maps/api'

const center = { lat: 42.3867637, lng: -72.5322402 }
var waypoints = [];
function App() {
  const [isHidden, setIsHidden] = useState(true)
  const [origin,setOrigin] = useState(null);
  const [destination, setDestination] = useState(null)
  const [pathPoints, setPathPoints] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [threshold, setThreshold] = useState("");
  const [algoithm, setAlgorithm] = useState("");
  const [elevation ,setElevation] = useState("");

  const setHiddenState = (hidden) => {
    setIsHidden(hidden);
  };

  const fetchData = (src, dest) => {
    const responseToBackend = {
      text_origin_address: [src.geometry.location.lat(), src.geometry.location.lng()],
      text_dest_address: [dest.geometry.location.lat(), dest.geometry.location.lng()],
      min_max: elevation,
      algorithm: algoithm,
      path_limit: threshold
    };
  
    $.ajax({
      type: 'POST',
      url: 'http://localhost:5000/get_elena_path',
      data: JSON.stringify(responseToBackend),
      contentType: 'application/json',
      success: function (data) {
        parseBackendResponse(data);
        console.log('Response:', data);
        // Handle the path with datapoints
      },
      error: function (error) {
        console.error('Error:', error);
        // Handle the error
      }
    });
  };

  function parseBackendResponse(jsonData)
  {
    jsonData = JSON.parse(jsonData)
    console.log("#######$$$$");
    console.log(jsonData, typeof(jsonData));
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

    const request = {
      origin: waypoints[0].location,
      destination: waypoints[waypoints.length - 1].location,
      waypoints: waypoints.slice(1, waypoints.length - 1),
      travelMode: 'WALKING'
    };
    directionService.route(request, function(response, status) {
      if (status === 'OK') {
        console.log("response",response);
        setDirectionsResponse(response);
        console.log("direction response:",directionsResponse);
      } else {
        console.error('Directions request failed due to ' + status);
      }
    });
  }

  // eslint-disable-next-line no-undef
  const directionService =  new google.maps.DirectionsService()
   async function handleSubmitClick(e){
    e.preventDefault();
    setIsHidden(false);
    fetchData(origin,destination)
  };

  useEffect(() => {
    // Action to perform after state update
    console.log('State updated:', directionsResponse);
    console.log('state path:', pathPoints);
  }, [directionsResponse, pathPoints]);

  const resetStates = () => {
    setOrigin(null);
    setDestination(null);
    setPathPoints(null);
    setDirectionsResponse(null);
    setThreshold("");
    setAlgorithm("");
    setElevation("");
  };

  return (
    
    <form>
    <div style={{justifyContent: "center", alignContent: "center"}}>
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", backgroundColor: "#e0e0e0", padding: "10px" }}>
      <Heading/>
      <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "#e0e0e0",
        padding: "10px",
      }}>
        <Inputs  
        setHiddenState = {setHiddenState}
        setDestination = {setDestination} 
        setOrigin = {setOrigin} 
        setThreshold = {setThreshold}
        setAlgorithm = {setAlgorithm}
        setElevation = {setElevation} />
      </div>
      <div style={{ display: "flex", alignItems: "center", marginLeft: '1rem', justifyContent: "center", marginTop:"10px", marginBottom:"10px" }}>
        <button onClick={handleSubmitClick} style={{ backgroundColor: "#8a2be2", color: "#fff", padding: "0.5rem 1rem", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Search
        </button>
        <button onClick={resetStates} style={{ backgroundColor: "#8a2be2", color: "#fff", padding: "0.5rem 1rem", border: "none", borderRadius: "4px", cursor: "pointer", marginLeft: '1rem' }}>
          Reset
        </button>
      </div>
    </div>
    </div>

    <div className="container" style={{ height: 'calc(100vh - 2rem)', width: '100%', overflow: 'hidden' }}>
    <div className="half right">
      <div style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
        >
          <Marker position={center} />
          {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
        </GoogleMap>
      </div>
    </div>
    </div>
    </form>
    
  );
}

export default App;
