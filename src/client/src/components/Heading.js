import headerImage from './headerImage.jpeg';

export const Heading = () => {
  return (
    <div>
        <header >
            <p className = "imageInHeader">
                ELENA: Find the best route for you!
                <img src={headerImage} att = "elenaHeading"/>
            </p>
        </header>
    </div>
  );
}