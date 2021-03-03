import React from "react";
import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

function Login() {
  return (
  <AuthForm title="Вход" buttonName="Войти" />
  );
}

export default Login;
