import React, { useState } from "react";
import "../App.css";
import "./Homepage.css";
// import AllGiftIdeas from "./AllGiftIdeas";

function Homepage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [relationState, setRelationState] = useState('');
  const [occasionState, setOccasionState] = useState('');
  const [interestsArr, setInterestsArr] = useState([]);

  const openModal = () => {
    console.log("Current State : ", isModalOpen);
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    if (interestsArr.length < 3) {
        alert("Please select at least three interests.");
        return; // Exit function if condition is not met
      }
  }

  const relation = ["Mother", "Girlfriend", "Father"];
  const occasion = ["Birthday", "father's Day", "Valentine"]
  const interests = ["Crafting & Creativity", "Great Food", "Crafting & Creativity", "Great Food", "Crafting & Creativity", "Great Food"]
  return (
    <>
      {/* <button onClick={openModal}>Open Modal</button> */}
      <h1 style={{ textAlign: "left", paddingLeft: "20px", marginLeft: "auto",
          marginRight: "auto", width: "80%",}}>Explore Gifts</h1>
      <div
        // className="open-modal-container"
        style={{
        //   display: "flex",
        //   justifyContent: "center",
        //   alignItems: "center",
        //   height: "100vh",
        
          borderRadius: "10px",
        //   padding: "20px",
          border: "1px solid #f0f0f0",
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
        //   flexDirection: "column",
        }}
      >
        
        <h4 style={{ textAlign: "left", paddingLeft: "20px" }}>Who are you shopping for?</h4>
            <div className="themes" style={{ textAlign: "left", paddingLeft: "20px" }}>
              {relation.map((theme) => (
                <div className={relationState === theme ? "theme selectedTheme" : "theme"}
                onClick={() => setRelationState(theme)}>{theme}</div>
              ))}
              <div className="theme" onClick={openModal} style={{backgroundColor: "#d34da5", border: "2.5px solid #9f2089", color: "white"}}>Next Question</div>
            </div>
      </div>

      {isModalOpen && (
        <div
          className="modal"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "fixed",
            zIndex: 1,
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            overflow: "auto",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              border: "1px solid #888",
              width: "80%",
              maxWidth: "500px",
              borderRadius: "10px",
              textAlign: "left",
            }}
          >
            <span
              className="close-button"
              onClick={closeModal}
              style={{ cursor: "pointer" }}
            >
              &times;
            </span>
            <h2>Find fantastic gifts in a flash!</h2>
            <p>
              Tell us more about who you're shopping for and we'll match you
              with thoughtful gifts - just for them.
            </p>
            <h4>Who are you shopping for?</h4>
            <div className="themes">
              {relation.map((theme) => (
                <div 
                key={theme}
                  className={relationState === theme ? "theme selectedTheme" : "theme"}
                  onClick={() => setRelationState(theme)}
                >{theme}</div>
              ))}
            </div>

            <h4>What's the occasion?</h4>
            <div className="themes">
              {occasion.map((theme) => (
                <div key={theme}
                className={occasionState === theme ? "theme selectedTheme" : "theme"}
                onClick={() => setOccasionState(theme)}>{theme}</div>
              ))}
            </div>
            <h4>What are they into?</h4>
            <p>Choose three or more for better suggestions</p>
            <div className="themes">
              {interests.map((theme) => (
                <div 
                className={interestsArr.includes(theme) ? "theme selectedTheme" : "theme"}
                onClick={() => {
                  setInterestsArr((prev) => {
                    if (prev.includes(theme)) {
                      return prev.filter((item) => item !== theme);
                    } else {
                      return [...prev, theme];
                    }
                  });
                }}>{theme}</div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <button style={{ padding: '10px 20px' }} onClick={closeModal}>Cancel</button>
              <button style={{ padding: '10px 20px' }} onClick={handleSubmit}>Show Gift Ideas</button>
            </div>
          </div>
        </div>
      )}
      {/* <AllGiftIdeas /> */}
    </>
  );
}

export default Homepage;
