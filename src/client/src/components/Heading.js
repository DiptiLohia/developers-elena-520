import headerImage from './headerImage.jpeg';

export const Heading = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", backgroundColor: "grey", marginBottom: "3rem"}}>
      <h2 style={{ padding: "10px 20px", textAlign: "center", color: "black" }}>
      EleNa: Find the best route for you!
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
      </div>
    </div>
    // <div style={{backgroundImage: "url(${headerImage})", height: '50vh', marginTop: '50px', backgroundRepeat: 'no-repeat'}}>
    //     <header >
    //        <p>
    //             EleNa: Find the best route for you!
    //             {/* <img src={headerImage} att = "elenaHeading"/> */}
    //         </p>
    //     </header>
    // </div>
  );
}
