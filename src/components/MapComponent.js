import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react'
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

// export const MapComponent = () =>  {
//   return (
//     <card className = "map_component">
//    <MapContainer center={[51.505, -0.09]} zoom={5} scrollWheelZoom={false}>
//         <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//     </MapContainer>
//     </card>
 
//   );
// }



 

// var map = new google.maps.Map(document.getElementById("map"), mapOptions);
// var directionsService = new google.maps.DirectionsService();
// var directionsDisplay = new google.maps.DirectionsRenderer();// also, constructor can get "DirectionsRendererOptions" object
// directionsDisplay.setMap(map);


export const MapComponent = () =>  {   

    const location = {
        address: '1600 Amphitheatre Parkway, Mountain View, california.',
        lat: 37.42216,
        lng: -122.08427,
      }
      const defaultProps = {
        center: {
          lat: 10.99835602,
          lng: 77.01502627
        },
        zoom: 11
      };
    
    const LocationPin = () => (
        <div className="pin">
          <Icon icon={locationIcon} className="pin-icon" />
          <p className="pin-text">"map rendering"</p>
        </div>
      )

return(

    <div style={{ height: '100vh', width: '100%' }}>
    {/* <GoogleMapReact
      bootstrapURLKeys={{ key: 'AIzaSyB123Gg1MjYJ_fmrdhDh5A2ftpitbVtCmA' }}
        defaultCenter={defaultProps.center}
      defaultZoom = {defaultProps.zoom}
      hidden = {false}
    > */}
      <LocationPin
        lat= {37.42216}
        lng= {-122.08427}
        text = "MY MARK"
      />
    {/* </GoogleMapReact> */}
  </div>

)
}
