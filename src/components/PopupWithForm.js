import React from "react";

function PopupWithForm(props) {
  return (
    <section
      className={`popup popup-${props.name} ${
        props.isOpen ? "popup_opened" : ``
      }`}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close page-button"
          onClick={props.onClose}
        />
        <div className="popup__content">
          <h2 className="popup__title">{props.title}</h2>
          <form name={`${props.name}-form`} className="popup__form" noValidate>
            {props.children}
            <button
              type="submit"
              className="popup__button page-button"
              onClick={props.onSubmit}
            >
              {props.buttonName}
            </button>{" "}
          </form>
        </div>
      </div>
    </section>
  );
}

export default PopupWithForm;
