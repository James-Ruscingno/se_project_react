import { useContext } from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";


function Main({ weatherData, handleCardClick, clothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {currentTemperatureUnit === 'F' ? weatherData.temp.F : weatherData.temp.C}&deg;{currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <li key={item._id} className="cards__list-item">
                <ItemCard
                  key={item._id || item.id}
                  item={item}
                  onCardClick={handleCardClick}
                />
                </li>
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
