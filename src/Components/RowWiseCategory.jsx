import React, { useState, useEffect } from "react";
import { RowWiseCategoryResponse } from "./dummy";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Popover, OverlayTrigger } from 'react-bootstrap'; // Ensure correct import

function RowWiseCategory({
  relationState,
  occasionState,
  category,
  colorsInd,
}) {
  const [catalogs, setCatalogs] = useState([]);

  useEffect(() => {
    const fetchCatalogsInitial = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/suggest", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            occasion: occasionState,
            relation: relationState,
            category: category,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data); // Log the response data
        setCatalogs(data.data);
        // Simulating API response with dummy data
        // setCatalogs(RowWiseCategoryResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCatalogsInitial();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchCatalogs = async (pageNo) => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/suggest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          occasion: occasionState,
          relation: relationState,
          category: category,
          pageNo: pageNo,
        },
        
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data); // Log the response data
      setCatalogs((prevCatalogs) => [...prevCatalogs, ...data.data]); // Append new data to the existing catalogs
      setCurrentIndex(currentIndex + 5);

      // Simulating API response with dummy data
      // setCatalogs((prevCatalogs) => [...prevCatalogs, ...RowWiseCategoryResponse.data]);
      // setCurrentIndex(currentIndex + 5);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleNext = () => {
    if (currentIndex + 10 < catalogs.length) {
      setCurrentIndex(currentIndex + 5);
    } else {
      fetchCatalogs(catalogs[currentIndex].page_no + 1);
    }
  };

  const displayedGifts = catalogs.slice(currentIndex, currentIndex + 5);

  // const colors = ["#2c1cbd", "#bd571c", "#b0ab27", "#21a642"];
  const colors = [
    "#6b5b95", // Soft Purple
    "#feb236", // Apricot
    "#d64161", // Cherry Red
    "#ff7b25", // Carrot Orange
  ];

  // const renderPopover = (gift) => (
  //     <Popover id={`popover-${gift.id}`}>
  //         <Popover.Title as="h3">{gift.catalog_name}</Popover.Title>
  //         <Popover.Content>
  //             {gift.description}
  //         </Popover.Content>
  //     </Popover>
  // );

  return (
    <div style={styles.giftContainer}>
      <div
        style={{
          ...styles.hikerCard,
          backgroundColor: colors[colorsInd],
        }}
      >
        {category}
      </div>
      {displayedGifts.map((gift) => (
        <OverlayTrigger
          key={gift.id}
          placement="bottom"
          overlay={
            <Tooltip id={`tooltip-${gift.id}`}>
              {gift.catalog_name}, {gift.rating}{" "}
              <span role="img" aria-label="star">
                ⭐
              </span>
            </Tooltip>
          }
        >
          <div key={gift.id} style={styles.giftCard}>
            <img
              src={gift.gif_url}
              alt={`Gift ${gift.catalogId}`}
              style={styles.giftImage}
              onClick={() => (window.location.href = gift.landing_page)}
            />
          </div>
        </OverlayTrigger>
      ))}
      {currentIndex + 5 < catalogs.length && (
        <button onClick={handleNext} style={styles.nextButton}>
          &gt;
        </button>
      )}
    </div>
  );
}

const styles = {
  giftContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "40px",
  },
  hikerCard: {
    height: "360px",
    width: "200px",
    color: "white",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginRight: "20px",
    fontWeight: "bold",
  },
  giftCard: {
    height: "360px",
    width: "230px",
    border: "2px solid black",
    overflow: "hidden",
    marginRight: "20px",
    transition: "transform 0.3s",
    cursor: "pointer",
    padding: "0 20px",
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

export default RowWiseCategory;
