import React from "react";
import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className="register">
      <h2 className="register__title">Регистрация</h2>
      <form className="register__form">
        <input id="username" name='username' placeholder="Email" required />
        <input id='password' name='password' placeholder="Пароль" required />
        <button type='submit' className="register__link">Зарегистрироваться</button>
      </form>
      <div className="register__signin">
          <p>Уже зарегистрированы?</p>
          <Link to="login" className="register__login-link">Войти</Link>
      </div>
    </div>
  );
}

export default Register;
