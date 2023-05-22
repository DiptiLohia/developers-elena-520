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
var waypointsElena = [];
var waypointsShortest = [];
function App() {
  const [isHidden, setIsHidden] = useState(true)
  const [origin,setOrigin] = useState(null);
  const [destination, setDestination] = useState(null)
  const [pathPoints, setPathPoints] = useState(null);
  const [directionsResponseElena, setDirectionsResponseElena] = useState(null);
  const [directionsResponseShortest, setDirectionsResponseShortest] = useState(null);

  const [threshold, setThreshold] = useState("");
  const [algorithm, setAlgorithm] = useState("");
  const [elevation ,setElevation] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [thresholdError, setThresholdError] = useState("");
  const [typeOfPath, setTypeOfPath] = useState("elena");

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
        console.log('Response of the output data:', data);
      },
      error: function (error) {
        console.error('Error:', error);
      }
    });
  };

  // eslint-disable-next-line no-undef
  const directionServiceElena =  new google.maps.DirectionsService()
  // eslint-disable-next-line no-undef
  const directionServiceShortest =  new google.maps.DirectionsService()

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
        waypointsElena.push(tempList2);
      }
    }
    // console.log("waypointsElena",waypointsElena);

    for(var i = 0; i<jsonData.path_shortest.shape.data_points.length; i++)
    {
      var tempList = {lat: 0 , lng: 0};
      tempList.lat = jsonData.path_shortest.shape.data_points[i][1];
      tempList.lng = jsonData.path_shortest.shape.data_points[i][0];
      var tempList2 = {location: null, stopover: false }
      tempList2.location = tempList;

      if(i%4==0){
        waypointsShortest.push(tempList2);
      }
    }
    // console.log("waypointsShortest", waypointsShortest);

    const requestElena = {
      origin: waypointsElena[0].location,
      destination: waypointsElena[waypointsElena.length - 1].location,
      waypoints: waypointsElena.slice(1, waypointsElena.length - 1),
      travelMode: 'WALKING'
    };
    const requestShortest = {
      origin: waypointsShortest[0].location,
      destination: waypointsShortest[waypointsShortest.length - 1].location,
      waypoints: waypointsShortest.slice(1, waypointsShortest.length - 1),
      travelMode: 'WALKING'
    }

    directionServiceElena.route(requestElena, function(response, status) {
      if (status === 'OK') {
        console.log("response PRANAVVVVV",response);
        setDirectionsResponseElena(response);
        setIsLoading(false);
      } else {
        console.error('Directions request failed due to ' + status);
      }
    });
    console.log("direction response NEEHARIKAAA:",directionsResponseElena);

    directionServiceShortest.route(requestShortest, function(response, status) {
      console.log("INSIDE")
      if (status === 'OK') {
        console.log("response shortest DIPTIIIIIIII",response);
        setDirectionsResponseShortest(response);
        setIsLoading(false);
        console.log("direction response:",directionsResponseShortest);
      } else {
        console.error('Directions request failed due to ' + status);
      }
    });
    console.log("checking state of shortest SHUBHAMMMMM", directionsResponseShortest);
  }

 
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
    // Action to perform after state update
    if(origin!==null && destination!==null && threshold!=="" && algorithm!=="" && elevation!=="")
    {
      console.log("isDisabled", isDisabled);
      setIsDisabled(false);
    }
  }, [origin,destination,threshold,algorithm,elevation, typeOfPath]);

  useEffect(() => {
    // Action to perform after state update
    console.log('State updated:', directionsResponseElena);
    console.log('State updated short:', directionsResponseShortest);
  }, [directionsResponseElena, typeOfPath, directionsResponseShortest]);

  const resetStates = () => {
    setOrigin(null);
    setDestination(null);
    setDirectionsResponseElena(null);
    setDirectionsResponseShortest(null);
    setThreshold("");
    setAlgorithm("");
    setElevation("");
  };

  return (
    <form>
    <div style={{display: 'flex', justifyContent: "center", alignContent: "center", backgroundColor: "#e0e0e0",}}>
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: '#e0e0e0', padding: '10px', marginRight: 'auto' }}>
    <Paths setTypeOfPath = {setTypeOfPath}/>
    </div>
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "10px", borderRadius:'4px', margin:"4px" }}>
      <Heading/>
      <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
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
        {/* <Marker position={center} /> */}
        {typeOfPath === "shortest" && directionsResponseShortest ? (
          <>
            {console.log('Condition: typeOfPath === "shortest"')}
            <DirectionsRenderer directions={directionsResponseShortest} />
          </>
        ) : (
          <>
            {console.log('Condition: typeOfPath !== "shortest"')}
            <DirectionsRenderer directions={directionsResponseElena} />
          </>
        )}
      </GoogleMap>
      </div>
    </div>
  </div>
</div>
    </form>
    
  );
}

export default App;
