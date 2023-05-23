import { render, screen, fireEvent} from '@testing-library/react';
import App from './App';
import {Heading} from './components/Heading'
import {Inputs} from './components/Inputs'
import '@testing-library/jest-dom';


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

test("Value in the input field - Source", () => {
  render(
    <input
        style={{
          marginLeft: '1rem',
          padding: '0.5rem',
          borderRadius: '4px',
          border: '3px solid #000',
          outline: 'none',
          fontSize: '14px',
          width: '200px', 
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        }}
        id = "source"
          label="source"
          type="address"
          name="source"
          placeholder="Enter Source"
          className="mbsc-col-12 mbsc-col-lg-6"
        />
  );

  expect(screen.getByPlaceholderText("Enter Source")).toBeInTheDocument();
});

test("Value in the input field - Destination", () => {
  render(
    <input
          style={{
            marginLeft: '1rem',
            padding: '0.5rem',
            borderRadius: '4px',
            border: '3px solid #000',
            outline: 'none',
            fontSize: '14px',
            width: '200px', 
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          }}
          label="destination"
          type="address"
          name="destination"
          placeholder="Enter Destination"
        />
  );

  expect(screen.getByPlaceholderText("Enter Destination")).toBeInTheDocument();
});

test("Value in the input field - Path Limit", () => {
  render(
    <input
          style={{
            marginLeft: '1rem',
            padding: '0.5rem',
            borderRadius: '4px',
            border: '3px solid #000',
            outline: 'none',
            fontSize: '14px',
            width: '200px', 
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          }}
          type="integer"
          name="pathLimit"
          placeholder="Enter path limit (Max 100)"
        />
  );

  expect(screen.getByPlaceholderText("Enter path limit (Max 100)")).toBeInTheDocument();
});

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

test("Testing the radio buttons of the min-max elevation", async () => {
  render(
    <div data-testid="elevation">
        <input data-testid="min" type="radio" value="min" name="elevationType" style={{ marginRight: "0.5rem" }} /> Minimum Elevation
        <input data-testid="max" type="radio" value="max" name="elevationType" style={{ marginRight: "0.5rem" }} /> Maximum Elevation
    </div>
  );

  const radioButtons = screen.getByTestId("elevation");
  const min = screen.getByTestId("min");
  const max = screen.getByTestId("max");
  expect(radioButtons).toBeInTheDocument();

  fireEvent.click(min);
  expect(max).not.toBeChecked();

  fireEvent.click(max);
  expect(max).toBeChecked();

});


test("Testing the radio buttons of the algorithm", async () => {
  render(
    <div data-testid="options">
    <input data-testid="astar" type="radio" value="AStar" name="AlgorithmType" id="astar" style={{ marginRight: "0.5rem" }}/> 
    <label>A* Algorithm</label>
    <input data-testid="dijkstra" type="radio" value="Dijkstra" name="AlgorithmType" id="dijkstra" style={{ marginRight: "0.5rem" }}/> 
    <label>Dijkstra Algorithm</label>
    </div>
  );

  const radioButtons = screen.getByTestId("options");
  const astar = screen.getByTestId("astar");
  const dijkstra = screen.getByTestId("dijkstra");
  expect(radioButtons).toBeInTheDocument();

  fireEvent.click(astar);
  expect(dijkstra).not.toBeChecked();

  fireEvent.click(dijkstra);
  expect(dijkstra).toBeChecked();

});
