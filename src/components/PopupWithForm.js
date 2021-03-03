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
          <form name={`${props.name}-form`} className="form" noValidate>
          <legend className="form__title">{props.title}</legend>
            {props.children}
            <button
              type="submit"
              className="form__button page-button"
              onClick={props.onSubmit}
            >
              {props.buttonName}
            </button>{" "}
          </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
