import "./Profile.css";
import SideBar from "../Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ clothingItems, onCardClick, onAddClick, onDeleteItem }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
      <SideBar />
      </section>
      <section className="profile__clothing-items">
      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        onAddClick={onAddClick}
        onDeleteItem={onDeleteItem}
      />
      </section>
    </div>
  );
}

export default Profile;