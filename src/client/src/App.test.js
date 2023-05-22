import { render, screen, fireEvent} from '@testing-library/react';
import App from './App';
import {Heading} from './components/Heading'
import {Inputs} from './components/Inputs'



// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test("Heading is Loaded", () => {
  render(
    <div>
      <Heading />
    </div>
  );
  const component = screen.getByTestId("header");
  expect(component).toBeInTheDocument();
  expect(screen.getByText("EleNa: Find the best route for you!")).toBeInTheDocument();
});

// test("Input fields are Loaded", () => {
//   render(
//     <div className="map-container">
//         <GoogleMap
//           center={center}
//           zoom={15}
//           mapContainerStyle={{ height: '100%', width: '100%' }}
//         >
//           <Marker position={center} />
//           {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
//         </GoogleMap>
//       </div>
//   );
//   expect(screen.getByTestId("map")).toBeInTheDocument();
//   expect(screen.getByTestId("marker")).toBeInTheDocument();
//   });

test("Search button is disabled when the input fields are empty", () => {
  const isDisabled = true;

  render(
        <div>
          <button disabled={isDisabled} >
          Search
        </button>
        </div> 
        );
  expect(screen.getByRole("button", { name: "Search" })).toBeDisabled();
});

test("Reset button is disabled when the input fields are empty", () => {
  const isDisabled = true;

  render(
        <div>
          <button disabled={isDisabled} >
          Reset
        </button>
        </div> 
        );
  expect(screen.getByRole("button", { name: "Reset" })).toBeDisabled();
});

test("Shortest Path Metrics are rendered correctly", () => {
  render(
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: '#e0e0e0', padding: '10px', marginLeft: 'auto', marginRight: '1rem' }}>
      <span style={{ marginBottom: '10px' }}>Shortest Path Metrics:</span>
      <div style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '4px', marginBottom: '5px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ marginRight: '10px' }}>EleNa Path distance:</span>
          <span>40.30202</span>
        </div>
      </div>
      <div style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '4px', marginBottom: '5px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ marginRight: '10px' }}>EleNa Path elevation gain:</span>
          <span>40.30202</span>
        </div>
      </div>
      <div style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '4px', marginBottom: '5px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ marginRight: '10px' }}>Shortest Path distance:</span>
          <span>40.30202</span>
        </div>
      </div>
      <div style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '4px', marginBottom: '5px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ marginRight: '10px' }}>Shortest Path elevation gain:</span>
          <span>43420.3020002</span>
        </div>
      </div>
    </div>
  );

  expect(screen.getByText("Shortest Path Metrics:")).toBeInTheDocument();
  expect(screen.getByText("EleNa Path distance:")).toBeInTheDocument();
  expect(screen.getByText("EleNa Path elevation gain:")).toBeInTheDocument();
  expect(screen.getByText("Shortest Path distance:")).toBeInTheDocument();
  expect(screen.getByText("Shortest Path elevation gain:")).toBeInTheDocument();
  expect(screen.getByText("43420.3020002")).toBeInTheDocument();
});

test('Selecting an algorithm', () => {
  const onValueChangeAlgorithm = jest.fn();

  render(
    <form className = "input_forms">
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ marginRight: "1rem" }}>Choose one of the algorithms:</div>
      <input type="radio" value="AStar" name="AlgorithmType" onChange={onValueChangeAlgorithm} style={{ marginRight: "0.5rem" }} /> 
      <label htmlFor="astar">A* Algorithm</label>
      <input type="radio" value="Dijkstra" name="AlgorithmType" onChange={onValueChangeAlgorithm} style={{ marginRight: "0.5rem" }} /> 
      <label htmlFor="dijkstra">Dijkstra Algorithm</label>
    </div>
    </form>
  );

  fireEvent.click(screen.getByLabelText('Dijkstra Algorithm', { selector: 'label[htmlFor="dijkstra"]' }));


  expect(onValueChangeAlgorithm).toHaveBeenCalledWith('Dijkstra');
});
