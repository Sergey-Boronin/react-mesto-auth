import React, { useState } from 'react';
import AuthForm from "./AuthForm";



function Login({ onLogin }) {

  const initialData = {
    email: '',
    password: '',
  }
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

    onLogin(data)
      .then(resetForm)
  }


  return (
  // <AuthForm title="Вход" buttonName="Войти" />
  <form
  className="form form_place_auth"
  onSubmit={handleSubmit}
  autoComplete='off'
  >
    <legend className="form__title form__title_theme_dark">Вход</legend>
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
    >Войти
    </button>
  </form>
  );
}

export default Login;
