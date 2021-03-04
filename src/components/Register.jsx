import React, { useState } from 'react';
import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

function Register({onRegister}) {

  const initialData = {
    email: '',
    password: '',
  };
  const [data, setData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(data => ({
      ...data,
      [name]: value,
    }));
  }

  const resetForm = () => {
    setData(initialData);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      return;
    }

    onRegister(data)
      .then(resetForm);
  }
  return (
    <div className='auth'>
      {/* <AuthForm title="Регистрация" buttonName="Зарегистрироваться" onRegister={onRegister}/> */}
      <form
      className="form form_place_auth"
      onSubmit={handleSubmit}
      autoComplete='off'
      >
        <legend className="form__title form__title_theme_dark">Регистрация</legend>
        <input
          className="form__input form__input_theme_dark"
          id="email"
          name="email"
          type="email"
          value={data.email}
          placeholder="Email"
          required
          onChange={handleChange}
        />
        <span className="form__input-error" id="name-input-error" />
        <input
          className="form__input form__input_theme_dark form__input_place_auth"
          id="password"
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
          placeholder="Пароль"
          required
        />
        <span className="form__input-error" id="name-input-error" />
        <button
          type="submit"
          className="form__button page-button form__button_theme_dark"
        >Зарегистрироваться
        </button>
      </form>
      <p className="auth__tagline">Уже зарегистрированы? <Link className="auth__link" to="/sign-in">Войти</Link></p>
    </div>
      );
}

export default Register;
