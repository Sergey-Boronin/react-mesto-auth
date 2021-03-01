import React from "react";
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form">
        <input id="email" name='email' placeholder="Email" required />
        <input id='password' name='password' placeholder="Пароль" required />
        <button type='submit' className="login_link">Войти</button>
      </form>
      <div className="login__signup">
          <p>Ещё не зарегистрированы?</p>
          <Link to="/register" className="signup__link">Зарегистрироваться</Link>
        </div>
    </div>
  );
}

export default Login;
