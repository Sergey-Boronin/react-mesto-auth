import React, { useState } from "react";
import { Link } from "react-router-dom";

function AuthForm(
{  title,
  buttonName}
) {

  return (
    <>
      <form className="form form_place_auth">
        <legend className="form__title form__title_theme_dark">{title}</legend>
        <input
          className="form__input form__input_theme_dark"
          id="email"
          name="email"
          placeholder="Email"
          required
        />
        <span className="form__input-error" id="name-input-error" />
        <input
          className="form__input form__input_theme_dark form__input_place_auth"
          id="password"
          name="password"
          placeholder="Пароль"
          required
        />
        <span className="form__input-error" id="name-input-error" />
        <button
          type="submit"
          className="form__button page-button form__button_theme_dark"
        >{buttonName}
        </button>
      </form>
    </>
  );
}

export default AuthForm;
