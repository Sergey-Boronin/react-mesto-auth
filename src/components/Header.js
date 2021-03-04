import logo from "../images/logo.svg";
import { Route, Switch, Link } from 'react-router-dom';

function Header({email, isLogged, onLogout}) {

  const handleLogoutClick = function() {
    // setMenuOpened(false);
    onLogout();
  }


  return (
    <header className="header">
      <img src={logo} alt="Логотип." className="header__image" />
      {/* <nav
      className={isLogged ? headerNav : '' }
      > */}
        {/* <ul */}
        {/* // className={menu} */}
        {/* > */}
          <Switch>
            <Route path="/sign-up">
              {/* <li className="menu__item"> */}
              <Link className="header__link" to="sign-in">Войти</Link>
              {/* </li> */}
            </Route>
            <Route path="/sign-in">
              {/* <li className="menu__item"> */}
              <Link className="header__link" to="sign-up">Регистрация</Link>
              {/* </li> */}
            </Route>
            {isLogged?
            <>
            {/* <li
            className={menuItem}>{email}
            </li> */}
            {/* <li  */}
            {/* className={menuItem}> */}
            <div
            className="logged-in">
            <span
            className="logged-in__text"
            >{email}
            </span>
            <span
            className="logged-in__logout"
            onClick={handleLogoutClick}
            >Выйти
            </span>
            </div>
            {/* </li> */}
            </>
              : ''}
          </Switch>
        {/* </ul> */}
      {/* </nav> */}
    </header>
  );
}

export default Header;
