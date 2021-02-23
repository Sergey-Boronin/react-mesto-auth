import React from "react";
import deleteButtonImg from "../images/close-button-image.svg";

function ImagePopup(props) {
  return (
    <section
      className={`popup popup-${props.name} ${props.card && "popup_opened"}
      `}
    >
      <div className="popup-scale__container">
        <button
          type="button"
          className="popup__close page-button"
          onClick={props.onClose}
        >
          <img src={deleteButtonImg} alt="Закрыть форму." />
        </button>
        <img
          src={props.card && props.card.link}
          alt={props.card && `Картинка ${props.card.name}`}
          className="popup-scale__image"
        />
        <p className="popup-scale__caption">{props.card && props.card.name}</p>
      </div>
    </section>
  );
}

export default ImagePopup;
