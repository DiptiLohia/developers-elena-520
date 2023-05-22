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
  const [algorithm, setAlgorithm] = useState("");
  const [elevation ,setElevation] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [thresholdError, setThresholdError] = useState("");

  const setHiddenState = (hidden) => {
    setIsHidden(hidden);
  };



  const fetchData = (src, dest) => {
    const responseToBackend = {
      origin_location: [src.geometry.location.lat(), src.geometry.location.lng()],
      destination_location: [dest.geometry.location.lat(), dest.geometry.location.lng()],
      elevation_option: elevation,
      selected_algorithm: algorithm,
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
    
    for(var i = 0; i<jsonData.path_elevation.shape.data_points.length; i++)
    {
      var tempList = {lat: 0 , lng: 0};
      tempList.lat = jsonData.path_elevation.shape.data_points[i][1];
      tempList.lng = jsonData.path_elevation.shape.data_points[i][0];
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
        setIsLoading(false);
        console.log("direction response:",directionsResponse);
      } else {
        console.error('Directions request failed due to ' + status);
      }
    });
  }

  // eslint-disable-next-line no-undef
  const directionService =  new google.maps.DirectionsService()
   async function handleSubmitClick(e){
    if(!isNaN(threshold) && threshold <= 100){
      setIsDisabled(true);
      setIsLoading(true);
      e.preventDefault();
      setIsHidden(false);
      fetchData(origin,destination)
    }else {
      e.preventDefault();
      setThresholdError("Threshold must be a number and should not exceed 100");
    }
  };

  useEffect(() => {
    console.log("isDisabled");

    // Action to perform after state update
    if(origin!==null && destination!==null && threshold!=="" && algorithm!=="" && elevation!=="")
    {
      console.log("isDisabled", isDisabled);
      setIsDisabled(false);
    }
  }, [origin,destination,threshold,algorithm,elevation]);
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
    <div style={{display: 'flex', justifyContent: "center", alignContent: "center", backgroundColor: "#e0e0e0",}}>
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: '#e0e0e0', padding: '10px', marginRight: 'auto' }}>
    <Paths/>
    </div>
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "10px" }}>
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
        <button onClick={handleSubmitClick} disabled={isDisabled} style={{ backgroundColor: isDisabled ? 'gray': "#8a2be2", color: "#fff", padding: "0.5rem 1rem", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Search
        </button>
        <button onClick={resetStates} style={{ backgroundColor: "#8a2be2", color: "#fff", padding: "0.5rem 1rem", border: "none", borderRadius: "4px", cursor: "pointer", marginLeft: '1rem' }}>
          Reset
        </button>
      </div>
      {thresholdError && (
        <p style={{ color: 'red', textAlign: 'center', fontSize: '12px' }}>
          {thresholdError}
        </p>
      )}
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: '#e0e0e0', padding: '10px', marginLeft: 'auto', marginRight:"1rem" }}>
      <span style={{ marginBottom:"10px"}}>Shortest Path Metrics:</span>
      <div style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '4px', marginBottom: '5px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ marginRight:"10px" }}>EleNa Path distance:</span>
          <span>40.30202</span>
        </div>
      </div>
      <div style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '4px', marginBottom: '5px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ marginRight:"10px" }}>EleNa Path elevation gain:</span>
          <span>40.30202</span>
        </div>
      </div>
      <div style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '4px', marginBottom: '5px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ marginRight:"10px" }}>Shortest Path distance:</span>
          <span>40.30202</span>
        </div>
      </div>
      <div style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '4px', marginBottom: '5px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ marginRight:"10px" }}>Shortest Path elevation gain:</span>
          <span>43420.3020002</span>
        </div>
      </div>
    </div>
    </div>
      
    <div className="container" style={{ height: 'calc(100vh - 2rem)', width: '100%', overflow: 'hidden' }}>
  <div className="loader-container">
    {isLoading && (
      <div className="loader-overlay">
        <div style={{ display: 'flex', alignItems: 'center', background: '#fff', borderRadius: '8px', padding: '10px' }}>
          <div className="spinner"></div>
          <p style={{ textAlign: 'center', marginTop: '1rem', color: '#8a2be2', marginLeft:"10px", fontSize:"20px" }}>Loading path...</p> 
        </div>
      </div>
    )}
    <div className="half right">
      <div className="map-container">
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ height: '100%', width: '100%' }}
        >
          <Marker position={center} />
          {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
        </GoogleMap>
      </div>
    </div>
  </div>
</div>
    </form>
    
  );
}

export default App;
