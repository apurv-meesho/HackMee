import React, { useState, useEffect } from "react";
import "../App.css";
import "./Homepage.css";

function Homepage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [relationState, setRelationState] = useState('');
  const [occasionState, setOccasionState] = useState('');
  const [interestsArr, setInterestsArr] = useState([]);

  const [relations, setRelations] = useState([]);
  const [occasions, setOccasions] = useState([]);
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    // Simulate an API call with static data
    const fetchData = () => {
      try {
        const data = {
          "occasions": [
            "Birthday", "Housewarming", "Just because", "Wedding", "Anniversary", "Thank you", 
            "Graduation", "New Baby", "Get well soon", "Valentine's Day", "Mother's Day", "Father's Day"
          ],
          "categories": [
            "Women Sarees", "Home Decor", "Unisex Personal Care", "Women Jewellery", "Women Watches", 
            "Home improvement", "Soft Furnishings", "Fitness", "Mens Personal Care & Grooming", "Men Accessories", 
            "Men Watches", "Men Sports Wear", "Women Bottom wear", "Men Bottom Wear", "Ethnic Bottomwear, Dupattas & Jackets", 
            "Women Bags", "Women Accessories", "Women Sleepwear", "Women Top Wear", "Blouses", "Appliances", 
            "Mobiles, Electronics Accessories & Small Appliances", "Men Night Wear", "Kids Footwear, Accs & Toys", 
            "Men Ethnic Wear", "Men Footwear", "Women Innerwear", "Health & Wellness", "Women Suits & Dress Materials", 
            "Women Personal Care & Makeup", "Kids Clothing", "Women Kurtis & Kurtas", "Men Winter Wear", "Men Bags", 
            "Screen Protectors", "Kids Watches", "Kids Accessories", "Travel Bags ,Luggage and Accessories", 
            "Womens Active Wear", "Pet Supplies", "Baby & Mother Personal Care", "Sports", "Maternity Wear", 
            "Stationery", "Grocery", "Eye Utility", "Office Supplies", "Industrial & Scientific Products", 
            "Musical Instruments", "Women Winter Wear", "Automotive Accessories", "Others", "Women Footwear", 
            "Furniture", "Men Innerwear", "Kids Footwear", "Islamic Fashion", "Books", "Mandi", "Donations", 
            "Digital", "Lehengas", "Kitchen Utility", "Men Top Wear", "Cases & Covers", "Consumer Electronics", 
            "Personal Care & Wellness", "Education", "CPG"
          ],
          "relations": [
            "Friend", "Husband", "Wife", "Partner", "Mum", "Dad", "Parent", "Baby", "Boyfriend", "Girlfriend", 
            "Myself", "Daughter", "Son", "Child", "Grandchild", "Grandparent", "Sister", "Brother", "Sibling", 
            "The Whole Family", "Teacher", "Coworker", "Neighbour", "Someone Else"
          ]
        };
        setRelations(data.relations);
        setOccasions(data.occasions);
        setInterests(data.categories);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const openModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setInterestsArr([]);
    setRelationState('');
    setOccasionState('');
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    if (interestsArr.length < 3) {
      alert("Please select at least three interests.");
      return; // Exit function if condition is not met
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "left", paddingLeft: "20px", marginLeft: "auto", marginRight: "auto", width: "80%" }}>
        Explore Gifts
      </h1>
      <div style={{ borderRadius: "10px", border: "1px solid #f0f0f0", width: "80%", marginLeft: "auto", marginRight: "auto" }}>
        <h4 style={{ textAlign: "left", paddingLeft: "20px" }}>Who are you shopping for?</h4>
        <div className="themes" style={{ textAlign: "left", paddingLeft: "20px" }}>
          {relations.map((theme) => (
            <div key={theme} className={relationState === theme ? "theme selectedTheme" : "theme"} 
                 onClick={() => setRelationState(theme)}>
              {theme}
            </div>
          ))}
          <div className="theme" onClick={openModal} style={{ backgroundColor: "#d34da5", border: "2.5px solid #9f2089", color: "white" }}>
            Next Question
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <h2>Find fantastic gifts in a flash!</h2>
            <p>Tell us more about who you're shopping for and we'll match you with thoughtful gifts - just for them.</p>
            <h4>Who are you shopping for?</h4>
            <div className="themes">
              {relations.map((theme) => (
                <div key={theme} className={relationState === theme ? "theme selectedTheme" : "theme"}
                     onClick={() => setRelationState(theme)}>
                  {theme}
                </div>
              ))}
            </div>

            <h4>What's the occasion?</h4>
            <div className="themes">
              {occasions.map((theme) => (
                <div key={theme} className={occasionState === theme ? "theme selectedTheme" : "theme"}
                     onClick={() => setOccasionState(theme)}>
                  {theme}
                </div>
              ))}
            </div>
            <h4>What are they into?</h4>
            <p>Choose three or more for better suggestions</p>
            <div className="themes">
              {interests.map((theme) => (
                <div key={theme} className={interestsArr.includes(theme) ? "theme selectedTheme" : "theme"}
                     onClick={() => {
                       setInterestsArr((prev) => {
                         if (prev.includes(theme)) {
                           return prev.filter((item) => item !== theme);
                         } else {
                           return [...prev, theme];
                         }
                       });
                     }}>
                  {theme}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <button style={{ padding: '10px 20px' }} onClick={closeModal}>Cancel</button>
              <button style={{ padding: '10px 20px' }} onClick={handleSubmit}>Show Gift Ideas</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Homepage;
