import React, { useState } from 'react';
// import { Input } from "@progress/kendo-react-inputs";


// import inputs from './Inputs';

export const Inputs = () => {
  const [sourceLocation, setSourceLocation] = useState('');
  const [destinationLocation, setDestinationLocation] = useState('');
  const [valueOfX, setValueOfX] = useState('');


  function handleSourceChange(event) {
    setSourceLocation(event.target.value);
  }
  function handleDestinationChange(event) {
    setDestinationLocation(event.target.value);
  }
  function handleValueXChange(event) {
    setValueOfX(event.target.value);
  }

  return (
    <form className = "input_forms">
    <div>
      <input
        label="source"
        type="address"
        name="source"
        value={sourceLocation}
        onChange={handleSourceChange}
        placeholder="Enter Source"
        //className="mbsc-col-12 mbsc-col-lg-6"
      />
        </div>
        <div>
      <input
        // label="destination"
        type="address"
        name="destination"
        value={destinationLocation}
        onChange={handleDestinationChange}
        placeholder="Enter Destination"

      />
      </div>
      <div>
      <input
        // label="valueX"
        type="integer"
        name="valueX"
        value={valueOfX}
        onChange={handleValueXChange}
        placeholder="Enter value of x"
      />
      </div>
      <button>
          Search
      </button>

      
    </form>
  );
}

// export default Inputs;
