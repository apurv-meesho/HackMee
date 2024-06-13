import React from 'react';

const GifComponent = ({ gifUrl }) => {
  const divStyle = {


    height: "200px",
            width: "100px",

            border: "2px solid black",
            marginLeft: "20px",
            backgroundImage: `url(${gifUrl})`,
            backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  return (
    <div style={divStyle}>
      {/* Optionally, you can add more content inside the div */}
      
    </div>
  );
};

export default GifComponent;
