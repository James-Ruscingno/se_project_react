import "./ItemModal.css";
import closeIcon from "../../assets/close.svg";

function ItemModal({ activeModal, handleCloseClick, card }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <div className="modal__image-wrapper">
          <button
            onClick={handleCloseClick}
            type="button"
            className="modal__close"
          >
            <img src={closeIcon} alt="close" />
          </button>
          <img src={card.link} alt={card.name} className="modal__image" />
          <div className="modal__footer">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
