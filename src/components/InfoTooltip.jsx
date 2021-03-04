import React from "react";

import acceptIcon from "../images/auth-accept.png";
import deniedIcon from "../images/auth-denied.png";

function InfoTooltip(props) {
  return (
    <section
      className={`popup popup_tooltip ${props.isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container popup__container_place_tooltip">
        <div className="tooltip">
          <img
            src={props.success ? acceptIcon : deniedIcon}
            alt={"Результат регистрации"}
            className="tooltip__icon"
          />
          <p className="tooltip__text">
            {props.success
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."}
          </p>
        </div>
        <button
          className="popup__close page-button"
          type="button"
          onClick={props.onClose}
        ></button>
      </div>
    </section>
  );
}

export default InfoTooltip;
