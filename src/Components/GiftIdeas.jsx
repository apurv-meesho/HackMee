import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import RowWiseCategory from "./RowWiseCategory";
// import { giftIdeasResponse } from "./dummy";
import { useNavigate } from "react-router-dom";
function GiftIdeas() {
    const location = useLocation();
  const { relationState, occasionState, interestsArr } = location.state || {};
  const navigate = useNavigate();

//   useEffect(() => {
//     console.log("Relation State:", relationState);
//     console.log("Occasion State:", occasionState);
//     console.log("Interests Array:", interestsArr);
//   }, [relationState, occasionState, interestsArr]);
//   const gifts = [
//     { id: 1, imageUrl: 'https://via.placeholder.com/100x200?text=Gift1' },
//     { id: 2, imageUrl: 'https://via.placeholder.com/100x200?text=Gift2' },
//     { id: 3, imageUrl: 'https://via.placeholder.com/100x200?text=Gift3' },
//     { id: 4, imageUrl: 'https://via.placeholder.com/100x200?text=Gift4' },
//     { id: 5, imageUrl: 'https://via.placeholder.com/100x200?text=Gift5' },
//     { id: 6, imageUrl: 'https://via.placeholder.com/100x200?text=Gift6' },
//     { id: 7, imageUrl: 'https://via.placeholder.com/100x200?text=Gift7' },
//     { id: 8, imageUrl: 'https://via.placeholder.com/100x200?text=Gift8' },
//     { id: 9, imageUrl: 'https://via.placeholder.com/100x200?text=Gift9' },
//     { id: 10, imageUrl: 'https://via.placeholder.com/100x200?text=Gift10' },
//     { id: 11, imageUrl: 'https://via.placeholder.com/100x200?text=Gift11' },
//     { id: 12, imageUrl: 'https://via.placeholder.com/100x200?text=Gift12' },
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handleNext = () => {
//     if (currentIndex + 6 < gifts.length) {
//       setCurrentIndex(currentIndex + 6);
//     }
//   };

//   const displayedGifts = gifts.slice(currentIndex, currentIndex + 6);

//   const colors = ["#2c1cbd", "#bd571c", "#b0ab27", "#21a642"];
//   const [colorsInd, setColorsInd] = useState(0);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Gift Ideas for <b style={{color:"#d34da5"}}>{relationState}</b></h1>
        <button style={styles.editButton} onClick={()=>{navigate('/');}}>Change Responses</button>
      </div>

      <p style={{marginTop:"0"}}>Based On Your Responses</p>
      {interestsArr && interestsArr.map((interest, index) => (
        <RowWiseCategory 
          key={index}
          colorsInd={index % 4}
          relationState={relationState} 
          occasionState={occasionState} 
          category={interest} 
        //   catalogArr={giftIdeasResponse[interest]}
        />
      ))}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "left",
    paddingLeft: "20px",
    marginLeft: "auto",
    marginRight: "auto",
    width: "80%",
    marginTop: "20px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#d34da5",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    cursor: "pointer",
  },
  giftContainer: {
    display: "flex",
    alignItems: "center",
  },
  hikerCard: {
    height: "200px",
    width: "100px",
    color: "white",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "10px",
    marginRight: "20px",
    fontWeight: "bold",
  },
  giftCard: {
    height: "200px",
    width: "100px",
    border: "2px solid black",
    borderRadius: "10px",
    overflow: "hidden",
    marginRight: "20px",
    transition: "transform 0.3s",
    cursor: "pointer",
  },
  giftImage: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
  },
  nextButton: {
    display: "block",
    margin: "0 20px",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "grey",
    color: "white",
    fontSize: "24px",
    cursor: "pointer",
    textAlign: "center",
    lineHeight: "50px",
    transition: "background-color 0.3s",
  },
};

export default GiftIdeas;
