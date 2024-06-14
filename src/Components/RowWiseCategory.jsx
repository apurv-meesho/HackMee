import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RowWiseCategory({ relationState, occasionState, category, colorsInd }) {
    const [catalogs, setCatalogs] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchCatalogsInitial = async () => {
            try {
                const response = await axios.post('http://localhost:8080/api/v1/suggest', {
                    occasion: occasionState,
                    relation: relationState,
                    category: category,
                });

                console.log("Fetched data:", response.data.data);
                setCatalogs(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchCatalogsInitial();
    }, [occasionState, relationState, category]);

    const fetchCatalogs = async (pageNo) => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/suggest', {
                occasion: occasionState,
                relation: relationState,
                category: category,
                pageNo: pageNo,
            });

            console.log("Fetched additional data:", response.data.data);
            setCatalogs((prevCatalogs) => [...prevCatalogs, ...response.data.data]);
            setCurrentIndex((prevIndex) => prevIndex + 5);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleNext = () => {
        if (currentIndex + 10 < catalogs.length) {
            setCurrentIndex(currentIndex + 5);
        } else if (catalogs.length > 0) {
            fetchCatalogs(catalogs[currentIndex].pageNo + 1);
        }
    };

    const displayedGifts = catalogs.slice(currentIndex, currentIndex + 5);

    const colors = [
        "#6b5b95", // Soft Purple
        "#feb236", // Apricot
        "#d64161", // Cherry Red
        "#ff7b25", // Carrot Orange
    ];

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
                <div key={gift.catalog_id} style={styles.giftCard} >
                    <img src={gift.gif_url} alt={`Gift `} style={styles.giftImage} onClick={() => window.location.href = gift.landing_page} />
                </div>
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
        marginBottom: "20px"
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
        padding: "0 20px"
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
