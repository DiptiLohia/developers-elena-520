import headerImage from './headerImage.jpeg';

export const Heading = () => {
  return (
    <div style={{backgroundImage: "url(${headerImage})", height: '50vh', marginTop: '50px', backgroundRepeat: 'no-repeat'}}>
        <header >
           <p>
                EleNa: Find the best route for you!
                {/* <img src={headerImage} att = "elenaHeading"/> */}
            </p>
        </header>
    </div>
  );
}
