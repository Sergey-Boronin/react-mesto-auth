import React from 'react'

function Login () {
  return (
    <>
    <form
      className="auth-form"
    >
      <h2
        className="auth-form__title"
      >Регистрация</h2>
      <input
        placeholder="Email"
        required
      />
      <input
        placeholder="Пароль"
        required
      />
      <button>Зарегистрироваться</button>
    </form>
    <p>Уже зарегистрированы?<a href="https://habr.com/ru/post/273897/">Войти</a></p>
    </>
  )
}

export default Login
