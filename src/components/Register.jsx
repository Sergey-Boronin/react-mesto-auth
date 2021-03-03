import React from "react";
import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

function Register() {
  return (
    <div className='auth'>
      <AuthForm title="Регистрация" buttonName="Зарегистрироваться" />
      <p className="auth__tagline">Уже зарегистрированы? <Link className="auth__link" to="/sign-in">Войти</Link></p>
    </div>
      );
}

export default Register;
