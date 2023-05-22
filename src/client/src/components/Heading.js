import headerImage from './headerImage.jpeg';


export const Heading = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h2 data-testid="header" style={{ textAlign: "center", color: "black", marginBlockStart:"10px", marginBlockEnd:"10px" }}>
      EleNa: Find the best route for you!
      </h2>
    </div>
  );
}
