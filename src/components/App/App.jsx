import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddIemModal";
// import { defaultClothingItems } from "../../utils/constants";
import { getItems, addItem, deleteItem } from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = ()=>{
    setCurrentTemperatureUnit(currentTemperatureUnit === "F"? "C":"F");
  }

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    addItem({ name, imageUrl, weather })
    .then((newItem) => {
    setClothingItems([newItem, ...clothingItems]);
    closeActiveModal();
    })
    .catch(console.error);
  };

   const handleDeleteItem = (id) => {
    deleteItem(id)
      .then(() => {
        setClothingItems((items) => items.filter(item => item._id !== id));
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
    .then((data) => {
     setClothingItems(data);
    })
    .catch(console.error)
  }, []);

  return (
    <BrowserRouter>
    <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Routes>
          <Route path="/" element={
        <Main 
          weatherData={weatherData} 
          handleCardClick={handleCardClick}
          currentTemperatureUnit={currentTemperatureUnit}
          clothingItems={clothingItems}
          onDeleteItem={handleDeleteItem} 
          />
          }
          />
          <Route path="/profile" element={
            <Profile 
             clothingItems={clothingItems}
             onCardClick={handleCardClick}
             onAddClick={handleAddClick}
             onDeleteItem={handleDeleteItem}
             />
          }
          />
          </Routes>
        <Footer />
      </div>
      <AddItemModal 
        isOpen={activeModal === "add-garment"}
        handleCloseClick={closeActiveModal}
        onAddItemModalSubmit={handleAddItemModalSubmit} 
        />
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        handleCloseClick={closeActiveModal}
      />
    </div>
    </CurrentTemperatureUnitContext.Provider>
    </BrowserRouter>
  );
}

export default App;
