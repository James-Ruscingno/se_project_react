import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ clothingItems, onCardClick, onAddClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes__section-header">
      <p className="clothes__section-title">Your items</p>
      <button className="clothes__section-button" onClick={onAddClick}>+ Add New</button>
      </div>
      <ul className="clothes__section-list">
        {clothingItems.map((item) => (
          <li key={item._id} className="clothes__section-list-item">
          <ItemCard
            key={item._id || item.id}
            item={item}
            onCardClick={onCardClick}
          />
          </li>
        ))}
      </ul>
      </div>
  );
}

export default ClothesSection;