import React, { useState } from 'react';

export const Paths = (props) => {

  function handleMapClickElena(e)
  {
    props.setTypeOfPath("elena");

  }
  function handleMapClickShortest(e)
  {
    props.setTypeOfPath("shortest");
  }

    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div className="card" style={{ margin: "6px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", maxWidth: "300px", display: "flex", alignItems: "center", paddingTop:"1px", paddingBottom:"1px" }}>
          {/* <img src="./location_pin_img.jpeg" alt="Path 1" style={{ width: "100%", height: "auto", borderRadius: "8px" }} /> */}
          <div style={{ flex: 1 }}>
            <h2 style={{ margin: "5px 0", fontSize: "20px" }}>First Path</h2>
            <p style={{ margin: "5px 0", fontSize: "16px" }}>EleNa Path</p>
          </div>
          <div onClick = {handleMapClickElena} disabled={props.isPathButtonDisabled} style={{ backgroundColor: props.isPathButtonDisabled ? 'gray': "#8a2be2", color: "#fff", padding: "8px 16px", border: "none", borderRadius: "4px", cursor: "pointer" }}>Select</div>
        </div>
        <div className="card" style={{ margin: "6px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", maxWidth: "300px", display: "flex", alignItems: "center", paddingTop:"1px", paddingBottom:"1px" }}>
          {/* <img src="./location_pin_img.jpeg" alt="Path 2" style={{ width: "100%", height: "auto", borderRadius: "8px" }} /> */}
          <div style={{ flex: 1 }}>
            <h2 style={{ margin: "5px 0", fontSize: "20px" }}>Second Path</h2>
            <p style={{ margin: "5px 0", fontSize: "16px" }}>Shortest Path</p>
          </div>
          <div onClick = {handleMapClickShortest} disabled={props.isPathButtonDisabled} style={{ backgroundColor: props.isPathButtonDisabled ? 'gray': "#8a2be2", color: "#fff", padding: "8px 16px", border: "none", borderRadius: "4px", cursor: "pointer" }}>Select</div>
        </div>
      </div>
    );
  }
